import React, { useCallback } from 'react';

import { PaginationContent } from '../styled/PaginationContent';

import { useMovieContext } from '../../../context/MoviesListProvider';
import { useUpdateMovieResults } from '../../../hooks/useUpdateMovieResults';
import { usePageButtons } from '../../../hooks/usePageButtons';

export function Pagination() {
    const {
        pagination: { perPage, page },
        setPagination,
        searchTitle,
        searchYear,
        searchType,
        setIsFetching,
        isFetching,
    } = useMovieContext();

    const handlePageChange = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            setIsFetching(true);
            const newPage = Number((event.target as HTMLButtonElement).value);
            setPagination((prevState) => ({ ...prevState, page: newPage }));
            await useUpdateMovieResults();
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
