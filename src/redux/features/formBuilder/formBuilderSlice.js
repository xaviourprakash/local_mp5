import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    id: "",
    name: "",
    form_body: {
      fields: [],
    },
  },
  formModificationStatus: false,
  upload_data_array: {},
  previewBriefing: {},
  showNodes: [],
};

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = action.payload;
    },
    updateFormFields: (state, action) => {
      state.formData.form_body.fields = action.payload;
    },
    updateFormFieldsByElementId: (state, action) => {
      const index = state.formData.form_body.fields.findIndex(
        (field) => field.internalId === action.payload.internalId
      );
      state.formData.form_body.fields[index] = action.payload;
    },
    updateFormModificationStatus: (state, action) => {
      state.formModificationStatus = action.payload;
    },
    updateFormDataFields: (state, action) => {
      state.upload_data_array = action.payload;
    },
    updatePreviewBriefing: (state, action) => {
      state.previewBriefing = action.payload;
    },
    updateShowNodes: (state, action) => {
      state.showNodes = action.payload;
    },
  },
});

export const {
  updateFormData,
  updateFormFields,
  updateFormFieldsByElementId,
  updateFormModificationStatus,
  updateFormDataFields,
  updateShowNodes,
  updatePreviewBriefing,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
