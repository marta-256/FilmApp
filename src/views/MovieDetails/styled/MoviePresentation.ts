import styled from 'styled-components';

export const MoviePresentation = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 900px;

    .main-information {
        display: inline-flex;
        justify-content: center;
        text-align: start;

        @media (max-width: 900px) {
            flex-wrap: wrap;
        }

        .title-section {
            display: flex;
            justify-content: flex-end;
            align-content: flex-start;
            flex-wrap: wrap;
            max-width: 450px;
            width: 100%;
            padding: 0 20px;
            text-align: end;

            .title {
                color: #14b7e0;
            }

            .details {
                width: 100%;
            }

            .plot {
                text-align: justify;
            }
        }

        .poster-section {
            justify-content: center;
        }
    }

    .poster {
        height: fit-content;
        border-radius: 5px;
        margin-top: 22px;
        box-shadow:
            2px 2px 5px 1px rgba(0, 0, 0, 1),
            -2px -2px 3px 1px rgb(0, 0, 0, 0.15);
    }

    .movie-details {
        display: inline-flex;
        justify-content: center;
        flex-wrap: wrap;
        text-align: start;
        padding: 20px 20px 0 20px;

        .detail {
            display: flex;
            flex-direction: column;
            border-top: 1px solid grey;
            padding: 5px 0;
            max-width: 400px;
            width: 100%;

            .description {
                margin: 0 0 20px 0;
            }

            strong {
                height: 45px;
                color: #14b7e0;
            }
        }
    }
`;
