import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

  :root{
    --background: #f0f2f5;
    --red: #E52E4D;
    --purple: #5429cc;
    --green-500: #33CC95;
    
    --purple-light: #6933ff;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --shape: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    @media (max-width: 1080px){
      font-size: 93.75%;
    }

    @media (max-width: 720px){
      font-size: 87.5%;
    }
  }

  body{
    background: ${props => props.theme["gray-900"]};
    color: ${props => props.theme["gray-300"]};
    -webkit-font-smoothing: antialiased;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme["green-500"]};
  }

  body, input, textarea, button {
    font: 400 1rem 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600;
  }

  button{
    cursor: pointer;
  }

  [disable] {
    opacity: .6;
    cursor: not-allowed;
  }
`