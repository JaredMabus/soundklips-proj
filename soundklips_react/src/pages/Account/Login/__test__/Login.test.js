import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "../../../../Redux/store";
import { BrowserRouter } from "react-router-dom";

import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
// import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

// import useForm from "../useForm";
import Login from "../Login";

// afterEach(cleanup);

test("Login Initial Render", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
});

test("Initial render with correct form values", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  var formLogin = screen.queryByTestId("form-login");

  expect(formLogin).toHaveFormValues({
    email: "",
    password: "",
  });
});

// test("update login form inputs", () => {
//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <Login />
//       </BrowserRouter>
//     </Provider>
//   );
//   var formLogin = screen.queryByTestId("form-login");
//   var inputEmail = screen.queryByTestId("input-email");
//   var inputPassword = screen.queryByTestId("input-password");

//   // userEvent.type(inputEmail, "");
//   // userEvent.type(inputPassword, "t");

//   fireEvent.change(inputEmail, { target: { value: "test@test123" } });
//   fireEvent.change(inputPassword, "123");
//   fireEvent.click();
//   // userEvent.click(screen.queryByTestId("btn-sign-in"));

//   var errorEmail = screen.queryByTestId("error-email");

//   expect(errorEmail).toHaveTextContent("*Email address was invalid");
//   // expect(inputEmail).toHaveValue("test@test123");
//   // expect(formLogin).toHaveFormValues({
//   //   email: "",
//   //   password: "",
//   // });
// });
