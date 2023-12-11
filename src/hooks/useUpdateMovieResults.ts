import { MovieApi } from '../api/MovieApi';

import { useMovieContext } from '../context/MoviesListProvider';

export async function useUpdateMovieResults(

) {
    const {
        searchTitle,
        searchYear,
        searchType,
        pagination: { perPage, page },
        setSearchedMovies,
        setPagination,
        setNoResults,
    } = useMovieContext();

    const response = await MovieApi.fetchMovies(
        searchTitle,
        searchYear.toString(),
        searchType,
        page,
        perPage,
    );
    if (!response.Search) {
        setNoResults(true);
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
