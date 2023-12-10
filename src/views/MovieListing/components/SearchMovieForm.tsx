import React, { useCallback } from 'react';

import { StyledForm } from '../styled/StyledForm';

import {
    paginationInitialState,
    useMovieContext,
} from '../../../context/MoviesListProvider';
import { updateMovieResults } from '../../../utils/updateMovieResults';
import { Loader } from '../../../assets/Loader';

export function SearchMovieForm() {
    const {
        searchTitle,
        setSearchTitle,
        searchYear,
        setSearchYear,
        searchType,
        setSearchType,
        pagination: { perPage, page },
        setSearchedMovies,
        setPagination,
        isFetching,
        setIsFetching,
    } = useMovieContext();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(event.target.value);
        setPagination(paginationInitialState);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchYear(event.target.value);
        setPagination(paginationInitialState);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value);
        setPagination(paginationInitialState);
    };

    const handleSubmit = useCallback(
        async (event: React.ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsFetching(true);
            await updateMovieResults(
                searchTitle,
                searchYear,
                searchType,
                perPage,
                page,
                setPagination,
                setSearchedMovies,
            );
            setIsFetching(false);
        },
        [searchTitle, searchYear, searchType, page, perPage],
    );

    return (
        <StyledForm onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input search-field"
                placeholder="Title"
                onChange={handleTitleChange}
                value={searchTitle}
                required
            />
            <input
                type="number"
                className="search-input search-field"
                placeholder="Year"
                onChange={handleYearChange}
                value={searchYear}
            />
            <select
                id="type"
                className="search-select search-field"
                onChange={handleTypeChange}
                value={searchType}
            >
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </select>
            <button
                disabled={isFetching}
                type="submit"
                className="submit-button search-field"
            >
                Search
                {isFetching ? <Loader className="loader" /> : null}
            </button>
        </StyledForm>
    );
}
