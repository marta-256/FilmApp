import type {
    FetchMovieErrorResponse,
    FetchMovieSuccessResponse,
    Movie,
} from './MovieApi.types';

const API_KEY = 'ef2d98db';

function isErrorResponse(
    response: unknown,
): response is FetchMovieErrorResponse {
    return (
        typeof response === 'object' && response !== null && 'Error' in response
    );
}

const baseApiUrl = 'https://www.omdbapi.com';

class Api {
    async fetchMovies(
        searchTitle: string,
        searchYear: string,
        searchType: string,
        pageNumber: number,
        moviesPerPage: number,
    ): Promise<FetchMovieSuccessResponse> {
        try {
            const url = new URL(baseApiUrl);

            const searchParams = new URLSearchParams();
            searchParams.set('apikey', API_KEY);
            searchParams.set('s', searchTitle);
            searchParams.set('y', searchYear);
            searchParams.set('type', searchType);
            searchParams.set('page', pageNumber.toString());
            searchParams.set('rpp', moviesPerPage.toString());
            url.search = searchParams.toString();

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const JsonResponse = await response.json();

            if (isErrorResponse(JsonResponse) && JsonResponse.Error) {
                console.error(JsonResponse.Error);
            }
            return JsonResponse;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }

    async fetchMovieDetails(movieId: string): Promise<Movie> {
        try {
            const url = new URL(baseApiUrl);

            const searchParams = new URLSearchParams();
            searchParams.set('apikey', API_KEY);
            searchParams.set('i', movieId);
            searchParams.set('plot', 'full');
            url.search = searchParams.toString();

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const JsonResponse = await response.json();

            if (isErrorResponse(JsonResponse) && JsonResponse.Error) {
                console.error(JsonResponse.Error);
            }
            return JsonResponse;
        } catch (error) {
            console.error('Error fetching movie:', error);
            throw error;
        }
    }
}

export const MovieApi = new Api();
