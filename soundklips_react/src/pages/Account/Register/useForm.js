import { useState } from "react";
import validateFormData from "./validation";
import route from "../../../api/RouteSwitch";
import store from "../../../Redux/store";
import * as actions from "../../../Redux/actions";
// import Register from "./Register";

export const RegisterAPIResend = async (curValue) => {
  store.dispatch(actions.setApiLoading(true));

  let uri = `${route.uri}/api/resend-confirm-email`;
  let options = {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(curValue.email),
  };

  const response = await fetch(uri, options);

  const message = await response.json();
  // console.log(message)

  store.dispatch(actions.setApiLoading(false));
};

const useForm = () => {
  const [curValue, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [registerApiSuccess, setRegisterApiSuccess] = useState(false);
  const [registerApiErrors, setRegisterApiErrors] = useState(null);

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
    RegisterAPI(curValue);
  };

  const RegisterAPI = async () => {
    try {
      var isError = validateFormData(curValue);
      // console.log(isError)

      if (Object.keys(isError).length === 0) {
        store.dispatch(actions.setApiLoading(true));
        let uri = `${route.uri}/api/create-account`;
        let options = {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(curValue),
        };

        const response = await fetch(uri, options);
        const message = await response.json();

        if (response.status === 200) {
          setRegisterApiSuccess(response.ok);
          store.dispatch(actions.setSnackBar(true, "success", "Email Sent"));
          //Account already exist
        } else if (
          response.status === 404 &&
          message["db_err_message"] === "IntegrityError"
        ) {
          setRegisterApiErrors({
            status: response.status,
            statusText: response.statusText,
          });
          store.dispatch(
            actions.setSnackBar(
              true,
              "info",
              "Account with that email already exist"
            )
          );
          store.dispatch(actions.setApiLoading(false));
        } else {
          setRegisterApiErrors({
            status: response.status,
            statusText: response.statusText,
          });
          store.dispatch(
            actions.setSnackBar(true, "info", "Email Did not send")
          );
        }
        setRegisterApiSuccess(response.ok);
      } else {
        return;
      }
    } catch (err) {
      console.error(err);
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
  return {
    curValue,
    errors,
    handleChange,
    handleSubmit,
    registerApiSuccess,
    registerApiErrors,
  };
};

export default useForm;
