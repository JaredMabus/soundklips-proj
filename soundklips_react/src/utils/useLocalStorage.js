import { useState, useEffect } from "react";
import * as actions from "../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import store from "../Redux/store";

export const useLocalStorage = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("token");
  });

  const dispatch = useDispatch();

  useSelector(() => {
    let newToken = JSON.stringify(store.getState().account);
    localStorage.setItem("item", newToken);
    setTokenInternal(newToken);
  });

  return [token];
};
