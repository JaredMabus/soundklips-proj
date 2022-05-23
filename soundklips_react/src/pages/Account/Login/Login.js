import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import * as themes from "../../../themes";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import useForm from "./useForm";
// UI
import LinearBuffer from "../../../components/mui/LinearBuffer";
// import LinearBufferStill from "../../assets/images/myUI/LinearBufferStill.svg";
import SnackBar from "../../../components/mui/Snackbar";
// API
import { resendConfirmEmailAPI } from "./LoginApi";
// IMAGES
import LoginTextBG from "../../../assets/images/background/LoginSidePanelBg.svg";
import LogoLight from "../../../assets/images/logo/SKLogoFullNotLevel.svg";
import LogoDark from "../../../assets/images/logo/SKLogoFullNotLevelDark.svg";
// ICONS
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import SendIcon from "@mui/icons-material/Send";
// STATE MGMT
import * as actions from "../../../Redux/actions";
import store from "../../../Redux/store";
import { useSelector, useDispatch } from "react-redux";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.main2};

  @media only screen and (max-width: 650px) {
    padding: 0px 10px;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: center;
  // align-items: center;
  height: auto;
  min-height: 450px;
  max-height: 500px;
  min-width: 620px;
  max-width: 850px;
  background-color: ${(props) => props.theme.formBg};
  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadowSoft};
  margin: 0 0 125px 0;
  // padding: 0 15px 0 0;

  @media only screen and (max-width: 625px) {
    flex-direction: column;
    width: 85%;
    max-height: 650px;
    min-width: 350px;
    max-width: 400px;
    padding: 0 0 25px 0;
    margin: 20px 0 75px 0;
  }
`;

const LoginSidePanel = styled.div`
  width: 42%;
  height: 100%;
  background-color: ${(props) => props.theme.main1};
  border-radius: 20px 0px 0px 20px;
  background-image: url(${LoginTextBG});
  background-repeat: no-repeat;
  padding: 0px 25px 0 0;

  @media only screen and (max-width: 625px) {
    width: 100%;
    min-height: 140px;
    border-radius: 20px 20px 0px 0px;
    font-size: 1em;
    background-position: left;
  }
`;

const LoginContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // justify-self: center;
  // align-self: center;
  width: 100%;
  height: auto;
  padding: 0 10px;
  // margin: 0 0 20px 0;

  img {
    height: auto;
    width: 320px;
    min-width: 300px;
    max-width: 500px;
    margin: 0 auto;
  }

  a {
    display: flex;
    justify-content: center;
    margin: 0 0 10px 0;
  }

  @media only screen and (max-width: 625px) {
    margin: 20px 0 15px 0;

    img {
      width: 290px;
    }
  }
`;

const LoginForm = styled(themes.Form)`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  // width: 360px;
  // min-width: 350px;
  // height: 100%;
  padding: 30px 0px 25px 0px;

  svg {
    margin: 0 3px 0 0;
  }

  input[type="text"],
  input[type="password"] {
    height: 45px;
    width: 100%;
    min-width: 240px;
    // max-width; 350px;
    margin: 0 0 0 0;
    border-radius: 10px;
    outline: none;
    padding-left: 8px;
    font-size: 0.9em;
  }

  // @media only screen and (max-width: 600px) {
  //   justify-content: center;
  //   align-self: center;
  // }
`;

const LoginInput = styled(themes.Form)`
  display: flex;
  flex-dierction: row;
  justify-content: center;
  align-items: center;
`;

const LoginSubmitBtn = styled.div`
  display: flex;
  // justify-self: center; 
  // align-self: center;
  justify-content: center; 
  align-items: end;
  width: 100%;
  height: auto;
  margin: 20px 0 0 10px ;
  
  input[type=submit] {
    font-weight: 700; 
    color:${(props) => props.theme.teal};
    background-color:${(props) => props.theme.main3};
    padding: 10px; 
    width: 200px;
    cursor: pointer;
    border-radius: 100px;
    outline: none;
    border: 2px solid #54B9B5; 
    transition: 300ms ease-in-out;
    box-shadow: 1px 1px 3px 0px rgba(0,0,0,.1);
    margin: 0 0 10px 0;  
  }

  input[type=submit]:hover {
    background-color:#54B9B5;
    color: ${(props) => props.theme.white};
    box-shadow: 3px 5px 3px 0px rgba(0,0,0,.1);
  }

  input[type=submit]:active {
    box-shadow: 3px 5px 3px 0px rgba(0,0,0,.1););
  }
`;

const RegisterLink = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  justify-content: start;
  align-items: start;
  // background-color: #fff;
  font-size: 0.9em;

  a {
    text-decoration: underline;
    font-weight: 600;
    color: #54b9b5;
    transition: 150ms;
  }

  a:hover {
    color: #e2e700;
  }
`;

const Errors = styled.div`
  // color: #c73f36;
  // color: #545353;
  color: #cf3636;
  font-size: 13px;
  font-weight: 600;
  padding: 0;
  margin: 3px 0 20px 30px;

  p {
    margin: 0;
    padding: 0;
  }
`;

const ConfirmEmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 20px 0 0 0;
`;

const ConfirmEmailButton = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  min-height: 50px;
  max-height: 50px;

  p {
    margin: 0px 5px 0px 0;
  }

  svg {
    height: 20px;
    width: 20px;
    margin: 0 0 0 0;
  }

  button {
    width: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${(props) => props.theme.main3};
    color: #54b9b5;
    border: 2px solid #54b9b5;
    border-radius: 100px;
    transition: 250ms;

    font-size: 0.9em;
    font-weight: 600;
  }

  button:hover {
    background-color: #54b9b5;
    color: #fff;
    box-shadow: 3px 5px 3px 0px rgba(0, 0, 0, 0.2);
  }

  button:active {
    box-shadow: 3px 5px 3px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Login = () => {
  const { curValue, errors, handleChange, handleSubmit } = useForm();
  const localTheme = useSelector((state) => state.theme);
  const confirmEmail = useSelector(
    (state) => state.account.api.errorMessage.errorMessage
  );
  const dispatch = useDispatch();
  const apiLoading = useSelector((state) => state.account.api.pending);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <LoginContainer>
        <SnackBar />
        <LoginWrapper>
          <LoginSidePanel />
          <LoginContentWrapper>
            <LogoWrapper>
              <Link to="/">
                {localTheme === "dark" ? (
                  <img src={LogoDark} alt="Sound Klips Homepage Logo"></img>
                ) : (
                  <img src={LogoLight} alt="Sound Klips Homepage Logo"></img>
                )}
              </Link>
              {apiLoading ? <LinearBuffer /> : <hr></hr>}
            </LogoWrapper>
            <LoginForm>
              <form
                action=""
                method="post"
                onSubmit={handleSubmit}
                data-testid="form-login"
              >
                <LoginInput>
                  <AlternateEmailIcon />
                  {/* <lable htmlFor="email"></lable><AlternateEmailIcon/> */}
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={curValue.email}
                    onChange={handleChange}
                    placeholder="Email"
                    data-testid="input-email"
                  />
                </LoginInput>
                <Errors>
                  {errors.email && (
                    <p data-testid="error-email">*{errors.email}</p>
                  )}
                </Errors>
                <LoginInput>
                  <LockIcon />
                  {/* <lable htmlFor="password"></lable><LockIcon/> */}
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={curValue.password}
                    onChange={handleChange}
                    placeholder="Password"
                    data-testid="input-password"
                  />
                </LoginInput>
                <Errors>
                  {errors.password && (
                    <p data-testid="error-password">*{errors.password}</p>
                  )}
                </Errors>
                <LoginSubmitBtn>
                  <input
                    type="submit"
                    value="Sign-In"
                    data-testid="btn-sign-in"
                  />
                </LoginSubmitBtn>
              </form>
            </LoginForm>
            {confirmEmail === "confirm_email" ? (
              <ConfirmEmailWrapper>
                <ConfirmEmailButton>
                  <button onClick={resendConfirmEmailAPI}>
                    <p>Resend Email Validation</p>
                    <SendIcon />
                  </button>
                </ConfirmEmailButton>
              </ConfirmEmailWrapper>
            ) : (
              <RegisterLink>
                <p>
                  New to Sound Klips?{" "}
                  <Link to="/register">
                    <b> Create Account</b>
                  </Link>
                </p>
              </RegisterLink>
            )}
          </LoginContentWrapper>
        </LoginWrapper>
        <Footer />
      </LoginContainer>
    </>
  );
};

export default Login;
