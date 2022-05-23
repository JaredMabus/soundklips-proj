import React from "react";
import route from "../../../api/RouteSwitch";

import store from "../../../Redux/store";
import * as actions from "../../../Redux/actions";

export const fetchLogin = async (fetchData) => {
  try {
    store.dispatch(actions.accountApiPending(true));
    let uri = process.env.REACT_APP_URI + "/api/login";
    let options = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(fetchData),
    };
    let response = await fetch(uri, options);
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    store.dispatch(actions.accountApiPending(false));
  }
};

export const resendConfirmEmailAPI = async () => {
  store.dispatch(actions.accountApiPending(true));

  let uri = `${route.uri}/api/resend-confirm-email`;
  let options = {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(store.getState().account.api.errorMessage.email),
  };

  const response = await fetch(uri, options);
  const message = await response.json();

  if (response.status === 200) {
    // store.dispatch(actions.LogIn(true))
    store.dispatch(actions.setSnackBar(true, "success", "Email Sent", 5000));
  } else {
    store.dispatch(
      actions.setSnackBar(true, "error", "Email could not be sent", 5000)
    );
  }
  store.dispatch(actions.accountApiPending(false));
};
