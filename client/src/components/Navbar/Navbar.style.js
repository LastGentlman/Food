import styled from "styled-components";

export const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: grey;
    margin: 0;
    padding: 0;
    
    & ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
        border: 1px blue solid;
    }

    & ul > li {
        margin: 0;
        padding-right: 8px;
    }
`;