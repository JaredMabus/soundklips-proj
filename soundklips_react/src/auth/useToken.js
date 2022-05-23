import { useState, useEffect } from "react";
import * as actions from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import store from "../Redux/store";

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    let localToken = localStorage.getItem("token");
  });

  const setLocalToken = (data) => {
    localStorage.setItem("token", data.token);
  };

  const decodePayload = (token) => {
    let payload = token.split(".")[1];
    let decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  };

  const setPayload = (token) => {
    try {
      let payload = decodePayload(token);

      store.dispatch(
        actions.LogIn({
          loginStatus: payload.login_success,
          email: payload.email,
          account_id: payload.account_id,
        })
      );
      return payload;
    } catch (err) {
      console.log(err);
    }
  };

  const setLoginStatusRedux = (payload) => {
    try {
      store.dispatch(
        actions.LogIn({
          loginStatus: payload.login_success,
          account_id: payload.account_id,
          email: payload.email,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {}, []);

  return { setLocalToken, decodePayload, setPayload };
};
