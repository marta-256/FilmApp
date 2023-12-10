import type React from 'react';

import { MovieApi } from '../api/MovieApi';
import type { Pagination } from '../context/MoviesListProvider';

import type { ListingMovie } from '../api/MovieApi.types';

export async function updateMovieResults(
    searchTitle: string,
    searchYear: string,
    searchType: string,
    perPage: number,
    page: number,
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>,
    setSearchedMovies: React.Dispatch<React.SetStateAction<Array<ListingMovie> | null>>,
    setNoResults: React.Dispatch<React.SetStateAction<boolean>>,
) {
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
