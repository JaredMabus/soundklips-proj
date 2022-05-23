import * as actions from "../Redux/actions";
import store from "../Redux/store";

export const fetchAPI = async (url, data, fetchMethod = "post") => {
  try {
    store.dispatch(actions.setApiLoading(true));
    const fetchData = {};
    fetchData["token"] = localStorage.getItem("token");
    fetchData["data"] = data;

    let uri = process.env.REACT_APP_URI + url;
    let options = {
      method: fetchMethod,
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
    store.dispatch(actions.setApiLoading(false));
  }
};
