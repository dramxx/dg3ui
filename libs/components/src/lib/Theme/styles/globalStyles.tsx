import { createGlobalStyle } from 'styled-components';

import { PUBLIC_PATH } from '@dg3/endpoints';

export const GlobalStyle = createGlobalStyle`
  html {
      font-size: 62.5%;
       height: 100%;
  }

  body {
      height: 100%;
      background-image: url("${PUBLIC_PATH}static/images/background_smart_city.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      font-family: "muli",sans-serif;
      font-size: 1.4rem;
  }

  #root {
    height: 100%;
    background-color:  rgba(255, 255, 255, 0.85);
  }

  button:focus {
      outline: none;
  }

  /* this is important to see GraphiQL tooltips*/
  .CodeMirror-lint-tooltip {
    z-index: 9999 !important;
  }

 /* downloaded from https://www.cufonfonts.com/font/muli */
  @font-face {
    font-family: "muli";
    src: local("${PUBLIC_PATH}static/fonts/muli/Muli-Regular.woff")
        format("woff");
    font-weight: normal;
    format("opentype");
    font-style: normal;
  }

  @font-face {
    font-family: "muli";
    src: local("${PUBLIC_PATH}static/fonts/muli/Muli-Italic.woff")
        format("woff");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "muli";
    src: local("${PUBLIC_PATH}static/fonts/muli/Muli-BoldItalic.woff")
        format("woff");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "muli";
    src: local("${PUBLIC_PATH}static/fonts/muli/Muli-Bold.woff")
        format("woff");
    font-weight: bold;
    font-style: normal;
  }

    @font-face {
    font-family: "muli";
    src: local("${PUBLIC_PATH}static/fonts/muli/Muli-ExtraBold.woff")
        format("woff");
    font-weight: 800;
    font-style: normal;
  }
`;

export default GlobalStyle;
