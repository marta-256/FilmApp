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
    } = useMovieContext();

    return (
        <ListingSection className="App-header">
            <header>
                <h1>Enter the title of the movie you are looking for</h1>
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
                    ) : (
                        <section>
                            <p>We didn't find such a movie for this search</p>
                        </section>
                    )}
                </article>
                {totalPages > 1 ? <Pagination /> : null}
            </section>
        </ListingSection>
    );
}
