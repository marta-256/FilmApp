import React from 'react';

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
        pagination,
        setSearchedMovies,
        setPagination,
        isFetching,
        setIsFetching,
        setNoResults,
        setSearchError,
    } = useMovieContext();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchYear(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(event.target.value);
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsFetching(true);
        setNoResults(false);
        setSearchError(false);
        setPagination(paginationInitialState);
        await updateMovieResults({
            searchTitle,
            searchYear,
            searchType,
            pagination,
            setSearchedMovies,
            setPagination,
            setNoResults,
            setSearchError,
        });
        setIsFetching(false);
    };

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
                min={1888}
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
