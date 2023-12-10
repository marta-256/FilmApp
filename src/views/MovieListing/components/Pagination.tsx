import React, { useCallback } from 'react';

import { PaginationContent } from '../styled/PaginationContent';

import { useMovieContext } from '../../../context/MoviesListProvider';
import { updateMovieResults } from '../../../utils/updateMovieResults';
import { usePageButtons } from '../../../hooks/usePageButtons';

export function Pagination() {
    const {
        pagination: { perPage, page },
        setPagination,
        searchTitle,
        searchYear,
        searchType,
        setSearchedMovies,
        setIsFetching,
        isFetching,
    } = useMovieContext();

    const handlePageChange = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsFetching(true);
            const newPage = Number((event.target as HTMLButtonElement).value);
            setPagination((prevState) => ({ ...prevState, page: newPage }));
            await updateMovieResults(
                searchTitle,
                searchYear,
                searchType,
                perPage,
                newPage,
                setPagination,
                setSearchedMovies,
            );
            setIsFetching(false);
        },
        [perPage, searchType, searchYear, searchTitle, page],
    );

    return (
        <PaginationContent $isLoading={isFetching}>
            {usePageButtons(handlePageChange)}
        </PaginationContent>
    );
}
