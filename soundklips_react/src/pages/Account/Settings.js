import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as themes from "../../themes";
import UI from "../../components/UI";
import { Link } from "react-router-dom";
import LinearBuffer from "../../components/mui/LinearBuffer";
import SnackBar from "../../components/mui/Snackbar";
// REDUX
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";
import { useSelector } from "react-redux";
// COMPONENTS
// import Drawer from "../../components/DrawerLeft/DrawerLeft";

const SettingsContainer = styled(themes.FlexPage)``;

const SettingsContent = styled(themes.Content)`
  height: 1000px;
  width: 100%;
  background-color: ${(props) => props.theme.formBg};
  border-radius: 0;
  padding: 30px 30px;

  h {
    margin: 0;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;

  input {
    margin: 3px 0 0 10px;
    height: 15px;
    width: 15px;
  }
`;
const ThemeToggler = styled.div`
  max-width: 5px;
  height: auto;
`;

const Settings = () => {
  const theme = useSelector((state) => state.theme);
  const [darkTheme, setCheck] = useState(true);

  const toggleTheme = () => {
    try {
      if (localStorage.getItem("theme")) {
        let localTheme = localStorage.getItem("theme");
        if (localTheme === "light") {
          store.dispatch(actions.setReduxTheme("dark"));
          localStorage.setItem("theme", "dark");
        } else if (localTheme === "dark") {
          store.dispatch(actions.setReduxTheme("light"));
          localStorage.setItem("theme", "light");
        }
      } else {
        if (store.getState().theme === "light") {
          store.dispatch(actions.setReduxTheme("dark"));
          localStorage.setItem("theme", "dark");
        } else {
          store.dispatch(actions.setReduxTheme("light"));
          localStorage.setItem("theme", "light");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (store.getState().theme === "dark") {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, []);
  return (
    <>
      <UI />
      <SettingsContainer>
        <SettingsContent>
          <h2>Settings</h2>
          <hr></hr>
          <Item>
            <label htmlFor="theme">Dark Theme:</label>
            <ThemeToggler>
              <input
                type="checkbox"
                id="theme"
                name="theme"
                checked={darkTheme}
                onClick={toggleTheme}
                onChange={() => setCheck(!darkTheme)}
              />
            </ThemeToggler>
            {/* {theme === "dark" ? (
              <ThemeToggler>
                <input
                  type="checkbox"
                  id="theme"
                  name="theme"
                  checked={checked}
                  onClick={toggleTheme}
                  onChange={setCheck(!checked)}
                />
              </ThemeToggler>
            ) : (
              <ThemeToggler>
                <input
                  type="checkbox"
                  id="theme"
                  name="theme"
                  checked={checked}
                  onClick={toggleTheme}
                  onChange={setCheck(!checked)}
                />
              </ThemeToggler>
            )} */}
          </Item>
        </SettingsContent>
      </SettingsContainer>
    </>
  );
};

export default Settings;
