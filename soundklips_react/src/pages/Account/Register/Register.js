import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as themes from "../../../themes";
import { Link } from "react-router-dom";
import useForm from "./useForm";
// MUI
import LinearBuffer from "../../../components/mui/LinearBuffer";
import SnackBar from "../../../components/mui/Snackbar";
import AcctCreationProgress from "../../../components/mui/AcctCreationProgress";
// IMAGES
import LogoLight from "../../../assets/images/logo/SKLogoFullNotLevel.svg";
import LogoDark from "../../../assets/images/logo/SKLogoFullNotLevelDark.svg";
// ICONS
import EmailSent from "../../../assets/images/myUI/EmailSent.svg";
// REDUX
import { useSelector } from "react-redux";
import store from "../../../Redux/store";
import * as actions from "../../../Redux/actions";

const RegisterPage = styled(themes.FlexPage)`
  min-height: 100vh;
  min-width: 100vw;
  background-color: ${(props) => props.theme.main1};
`;

const PageHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 100%;
  margin: 50px 0 25px 0;
  padding: 20px 10px 0 10px;

  img {
    height: 125px;
    width: 100%;
  }
  @media only screen and (max-width: 625px) {
    margin: 25px 0 15px 0;

    img {
      height: 100px;
      width: 100%;
    }
  }
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: auto;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.theme.main1};

  a {
    text-decoration: none;
    color: #54b9b5;
    transition: 250ms;
  }

  a:hover {
    text-decoration: underline;
    color: #c8df3d;
  }
`;

const RegisterForm = styled(themes.Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  min-width: 350px;
  max-width: 350px;
  height: 100%;
  min-height: 100%;
  max-height: 464px;
  flex-wrap: nowrap;
  padding: 35px 0px 25px 0px;
  box-shadow: 0px 15px 25px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media only and (max-width: 750px) {
    width: 50%;
    min-width: 50%;
  }
`;

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-self; center; 
  align-self: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;  

  p {
    font-size: .9em;
    margin: 20px 0 0  0; 
  }

  h2 {
    margin: 0 0 15px 0;
    padding: 0; 
  }
  
  hr {
    margin: 5px 0 0 0;
  }
  a {
    text-decoration: none;
    color: #54B9B5;
    transition: 250ms; 
  }

  a:hover {
    text-decoration: underline;
    color: #C8DF3D;
  }
`;

const FormInput = styled(themes.Form)`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100%;
  margin: 0 0 15px 0;

  input[type="text"],
  input[type="password"] {
    // font-weight: 600;
    height: 45px;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    margin: 0 0 0 0;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    font-size: 1em;
  }

  input[type="submit"] {
    align-self: center;
    font-weight: 700;
    color: #54b9b5;
    background-color: ${(props) => props.theme.formBg};
    width: 65%;
    min-width: 65%;
    max-width: 65%;
    padding: 10px;
    cursor: pointer;
    border-radius: 100px;
    outline: none;
    border: 2px solid #54b9b5;
    transition: 350ms ease-in-out;
    box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }

  input[type="submit"]:hover {
    background-color: #54b9b5;
    color: #fff;
    box-shadow: 3px 5px 3px 0px rgba(0, 0, 0, 0.3);
  }
`;

const Errors = styled.div`
  color: #cf3636;
  font-size: 14px;
  padding: 0;
  margin: -5px 0 10px 10px;
  font-weight: 600;

  p {
    margin: 0;
    padding: 0;
  }
`;

const ConfirmEmailWrapper = styled.div`
  display: flex;
  flex-direction: column:
  justify-self: center;
  align-self: center;  
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;  
  min-width: 100%;
  min-height: 450px;
  // padding: 0 75px 0 75px;
  padding: 0 0px 0 0px;
  border-radius: 20px;

  @media only screen and (max-width: 650px) {
    padding: 0 50px 0 50px;
  } 
  
`;

const ConfirmEmailMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  flex-wrap: nowrap;

  h1 {
    margin: 0 0 10px 0;
  }

  h3 {
    margin: 0;
  }

  p {
    font-weight: 400;
    margin: 0;
    font-size: 1em;
  }

  a {
    font-size: 1em;
  }

  img {
    height: 75px;
    width: auto;
    margin: 0 0 0px 0;
  }
`;

const ConfirmEmailItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  min-width: 100%;
  margin: 0 0 25px 0;
`;

const LinearBufferWrapper = styled.div`
  min-width: 100%;
  max-width: 100%;
`;

const RegisterStepWrapper = styled.div`
  display: flex;
  align-self: center;
  justify-center: center;
  flex-direction: row;
  // justify-content: center;
  // align-items: center;
  width: 50%;
  height: auto;
`;

const Register = () => {
  const {
    curValue,
    errors,
    handleChange,
    handleSubmit,
    registerApiSuccess,
    registerApiErrors,
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const apiLoading = useSelector((state) => state.loading.apiLoading);
  store.subscribe(() => {
    setLoading(store.getState().loading.apiLoading);
  });

  useEffect(() => {}, [errors]);

  return (
    <>
      <RegisterPage>
        <SnackBar />
        <PageHeaderWrapper>
          {store.getState().theme === "dark" ? (
            <Link to="/">
              <img src={LogoDark} alt="Sound Klips Header" />
            </Link>
          ) : (
            <Link to="/">
              <img src={LogoLight} alt="Sound Klips Header" />
            </Link>
          )}
        </PageHeaderWrapper>
        <RegisterContainer>
          {registerApiSuccess ? (
            <ConfirmEmailWrapper>
              <ConfirmEmailMessage>
                <>
                  <ConfirmEmailItem>
                    <img src={EmailSent} alt="email sent icon" />
                  </ConfirmEmailItem>
                  <ConfirmEmailItem>
                    <h1>Confirmation Email Sent</h1>
                    <br></br>
                    <br></br>
                  </ConfirmEmailItem>
                  <ConfirmEmailItem>
                    <h3>
                      Confirm your email address to finish setting up your
                      account
                    </h3>{" "}
                    <br></br>
                  </ConfirmEmailItem>
                  <ConfirmEmailItem>
                    <p>
                      Don't see an email? <Link to="/login"> Sign In</Link> and
                      select "Resend Email"{" "}
                    </p>
                  </ConfirmEmailItem>
                </>
              </ConfirmEmailMessage>
            </ConfirmEmailWrapper>
          ) : (
            <>
              <RegisterForm>
                <form action="" method="post" onSubmit={handleSubmit}>
                  <FormInputWrapper>
                    <FormInput>
                      <h2>Create Account</h2>
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={curValue.email}
                        onChange={handleChange}
                      />
                    </FormInput>
                    <Errors>{errors.email && <p>*{errors.email}</p>}</Errors>
                    <FormInput>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={curValue.password}
                        onChange={handleChange}
                      />
                    </FormInput>
                    <Errors>
                      {errors.password && <p>*{errors.password}</p>}
                    </Errors>
                    <FormInput>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={curValue.confirmPassword}
                        onChange={handleChange}
                      />
                    </FormInput>
                    <Errors>
                      {errors.confirmPassword && (
                        <p>*{errors.confirmPassword}</p>
                      )}
                    </Errors>
                    <FormInput>
                      <input type="submit" value="Create Account" />
                    </FormInput>
                    {apiLoading ? <LinearBuffer /> : <hr></hr>}
                    {/* {store.getState().account.api.pending ? (
                      <LinearBufferWrapper>
                        <LinearBuffer />
                      </LinearBufferWrapper>
                    ) : (
                      <div></div>
                    )} */}
                    <p>
                      Already have an account? |{" "}
                      <Link to="/login">Sign-In</Link>
                    </p>
                  </FormInputWrapper>
                </form>
              </RegisterForm>
            </>
          )}
        </RegisterContainer>
        {/* <RegisterStepWrapper>
      <AcctCreationProgress/>
    </RegisterStepWrapper> */}
      </RegisterPage>
    </>
  );
};
export default Register;
