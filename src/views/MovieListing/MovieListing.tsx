import React from 'react';

import { Pagination } from './components/Pagination';
import { SearchMovieForm } from './components/SearchMovieForm';
import { ListingSection } from './styled/ListingSection';

import { useMovieContext } from '../../context/MoviesListProvider';
import noPoster from '../../assets/no-poster.png';

export function MovieListing(): React.ReactElement {
    const {
        searchedMovies,
        pagination: { totalPages },
        noResults,
    } = useMovieContext();

    return (
        <ListingSection className="App-header">
            <header>
                <h1>Search for a movie</h1>
            </header>
            <section>
                <SearchMovieForm />
                <article className="movies-boxes">
                    {searchedMovies?.length ? (
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
                    ) : noResults ? (
                        <section>
                            <p>No results. Try with different search.</p>
                        </section>
                    ) : null}
                </article>
                {totalPages > 1 ? <Pagination /> : null}
            </section>
        </ListingSection>
    );
}
