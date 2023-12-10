import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MoviePresentation } from './styled/MoviePresentation';

import { MovieApi } from '../../api/MovieApi';
import type { Movie } from '../../api/MovieApi.types';

import noPoster from '../../assets/no-poster.png';
import { Loader } from '../../assets/Loader';

const omittedKeys = [
    'Ratings',
    'Title',
    'imdbRating',
    'imdbVotes',
    'Poster',
    'Year',
    'Plot',
];

export function MovieBox() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (movieId) {
            const getData = async () => {
                setIsFetching(true);
                const data = await MovieApi.fetchMovieDetails(movieId);
                setMovie(data);
                localStorage.setItem('movieDetails', JSON.stringify(data));
                setIsFetching(false);
            };
            getData();
        }
    }, []);

    if (isFetching) {
        return (
            <section>
                <Loader />
                <p>We download your movie data</p>
            </section>
        );
    }

    if (!movie) {
        return (
            <section>
                <p>We didn't find such a movie</p>
            </section>
        );
    }

    const filteredDetails = Object.entries(movie)
        .filter(([key]) => !omittedKeys.includes(key))
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
                        {movie.imdbRating} / {movie.imdbVotes} votes
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
