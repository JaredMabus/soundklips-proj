import React, { useState } from "react";
import styled from "styled-components";
import * as themes from "../../themes";
import { Link, NavLink } from "react-router-dom";
import { NavData } from "./NavData";
// IMAGES
import LogoLight from "../../assets/images/logo/SKLogoFullNew.svg";
import LogoDark from "../../assets/images/logo/SKLogoFullNewDark.svg";
// ICONS
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// COMPONENTS
import BasicMenu from "../mui/BasicMenu";
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";

const HeaderWrapper = styled(themes.Nav)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4em;
  max-height: 4em;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  padding: 5px 12.5%;

  @media only screen and (max-width: 1500px) {
    margin-left: 0;
    margin-right: 0;
    padding: 2px 20px;
  }
`;

const HeaderItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 0 0 0;
  font-size: 1.125em;
  font-weight: 500;

  @media only screen and (max-width: 750px) {
    justify-content: start;
  }
`;

const HeaderOpenDrawerBtn = styled.div`
  display: flex;
  cursor: pointer;
  justify-self: center;
  align-self: center;
  // font-size: 1em;
  color: #3b3434;
  margin: 0px 0 0 0;
  padding: 0 0 0 0;

  svg {
    height: 33px;
    width: auto;
    color: ${(props) => props.theme.fontColor};
  }

  svg:hover {
    color: ${(props) => props.theme.teal};
  }

  @media only screen and (min-width: 750px) {
    display: none;
    position: fixed;
  }
`;

const HeaderLogo = styled.div`
  padding: 0 10px 0 0 ; 
  height: 50px:
  width: 50px;

  img {
    height: 55px;
    width: 200px;
  }
  
  @media only screen and (max-width: 750px) {
    padding: 15px 0px 10px 15px;
    display: hidden; 
    img {
      width: 157px; 
    }
  }
`;

const HeaderLinks = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  padding: 0px 0 0 0;
  margin: 6px 15px 0 0px;

  @media only screen and (max-width: 750px) {
    display: none;
    position: fixed;
  }
`;

const HeaderAccount = styled.div`
  justify-self: end;
  align-self: center;
  // min-width: 100%;
  max-width: 100%;
  width: auto;
  svg {
    height: 30px;
    width: auto;
  }
`;

const HeaderLogin = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 1.125em;
  font-weight: 500;
  padding: 0px 10px 0 0;
  margin: 6px 0 0 0;
  max-width: 150px;
  // min-width: 64px;

  a {
    margin: 0 0 0 15px;
  }
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ drawerState }) => (drawerState ? "0px" : "-100%")};
  width: 16em;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  transition: 250ms;

  transition-timing-function: ease-in-out;
  box-shadow: 5px 2px 10px 3px rgba(0, 0, 0, 0.05);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 1;
`;

const CloseDrawerBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: auto;
  margin: 0 0px 0 55px;

  .close-btn {
    cursor: pointer;
  }

  .close-btn:hover {
    color: ${(props) => props.theme.teal};
  }
`;

const NavWrapper = styled(themes.Nav)`
  dislpay: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: flex-end;
  // background-color: #F8F9FA;
  height: 100%;
  width: 100%;
  padding: 20px 75px 0 0;
  margin: 0px 0 0 0;
  box-shadow: 5px 10px 5px 5px rgba(0, 0, 0, 0.07);
`;

const LinkWrapper = styled(themes.Nav)`  
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: nowrap; 
  align-items: center;
  height: 50px;
  min-height: 35px; 
  width: 100%;
  font-size:.98em; 
  // font-weight: 500;
  padding: 0 0 0 10px;
  margin: 0 0 0 0;
  border-radius: 0px 50px 50px 0px ;
  cursor: pointer; 
  transition: 300ms; 
  transition-timing-function: ease-in-out;
  
  a:hover{
    color: ${(props) => props.theme.fontColor}; 
  }

  :hover {
    background-color: ${(props) => props.theme.hover};
  }

  :active {
    background-color: #a0e4ff;
    }
  }

  svg {
    height: 1em; 
    width: 1em;
    margin: 0px 5px 0 5px;
  }

  svg:hover {
    color: ${(props) => props.theme.fontColor};
  }

  // .nav-item { 
  //   dislpay: flex;
  //   justify-self: center;
  //   align-items: center;
  //   max-width: 100%;
  //   max-height: 100%;
  //   margin-left: 5px; 
  // }
`;

const DrawerLeft = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const toggleDrawerState = () => {
    // console.log(drawerState)
    setDrawerState(!drawerState);
  };
  const toggleLogin = () => {
    setLoginStatus(!loginStatus);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderItems>
          <HeaderOpenDrawerBtn onClick={toggleDrawerState}>
            <MenuIcon />
          </HeaderOpenDrawerBtn>
          {store.getState().theme === "dark" ? (
            <HeaderLogo>
              <Link to="/">
                <img className="logo" src={LogoDark} alt="Logo"></img>
              </Link>
            </HeaderLogo>
          ) : (
            <HeaderLogo>
              <Link to="/">
                <img className="logo" src={LogoLight} alt="Logo"></img>
              </Link>
            </HeaderLogo>
          )}
          {NavData.map((item) => {
            return (
              <HeaderLinks key={item.id}>
                <NavLink
                  exact
                  to={item.path}
                  activeStyle={{ color: "#54B9B5", fontWeight: "500" }}
                >
                  <div className="nav-title">{item.title}</div>
                </NavLink>
              </HeaderLinks>
            );
          })}
        </HeaderItems>
        <HeaderAccount>
          {store.getState().account.loginStatus ? (
            <BasicMenu />
          ) : (
            <HeaderLogin>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </HeaderLogin>
          )}
        </HeaderAccount>
      </HeaderWrapper>
      <DrawerContainer drawerState={drawerState}>
        <NavWrapper>
          <CloseDrawerBtn>
            <ArrowBackIosIcon
              className="close-btn"
              onClick={toggleDrawerState}
            />
          </CloseDrawerBtn>
          {/* <button onClick={toggleDrawerState}><ArrowBackIosIcon/></button> */}
          {NavData.map((item) => {
            return (
              <Link to={item.path} key={item.id}>
                <LinkWrapper>
                  {/* <NavLink end to={item.path} key={item.id} activeStyle={{color:`${props => props.theme.fontColor}`, borderBottom:`3.5px solid #a0e4ff`, width: `auto`}}> */}
                  {/* <div className="nav-icon">{item.icon}</div> */}
                  {/* </NavLink> */}
                  <div className="nav-icon">{item.icon}</div>
                  <div className="nav-title">{item.title}</div>
                </LinkWrapper>
              </Link>
            );
          })}
        </NavWrapper>
      </DrawerContainer>
    </>
  );
};
export default DrawerLeft;
