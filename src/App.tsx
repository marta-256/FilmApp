import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MovieListing } from './views/MovieListing/MovieListing';
import { MovieBox } from './views/MovieDetails/MovieBox';
import { AppContent } from './styled/AppContent';

import { MoviesListProvider } from './context/MoviesListProvider';

export function App(): React.ReactElement {
    return (
        <AppContent>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MoviesListProvider>
                                <MovieListing />
                            </MoviesListProvider>
                        }
                    />
                    <Route path={'/:movieId'} element={<MovieBox />} />
                </Routes>
            </Router>
        </AppContent>
    );
}
