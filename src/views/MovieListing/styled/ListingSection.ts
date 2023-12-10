import styled from 'styled-components';

export const ListingSection = styled.div`
    header {
        color: #14b7e0;
    }

    .movies-boxes {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
        padding-top: 30px;
    }

    a {
        color: #14b7e0;
        background-color: #000000cc;
        width: 320px;
        height: 565px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        border-radius: 5px;
        overflow: hidden;
        box-shadow:
            2px 2px 5px 1px rgba(0, 0, 0, 1),
            -2px -2px 3px 1px rgb(0, 0, 0, 0.15);

        &:visited {
            color: #418aba;
        }

        &:hover {
            color: #e0009e;
        }

        .movie-title {
            margin: 0;
            padding: 16px;
        }

        .movie-poster {
            width: 320px;
            height: 500px;
        }
    }
`;
