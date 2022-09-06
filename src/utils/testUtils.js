import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import formBuilderReducer, {
  initialState as state,
} from "../redux/features/formBuilder/formBuilderSlice";

export function renderWithProviders(
  ui,
  {
    initialState = state,
    store = configureStore({
      reducer: {
        formBuilder: formBuilderReducer,
      },
      state,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
