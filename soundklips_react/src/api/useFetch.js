import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../Redux/actions";
const useFetch = () => {
  const dispatch = useDispatch();
  const host = process.env.REACT_APP_URI;
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [apiError, setapiError] = useState(null);

  const runFetch = async (url, fetchData) => {
    try {
      dispatch(actions.accountApiPending(true));
      //   console.log(fetchData);
      let uri = host + url;
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
      dispatch(actions.accountApiPending(false));
    }
  };

  //   useEffect(() => {}, []);

  //   return { rresponse, rdata, rerror, runFetch };
  return { runFetch };
};

export default useFetch;
