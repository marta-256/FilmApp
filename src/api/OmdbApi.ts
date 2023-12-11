import type {
    FetchMovieErrorResponse,
    FetchMovieSuccessResponse,
    Movie,
} from './OmdbApi.types';

const API_KEY = 'ef2d98db';
const baseApiUrl = 'https://www.omdbapi.com';
const isErrorResponse = (
    response: unknown,
): response is FetchMovieErrorResponse =>
    typeof response === 'object' && response !== null && 'Error' in response;

type ListingResult = {
    error: true;
} | {
    error: false;
    results?: FetchMovieSuccessResponse;
};

export const fetchData = async (
    searchTitle: string,
    searchYear: string,
    searchType: string,
    page: number,
    perPage: number,
): Promise<ListingResult> => {
    try {
        const url = new URL(baseApiUrl);

        const searchParams = new URLSearchParams();
        searchParams.set('apikey', API_KEY);
        searchParams.set('s', searchTitle);
        searchParams.set('y', searchYear.toString());
        searchParams.set('type', searchType);
        searchParams.set('page', page.toString());
        searchParams.set('rpp', perPage.toString());

        url.search = searchParams.toString();

        const response = await fetch(url);
        if (!response.ok) {
            return { error: true };
        }

        const results = await response.json();
        if (isErrorResponse(results) && results.Error) { //TODO handle errors on frontend (e.g. react-toastify)
            return {
                error: false,
                results: undefined,
            };
        }

        return {
            error: false,
            results: {
                ...results,
                totalResults: Number(results.totalResults),
            }
        };
    } catch (error) {
        return { error: true };
    }
};

type MovieResult = {
    error: true;
} | {
    error: false;
    results?: Movie;
};

export const fetchDetails = async (id: string): Promise<MovieResult> => {
    try {
        const url = new URL(baseApiUrl);

        const searchParams = new URLSearchParams();
        searchParams.set('apikey', API_KEY);
        searchParams.set('i', id);
        searchParams.set('plot', 'full');

        url.search = searchParams.toString();

        const response = await fetch(url);
        if (!response.ok) {
            return { error: true };
        }

        const results = await response.json();
        if (isErrorResponse(results) && results.Error) { //TODO handle errors on frontend (e.g. react-toastify)
            return {
                error: false,
                results: undefined,
            };
        }

        return {
            error: false,
            results: {
                ...results,
                totalResults: Number(results.totalResults),
            }
        };
    } catch (error) {
        return { error: true };
    }
};
