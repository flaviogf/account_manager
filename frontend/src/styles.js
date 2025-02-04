import { createGlobalStyle } from 'styled-components'

const Styles = createGlobalStyle`
  * {
    font-family: 'PT Sans', sans-serif;
    text-decoration: none;
    outline: none;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-color: #281935;
    color: #c8a9ff;
  }
`

export default Styles
