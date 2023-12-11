import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MoviePresentation } from './styled/MoviePresentation';

import { fetchDetails } from '../../api/OmdbApi';
import type { Movie } from '../../api/OmdbApi.types';

import noPoster from '../../assets/no-poster.png';
import imdb from '../../assets/imdb.png';
import { Loader } from '../../assets/Loader';
import { movieDetailsKeys } from './constants/movieDetailsKeys';

const imdbSite = 'https://www.imdb.com/title/';

export function MovieBox() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (movieId) {
            const getData = async () => {
                setIsFetching(true);
                const details = await fetchDetails(movieId);
                setMovie(details ?? null);
                localStorage.setItem('movieDetails', JSON.stringify(details ?? null));
                setIsFetching(false);
            };
            getData();
        }
    }, []);

    if (isFetching) {
        return (
            <section>
                <Loader />
                <p>We are downloading movie data</p>
            </section>
        );
    }

    if (!movie) {
        return (
            <section>
                <p>We couldn't find movie data</p>
            </section>
        );
    }

    const filteredDetails = Object.entries(movie)
        .filter(([key]) => movieDetailsKeys.includes(key))
        .map(([key, value]) => (
            <div className="detail" key={key}>
                <strong>
                    <p>{key}:&nbsp;</p>
                </strong>
                <p className="description">
                    {typeof value !== 'string' ? value.join(', ') : value}
                </p>
            </div>
        ));

    return (
        <MoviePresentation>
            <article className="main-information">
                <section className="title-section">
                    <h2 className="title">
                        {movie.Title}&nbsp;({movie.Year})
                    </h2>
                    <p className="details">{movie.Runtime}</p>
                    <p className="details">
                        <a href={imdbSite + movieId} className="movie-link">
                            {movie.imdbRating} / {movie.imdbVotes} votes
                            <img
                                src={imdb}
                                alt="Movie poster"
                                className="imdb-icon"
                            />
                        </a>
                    </p>
                    <p className="details plot">{movie.Plot}</p>
                </section>
                <section className="title-section poster-section">
                    <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : noPoster}
                        alt="Movie poster"
                        className="poster"
                    />
                </section>
            </article>
            <article className="movie-details">{filteredDetails}</article>
        </MoviePresentation>
    );
}
