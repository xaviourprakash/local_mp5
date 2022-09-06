import reducer, {
  updateFormData,
  updateFormFields,
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "./formBuilderSlice";
import { mockInitialState } from "../../../../public/mocks/CommonMock";
import {
  mockFormDataActionPayload,
  mockUpdatedFormDataResponse,
  mockUpdatedFormDataResponse3,
  mockFormDataActionPayload3,
} from "../../../../public/mocks/FormBuilderSliceMock";

describe("form builder slice reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(mockInitialState);
  });

  it("should update the form data", () => {
    expect(
      reducer(mockInitialState, updateFormData(mockFormDataActionPayload))
    ).toEqual(mockUpdatedFormDataResponse);
  });

  // it("should update the form fields", () => {
  //   expect(
  //     reducer(
  //       mockInitialState.formData.form_body.fields,
  //       updateFormData(mockActionPayload.form_body.fields)
  //     )
  //   ).toEqual(mockResponse.formData.form_body.fields);
  // });

  it("should update the form fields by element id", () => {
    const response = reducer(
      mockUpdatedFormDataResponse3,
      updateFormFieldsByElementId(mockFormDataActionPayload3)
    );

    expect(response.formData.form_body.fields[0].field_options.label).toEqual(
      "Test Label"
    );
    expect(
      response.formData.form_body.fields[0].field_options.break_line
    ).toBeTruthy();
    expect(
      response.formData.form_body.fields[0].field_options.keep_on_previous_page
    ).toBeTruthy();
  });

  it("should update the form modfication status", () => {
    const response1 = reducer(
      mockInitialState,
      updateFormModificationStatus(true)
    );
    const response2 = reducer(
      mockInitialState,
      updateFormModificationStatus(false)
    );
    expect(response1.formModificationStatus).toBeTruthy();
    expect(response2.formModificationStatus).toBeFalsy();
  });
});
