import { css } from 'styled-components';

/** For detailed description of different rules see: https://github.com/csstools/sanitize.css */

const sanitizeReset = css`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  ::before,
  ::after {
    text-decoration: inherit;
    vertical-align: inherit;
  }

  html {
    cursor: default;
    line-height: 1.5;
    -moz-tab-size: 4;
    tab-size: 4;
    -webkit-tap-highlight-color: transparent;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    word-break: break-word;
  }

  body {
    margin: 0;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  dl dl,
  dl ol,
  dl ul,
  ol dl,
  ul dl {
    margin: 0;
  }

  ol ol,
  ol ul,
  ul ol,
  ul ul {
    margin: 0;
  }

  hr {
    height: 0;
    overflow: visible;
  }

  main {
    display: block;
  }

  nav ol,
  nav ul {
    list-style: none;
    padding: 0;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  audio,
  video {
    display: inline-block;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  iframe {
    border-style: none;
  }

  img {
    border-style: none;
  }

  table {
    border-collapse: collapse;
  }

  button,
  input,
  select {
    margin: 0;
  }

  button {
    overflow: visible;
    text-transform: none;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }

  fieldset {
    border: 1px solid #a0a0a0;
    padding: 0.35em 0.75em 0.625em;
  }

  input {
    overflow: visible;
  }

  legend {
    color: inherit;
    display: table;
    max-width: 100%;
    white-space: normal;
  }

  progress {
    display: inline-block;
    vertical-align: baseline;
  }

  select {
    text-transform: none;
  }

  textarea {
    margin: 0;
    overflow: auto;
    resize: vertical;
  }

  [type='checkbox'],
  [type='radio'] {
    padding: 0;
  }

  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  :-moz-ui-invalid {
    box-shadow: none;
  }

  details {
    display: block;
  }

  dialog {
    background-color: white;
    border: solid;
    color: black;
    display: block;
    height: -moz-fit-content;
    height: -webkit-fit-content;
    height: fit-content;
    left: 0;
    margin: auto;
    padding: 1em;
    position: absolute;
    right: 0;
    width: -moz-fit-content;
    width: -webkit-fit-content;
    width: fit-content;
  }

  dialog:not([open]) {
    display: none;
  }

  summary {
    display: list-item;
  }

  canvas {
    display: inline-block;
  }

  template {
    display: none;
  }

  a,
  area,
  button,
  input,
  label,
  select,
  summary,
  textarea,
  [tabindex] {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  [hidden] {
    display: none;
  }

  [aria-busy='true'] {
    cursor: progress;
  }

  [aria-controls] {
    cursor: pointer;
  }

  [aria-disabled='true'],
  [disabled] {
    cursor: not-allowed;
  }

  [aria-hidden='false'][hidden] {
    display: initial;
  }

  [aria-hidden='false'][hidden]:not(:focus) {
    clip: rect(0, 0, 0, 0);
    position: absolute;
  }
`;

export { sanitizeReset };
