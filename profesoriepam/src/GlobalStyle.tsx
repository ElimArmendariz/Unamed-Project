import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root{
       --maxWidth: 1280px;
       --white: #fff;
       --purple: #3E0F96;
       --fontSuperBig: 2.5rem;
       --fontBig: 1.5rem;
       --fontMed: 1.2rem;
       --fontSmall: 1rem;
    }

   *{
        font-family: 'OpenSansLight';
        line-height: 1.5;
    }
`;