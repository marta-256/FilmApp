import { fetchData } from '../api/OmdbApi';

import type { MoviesListProviderContextType } from '../context/MoviesListProvider';

type ContextParams = Pick<
MoviesListProviderContextType,
| 'searchTitle'
| 'searchYear'
| 'searchType'
| 'pagination'
| 'setSearchedMovies'
| 'setPagination'
| 'setNoResults'
| 'setSearchError'
>;

export async function updateMovieResults(contextParams: ContextParams) {
    const {
        searchTitle,
        searchYear,
        searchType,
        pagination: { perPage, page },
        setSearchedMovies,
        setPagination,
        setNoResults,
        setSearchError,
    } = contextParams;

    const response = await fetchData(
        searchTitle,
        searchYear,
        searchType,
        page,
        perPage,
    );

    if (response.error) {
        setSearchError(true);
        return;
    }

    const results = response.results;

    if (!results) {
        setNoResults(true);
        localStorage.setItem('moviesList', JSON.stringify({}));
    }

    if (results) {
        setSearchedMovies(results.Search ?? []);
        const newTotalPages = Math.ceil(results.totalResults / perPage);
        setPagination((prevState) => ({ ...prevState, totalPages: newTotalPages }));

        localStorage.setItem(
            'moviesList',
            JSON.stringify({
                movies: results.Search,
                pagination: {
                    totalPages: newTotalPages,
                    perPage,
                    page,
                },
                searchTitle,
                searchType,
                searchYear,
            }),
        );
    }

}
