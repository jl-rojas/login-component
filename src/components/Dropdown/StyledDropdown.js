import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const Activator = styled.button`
    align-items: center;
    background-color: inherit;
    border: 1px solid #D8DCE6;
    color: inherit;
    display: flex;
    font-size: inherit;
    border-radius: 4px;
    

    /* &:after {
        content: "";
        border-bottom: 1px solid #000;
        border-right: 1px solid #000;
        height: 0.5em;
        margin-left: 0.75em;
        width: 0.5em;
        transform: rotate(45deg);
    } */
`;

export const ItemsContainer = styled.ul`
    border: 1px solid #EAEDF3;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    color: black;
    display: none;
    margin: 0;
    padding: 0;
    position: absolute;
    margin-top: 8px;
    /* min-width: 160px; */
    width: 310px;
    height: 457px;
    right: 0px;
    li {
        list-style: none;
        margin: 0;

        a, a:link {
            display: block;
            padding: 0.5em;
        }
    }

    &.active {
        display: block;
    }
`;