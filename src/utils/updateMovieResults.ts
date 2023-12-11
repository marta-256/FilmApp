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
    } = contextParams;

    const response = await fetchData(
        searchTitle,
        searchYear.toString(),
        searchType,
        page,
        perPage,
    );

    if (!response) {
        setNoResults(true);
        return;
    }

    setSearchedMovies(response.Search ?? []);

    const newTotalPages = Math.ceil(Number(response.totalResults) / perPage);
    setPagination((prevState) => ({ ...prevState, totalPages: newTotalPages }));

    localStorage.setItem(
        'moviesList',
        JSON.stringify({
            movies: response.Search,
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
