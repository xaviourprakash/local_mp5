import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";

import OutputAudio from "./OutputAudio";
import OutputAudioService from "./OutputAudio.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";
import { mockOutputAudioProps } from "../../../../public/mocks/OutputAudioMock";
import { renderWithProviders } from "../../../utils/testUtils";

// jest.mock("react-i18next", () => ({
//   useTranslation: jest.fn(),
// }));

// const tSpy = jest.fn((str) => str);
// const useTranslationSpy = useTranslation;

// useTranslationSpy.mockReturnValue({
//   t: tSpy,
//   i18n: {
//     changeLanguage: () => new Promise(() => {}),
//   },
// });

beforeAll(() => {
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

  // jest.mock("../../formBuilder/FormBuilder.service", () => ({
  //   setTranslation: jest.fn(),
  //   getTranslation: jest.fn(),
  // }));

  jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
  }));
});

afterAll(cleanup);

describe("Output audio form element", () => {
  const formTitleText = "test output audio";
  const audioLinkText = "audio link";

  it("should check for output audio type from JSON", () => {
    expect(mockOutputAudioProps.element.type).toEqual(
      FormBuilderResource.Output_Audio_Type
    );
  });

  it("should check for output audio form title", () => {
    renderWithProviders(<OutputAudio {...mockOutputAudioProps} />);

    //const spy = jest.spyOn(FBService.translationText, FBService.getTranslation);

    const formElement = screen.getByText(
      FormBuilderResource.Label_Audio_Player_Output
    );

    expect(formElement).toHaveClass("textTitleHead");
    expect(formElement.innerHTML).toBe(
      FormBuilderResource.Label_Audio_Player_Output
    );
  });

  // it("should check for output audio link text", () => {
  //   render(<OutputAudio {...mockOutputAudioProps} />);
  //   const cardElement = screen.getByTestId("audio_link");
  //   expect(cardElement).toHaveDisplayValue(audioLinkText);
  // });
});

describe("Output audio card services", () => {});
