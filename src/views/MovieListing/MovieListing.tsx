import React, { useCallback } from 'react';

import { Pagination } from './components/Pagination';
import { SearchMovieForm } from './components/SearchMovieForm';
import { ListingSection } from './styled/ListingSection';

import { useMovieContext } from '../../context/MoviesListProvider';
import { ErrorMessage } from '../MovieDetails/constants/message';
import noPoster from '../../assets/no-poster.png';

export function MovieListing(): React.ReactElement {
    const {
        searchedMovies,
        pagination: { totalPages },
        noResults,
        searchError,
    } = useMovieContext();

    const listingContent = useCallback(() => {
        if (searchError) {
            return (
                <section>
                    <p>{ErrorMessage.EXPERIENCING_PROBLEMS}</p>
                </section>
            );
        }

        if (noResults) {
            return (
                <section>
                    <p>{ErrorMessage.NO_MOVIE_DATA}</p>
                </section>
            );
        }

        if (searchedMovies && searchedMovies?.length > 0) {
            return (
                searchedMovies.map((movie) => (
                    <a href={movie.imdbID} key={movie.imdbID}>
                        <h2 className="movie-title">{movie.Title}</h2>
                        <img
                            src={
                                movie.Poster !== 'N/A'
                                    ? movie.Poster
                                    : noPoster
                            }
                            alt="Plakat filmowy - Nazwa Filmu"
                            className="movie-poster"
                        />
                    </a>
                ))
            );
        }
    }, [searchError, searchedMovies, noResults]);

    return (
        <ListingSection className="App-header">
            <header>
                <h1>Search for a movie</h1>
            </header>
            <section>
                <SearchMovieForm />
                <article className="movies-boxes">
                    {listingContent()}
                </article>
                {totalPages > 1 ? <Pagination /> : null}
            </section>
        </ListingSection>
    );
}
