import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import formBuilderReducer from "./features/formBuilder/formBuilderSlice";

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === "development",
});
