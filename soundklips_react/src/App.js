import React, { useState, useEffect, useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import * as themes from "./themes";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// -- COMPONENTS -- //
import * as pages from "./pages/index";
import * as actions from "./Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useToken } from "./auth/useToken";

const App = () => {
  const state = useSelector((state) => state);
  // const [localTheme, setTheme] = useState(null);
  const { decodePayload, setPayload } = useToken();
  const loginStatus = useSelector((state) => state.account.loginStatus);
  const reduxTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    try {
      if (localStorage.getItem("token")) {
        setPayload(localStorage.getItem("token"));
      } else {
        return;
      }
    } catch (err) {
      throw err;
    } finally {
      if (localStorage.getItem("theme")) {
        let theme = localStorage.getItem("theme");
        dispatch(actions.setReduxTheme(theme));
      } else {
        return;
      }
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <ThemeProvider
        theme={reduxTheme === "light" ? themes.light : themes.dark}
      >
        <themes.GlobalStyles />
        <themes.StyledApp>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={pages.Home} />
              <Route exact path="/discover" component={pages.Discover} />
              <Route exact path="/library" component={pages.Library} />
              <Route exact path="/account" component={pages.Account} />
              <Route
                exact
                path="/login"
                render={() =>
                  loginStatus ? <Redirect to="/" /> : <pages.Login />
                }
              />
              <Route
                exact
                path="/register"
                render={() =>
                  loginStatus ? <Redirect to="/" /> : <pages.Register />
                }
              />
              <Route
                exact
                path="/settings"
                render={() =>
                  loginStatus ? <pages.Settings /> : <Redirect to="/" />
                }
              />
              <Route
                exact
                path="/upload"
                component={pages.AudioUpload}
                // render={() =>
                //   loginStatus ? <pages.AudioUpload /> : <Redirect to="/" />
                // }
              />
              <Route component={pages.Home} />
            </Switch>
          </BrowserRouter>
        </themes.StyledApp>
      </ThemeProvider>
    </>
  );
};
export default App;
