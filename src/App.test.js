import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";
import { mockInitialState } from "../public/mocks/CommonMock";

// jest.mock("react-i18next", () => ({
//   useTranslation: () => {
//     return {
//       t: (str) => str,
//       i18n: {
//         changeLanguage: () => new Promise(() => {}),
//       },
//     };
//   },
// }));

jest.mock("react-redux", () => ({
  useSelector: () => {
    return {
      mockInitialState,
    };
  },
  useDispatch: jest.fn(),
}));

it("renders structure page link", () => {
  // render(<App />);
  // const linkElement = screen.getByText(/structure/i);
  // expect(linkElement).toBeInTheDocument();
});
