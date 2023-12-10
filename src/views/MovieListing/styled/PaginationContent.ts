import styled from 'styled-components';

interface PaginationContentProps {
    $isLoading: boolean;
}

export const PaginationContent = styled.section<PaginationContentProps>`
    margin-top: 40px;

    .page-button {
        height: 30px;
        width: fit-content;
        min-width: 35px;
        margin: 5px;
        text-align: center;
        cursor: pointer;
        background-color: #ffffff;
        color: #418aba;
        font-weight: bold;

        border: none;
        border-radius: 5px;
        box-shadow:
            2px 2px 5px 1px rgba(0, 0, 0, 1),
            -2px -2px 3px 1px rgb(0, 0, 0, 0.15);
        ${({ $isLoading }) => ($isLoading ? 'cursor: progress;' : '')}
    }

    .active {
        color: #e0009e;
    }
`;
