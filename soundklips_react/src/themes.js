import styled, { createGlobalStyle } from "styled-components";

export const light = {
  main1: "#E5E5E5", //darkest
  main2: "#FAFAFA", // 2nd darkest
  main3: "#fff", // 3rd darkest
  background: "#F2F2F2",
  fontColor: "#303030",
  menu: "#FAFAFA",
  content: "#E5E5E5",
  hover: "#86CDCA",
  active: "",
  teal: "#54B9B5",
  white: "#fff",
  yellow: "#E2E700",
  formBg: "#fff",
  boxShadow: "3px 5px 3px 0px rgba(0,0,0,.3)",
  boxShadowSoft: "0px 15px 25px 8px rgba(0,0,0,.1)",
  modalBg: "rgba(243, 243, 243, 0.7)",
  DAWbg: "#E5E5E5",
};

export const dark = {
  main1: "#212121", //darkest
  main2: "#303030", // 2nd darkest
  main3: "#424242", // 3rd darkest
  background: "#303030",
  fontColor: "#ededed",
  // fontColor: "#e6e6e6",
  menu: "#212121",
  content: "#424242",
  hover: "#54B9B5",
  active: "#303030",
  teal: "#54B9B5",
  yellow: "#E2E700",
  white: "#fff",
  formBg: "#424242",
  boxShadow: "15px 5px 3px 10px rgba(5,5,5,5)",
  boxShadowSoft: "10px 10px 15px 8px rgba(10,10,10,.5)",
  modalBg: "rgba(150, 150, 150, 0.5)",
  DAWbg: "#424242",
};

// STYLED COMPONENTS
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none; 
  }

  html { 
    min-width: 100vw;
    // min-height: 100vh;  
    // max-width: 100%;
    // max-height: 100vh;  
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden; 
  }

  body {
    min-width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.fontColor};
  }

  #root {
    min-width: 100%;
    min-height: 100%;
  }

  a {
    color: ${(props) => props.theme.fontColor}; 
  }

  a:hover{
    color: ${(props) => props.theme.teal};
  }

  a:active {
    color: ${(props) => props.theme.fontColor}; 
  }

  // svg {
  //   color: ${(props) => props.theme.fontColor};
  // }
`;

export const StyledApp = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fontColor};
`;

export const FlexPage = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  // width: 100%;
  min-width: 75%;
  max-width: 75%;
  height: 100%;
  min-height: 100%;
  margin: 0 auto 50px auto;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.fontColor};

  @media only screen and (max-width: 1500px) {
    min-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

export const Content = styled.div`
  // background-color: ${(props) => props.theme.content};
  color: ${(props) => props.theme.fontColor};
  // padding: 0 30px;
  border-radius: 5px;
  width: 100%;

  @media only screen and (max-width: 1500px) {
    margin-left: 0;
    margin-right: 0;
    padding: 2px 0px;
  }
`;

export const Menu = styled.div`
  background-color: ${(props) => props.theme.menu};
  color: ${(props) => props.theme.fontColor};
`;

export const Nav = styled.div`
  background-color: ${(props) => props.theme.menu};
  color: ${(props) => props.theme.fontColor};
`;

export const Form = styled.div`
  background-color: ${(props) => props.theme.main3};
  color: ${(props) => props.theme.fontColor};

  input[type="text"],
  input[type="password"],
  textarea,
  select {
    // height: 40px;
    width: 400px;
    // max-width: 450px;
    font-weight: 600;
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.main1};
    border: 2px solid ${(props) => props.theme.main2};
    border-radius: 10px;
    outline: none;
    padding: 8px 10px;
    font-size: 0.9em;
  }

  textarea {
    resize: vertical;
    padding: 8px 0 45px 8px;
    font-size: 1em;
    font-weight: 600;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }

  svg {
    color: ${(props) => props.theme.fontColor};
  }

  // @media only screen and (max-width: 450px) {
  //   width: 80%;
  //   max-width: 80%;
  // }
`;
