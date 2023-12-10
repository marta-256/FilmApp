import styled from 'styled-components';

export const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .search-field {
        margin: 10px;
        padding: 0 15px;
        background-color: #ffffff;

        border: none;
        border-radius: 5px;
        box-shadow:
            2px 2px 5px 1px rgba(0, 0, 0, 1),
            -2px -2px 3px 1px rgb(0, 0, 0, 0.15);
    }

    .search-input {
        height: 31px;
    }
    .search-select {
        height: 33px;
        width: 100px;
    }
    .submit-button {
        height: 33px;
        width: 100px;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        .loader {
            height: 25px;
            margin-left: 5px;
        }

        &:hover {
            background-color: #e0009e;
        }
    }
`;
