import React from 'react';

import { PaginationContent } from '../styled/PaginationContent';

import { useMovieContext } from '../../../context/MoviesListProvider';
import { usePageButtons } from '../../../hooks/usePageButtons';
import { updateMovieResults } from '../../../utils/updateMovieResults';

export function Pagination() {
    const {
        pagination,
        setPagination,
        searchTitle,
        searchYear,
        searchType,
        setSearchedMovies,
        isFetching,
        setIsFetching,
        setNoResults,
    } = useMovieContext();

    const handlePageChange = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setIsFetching(true);
        const newPage = Number((event.target as HTMLButtonElement).value);
        setPagination((prevState) => ({ ...prevState, page: newPage }));
        await updateMovieResults({
            searchTitle,
            searchYear,
            searchType,
            pagination: { ...pagination, page: newPage },
            setSearchedMovies,
            setPagination,
            setNoResults,
        });
        setIsFetching(false);
    };

    return (
        <PaginationContent $isLoading={isFetching}>
            {usePageButtons(handlePageChange)}
        </PaginationContent>
    );
}
