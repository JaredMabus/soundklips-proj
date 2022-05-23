import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import validateFormData from "./validation";
// API
import { fetchLogin } from "./LoginApi";
// REDUX
import store from "../../../Redux/store";
import * as actions from "../../../Redux/actions";
import { useToken } from "../../../auth/useToken";

const useForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { setPayload } = useToken();
  const [curValue, setValue] = useState({
    email: "test@test123.com",
    password: "password",
  });
  const { setLocalToken } = useToken();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue({
      ...curValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateFormData(curValue));
    loginAPI(curValue);
  };

  // const successfulLogin = (data) => {
  //   setLocalToken(data);
  //   let payload = setPayload(data.token);
  //   console.log(payload);
  // };

  const loginAPI = async () => {
    try {
      const isError = validateFormData(curValue);
      if (Object.keys(isError).length === 0) {
        const response = await fetchLogin(curValue);
        const data = await response.json();
        // Successful Login
        if (response.status === 200) {
          setLocalToken(data);
          setPayload(data.token);
          history.push("/");
          // User needs to comfirm email
        } else if (
          response.status === 500 &&
          data["errorMessage"] === "confirm_email"
        ) {
          store.dispatch(
            actions.accountApiError({ error: true, errorMessage: data })
          );
          store.dispatch(
            actions.setSnackBar(
              true,
              "info",
              "Please Confirm Your Email Address",
              15000
            )
          );
          // Incorect Email or Password
        } else if (
          response.status === 404 &&
          data["errorMessage"] === "Incorrect Email or Password"
        ) {
          store.dispatch(
            actions.accountApiError({ info: true, errorMessage: data })
          );
          store.dispatch(
            actions.setSnackBar(
              true,
              "info",
              "Incorrect Email or Password",
              10000
            )
          );
          // Catch all other response errors
        } else {
          store.dispatch(
            actions.setSnackBar(true, "error", "Login Failed", 5000)
          );
        }
      } else {
        // console.log("Form has errors");
        return;
      }
    } catch (err) {
      // console.log(err);
      // throw err;
      store.dispatch(
        actions.accountApiError({
          error: true,
          errorMessage: "Could Not Connect to Server",
        })
      );
      store.dispatch(
        actions.setSnackBar(true, "error", "Could Not Connect to Server", 10000)
      );
      store.dispatch(actions.accountApiPending(false));
    }
  };

  useEffect(() => {}, []);

  return { curValue, errors, handleChange, handleSubmit };
};

export default useForm;
