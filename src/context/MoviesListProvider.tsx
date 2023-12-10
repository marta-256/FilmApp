import React, { createContext, useContext, useState } from 'react';

import type { ListingMovie } from '../api/MovieApi.types';

export interface Pagination {
    page: number;
    perPage: number;
    totalPages: number;
}

interface MoviesListProviderContextType {
    searchTitle: string;
    setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
    searchYear: string;
    setSearchYear: React.Dispatch<React.SetStateAction<string>>;
    searchType: string;
    setSearchType: React.Dispatch<React.SetStateAction<string>>;
    searchedMovies: Array<ListingMovie> | null;
    setSearchedMovies: React.Dispatch<React.SetStateAction<Array<ListingMovie> | null>>;
    pagination: Pagination;
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
    noResults: boolean;
    setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MoviesListProviderProps {
    children: React.ReactNode;
}

const MoviesListContext = createContext<MoviesListProviderContextType | null>(
    null,
);

export const useMovieContext = () => {
    const context = useContext(MoviesListContext);
    if (!context) {
        throw new Error(
            'useMoviesListContext must be used within a MoviesListProvider',
        );
    }
    return context;
};

export const paginationInitialState = {
    page: 1,
    perPage: 10,
    totalPages: 1,
};

const getSearchedMovies = localStorage.getItem('moviesList');
const storageData =
    getSearchedMovies !== 'undefined' && getSearchedMovies !== null
        ? JSON.parse(getSearchedMovies)
        : undefined;

export function MoviesListProvider({
    children,
}: MoviesListProviderProps): React.ReactElement {
    const [isFetching, setIsFetching] = useState(false);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [searchTitle, setSearchTitle] = useState<string>(
        storageData?.searchTitle ?? '',
    );
    const [searchYear, setSearchYear] = useState<string>(
        storageData?.searchYear ?? '',
    );
    const [searchType, setSearchType] = useState<string>(
        storageData?.searchType ?? '',
    );
    const [pagination, setPagination] = useState<Pagination>(
        storageData?.pagination ?? paginationInitialState,
    );
    const [searchedMovies, setSearchedMovies] =
        useState<Array<ListingMovie> | null>(storageData?.movies);

    return (
        <MoviesListContext.Provider
            value={{
                searchTitle,
                setSearchTitle,
                searchYear,
                setSearchYear,
                searchType,
                setSearchType,
                searchedMovies,
                setSearchedMovies,
                pagination,
                setPagination,
                isFetching,
                setIsFetching,
                noResults,
                setNoResults,
            }}
        >
            {children}
        </MoviesListContext.Provider>
    );
}
