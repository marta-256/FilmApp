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


export const fetchData = async (
    searchTitle: string,
    searchYear: string,
    searchType: string,
    pageNumber: number,
    moviesPerPage: number,
): Promise<FetchMovieSuccessResponse | undefined> => {
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

        const jsonResponse = await response.json();
        if (isErrorResponse(jsonResponse) && jsonResponse.Error) { //TODO handle errors on frontend (e.g. react-toastify)
            console.error(jsonResponse.Error);
            return undefined;
        }
        return jsonResponse;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchDetails = async (id: string): Promise<Movie | undefined> => {
    try {
        const url = new URL(baseApiUrl);

        const searchParams = new URLSearchParams();
        searchParams.set('apikey', API_KEY);
        searchParams.set('i', id);
        searchParams.set('plot', 'full');

        url.search = searchParams.toString();

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        if (isErrorResponse(jsonResponse) && jsonResponse.Error) { //TODO handle errors on frontend (e.g. react-toastify)
            console.error(jsonResponse.Error);
            return undefined;
        }
        return jsonResponse;
    } catch (error) {
        console.error('Error fetching movie:', error);
        throw error;
    }
};
