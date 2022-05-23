import react from "react";
// import apiUri from "../../api/RouteSwitch";
import store from "../../Redux/store";
import * as actions from "../../Redux/actions";

export const AudioDataApi = async () => {
  try {
    store.dispatch(actions.setApiLoading(true));
    let ad = {
      account_id: store.getState().account.account_id,
      token: localStorage.getItem("token"),
    };
    let uri = `${process.env.REACT_APP_URI}/api/select/audio-data/account`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(ad),
    };
    var response = await fetch(uri, options);
    var data = await response.json();

    if (response.status === 200) {
      return data;
    } else {
      console.log("No Audio Data");
    }
  } catch (err) {
    console.log(err);
  } finally {
    store.dispatch(actions.setApiLoading(false));
  }
};
