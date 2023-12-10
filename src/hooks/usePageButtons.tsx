import React from 'react';
import { useMovieContext } from '../context/MoviesListProvider';

export function usePageButtons(
    onChange: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>,
): Array<React.JSX.Element> {
    const {
        pagination: { totalPages, page },
        isFetching,
    } = useMovieContext();

    const renderPagination = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= page - 1 && i <= page + 1)
            ) {
                pages.push(
                    <button
                        key={i}
                        onClick={(event) => onChange(event)}
                        className={
                            i === page ? 'active page-button' : 'page-button'
                        }
                        disabled={isFetching}
                        value={i}
                    >
                        {i}
                    </button>,
                );
            } else if (
                (i === page - 2 && page > 3) ||
                (i === page + 2 && page < totalPages - 2)
            ) {
                pages.push(<span key={i}>...</span>);
            }
        }

        return pages;
    };

    return renderPagination();
}
