import React, { useState, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import store from "./Redux/store";
import { Provider } from "react-redux";
import App from "./App";

test("Render Main App", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Create music with SoundKlips/i);
  expect(linkElement).toBeInTheDocument();
  let testDefaultTheme = store.getState().theme;
  expect(testDefaultTheme).toBe("light");
});
