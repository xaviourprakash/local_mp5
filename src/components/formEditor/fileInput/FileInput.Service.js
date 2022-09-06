import TextFieldResource from "../../../resource/TextField.Resource";
import { TextArea, CheckBox, TextInput, Accordion } from "../../common";
import FormEditorService from "../FormEditor.service";

const FileInputService = {
  updateFileOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };

    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_Instructions:
      case TextFieldResource.FieldName_DetailedInstruction:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
      case TextFieldResource.Min_File:
      case TextFieldResource.Max_File:
      case TextFieldResource.file_extensions:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [name]: value },
        };
        break;
      case TextFieldResource.FieldName_Description:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, description: value },
        };
        break;
      case TextFieldResource.FieldName_KeepOnPreviousPage:
      case TextFieldResource.FieldName_detect_faces:
      case TextFieldResource.FieldName_must_be_consumed:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
          },
        };
        break;
      case TextFieldResource.FieldName_IsMandatory:
        updatedData = { ...fields, [name]: value };
        break;
      case TextFieldResource.FieldName_InternalName_Slug:
        updatedData = {
          ...fields,
          slug: FormEditorService.checkInternalNameValidation(value),
        };
        break;
      case TextFieldResource.mp_df_mobile_create:
      case TextFieldResource.mp_df_mobile_edit:
      case TextFieldResource.mp_df_mobile_validate:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            show_in_nodes: {
              ...showNodes,
              [name]: value === true ? "true" : "false",
            },
          },
        };
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  updateFileOnBlurHandler(data, fields) {
    let updatedData, maxValue;
    let fieldOptions = { ...fields.field_options };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.Min_File:
        maxValue =
          parseInt(value) > parseInt(fieldOptions.max) && !!fieldOptions.max
            ? value
            : fieldOptions.max;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, min: value, max: maxValue },
        };
        break;
      case TextFieldResource.Max_File:
        maxValue =
          parseInt(fieldOptions.min) > parseInt(value)
            ? fieldOptions.min
            : value;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, max: maxValue },
        };
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  getFileBasicDetails(data) {
    let { fields, onChangeHandler, onBlurHandler, t, dataFields } = data;

    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
            onBlurHandler={onBlurHandler}
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Label}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Label}
            label={`${t(
              "contentTranslator:content.title",
              TextFieldResource.Title
            )}`}
            value={fields?.field_options?.label}
            isDisableEnterKey={true}
            cssClass="col-12"
            dataFields={dataFields}
          />
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_IsMandatory}_${fields.internalId}`}
            name={TextFieldResource.FieldName_IsMandatory}
            label={`${t(
              "contentTranslator:content.manditory",
              TextFieldResource.Mandatory
            )}`}
            value={fields?.is_mandatory}
            cssClass="col-6"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_detect_faces}_${fields.internalId}`}
            name={TextFieldResource.FieldName_detect_faces}
            label={`${t(
              "contentTranslator:content.FieldName_detect_faces",
              TextFieldResource.FieldName_detect_faces
            )}`}
            value={
              fields?.field_options?.detect_faces === "true" ? true : false
            }
            cssClass="col-6"
          />
        </div>
      </>
    );
  },

  getFileValidateAnswerForSpecificFormat(data) {
    let {
      fields,
      onChangeHandler,
      onBlurHandler,
      onIncreaseHandler,
      onDecreaseHandler,
      t,
    } = data;

    return (
      <Accordion
        type={`${t(
          `contentTranslator:content.ValidateAnswerForSpecificFormat`,
          TextFieldResource.ValidateAnswerForSpecificFormat
        )}`}
        cssClass="mp5__configTextField__specific-format"
        isChildAccordion
        accordionId={`validateAnswerForSpecificFormat-${fields.internalId}`}
      >
        <>
          <label>
            {t(
              "contentTranslator:content.No_Files_Label",
              TextFieldResource.No_Files_Label
            )}
          </label>
          <div className="row mb-3 align-items-center">
            <div className="col-12">
              <div className="row align-items-center">
                {
                  <TextInput
                    label={`${t(
                      "contentTranslator:content.min",
                      TextFieldResource.Min
                    )}`}
                    value={fields?.field_options?.min}
                    type="number"
                    id={`${TextFieldResource.Min_File}_${fields.internalId}`}
                    name={TextFieldResource.Min_File}
                    onBlurHandler={onBlurHandler}
                    onChangeHandler={onChangeHandler}
                    showIncreaseDecreaseIndicator={true}
                    onIncreaseHandler={onIncreaseHandler}
                    onDecreaseHandler={onDecreaseHandler}
                    cssClass="col-6 col-lg-3"
                  />
                }
                <TextInput
                  label={`${t(
                    "contentTranslator:content.max",
                    TextFieldResource.Max
                  )}`}
                  value={fields?.field_options?.max}
                  type="number"
                  id={`${TextFieldResource.Max_File}_${fields.internalId}`}
                  name={TextFieldResource.Max_File}
                  onBlurHandler={onBlurHandler}
                  onChangeHandler={onChangeHandler}
                  showIncreaseDecreaseIndicator={true}
                  onIncreaseHandler={onIncreaseHandler}
                  onDecreaseHandler={onDecreaseHandler}
                  cssClass="col-6 col-lg-3"
                />

                <CheckBox
                  onChangeHandler={onChangeHandler}
                  id={`${TextFieldResource.FieldName_must_be_consumed}_${fields.internalId}`}
                  name={TextFieldResource.FieldName_must_be_consumed}
                  label={`${t(
                    "contentTranslator:content.FieldName_must_be_consumed",
                    TextFieldResource.FieldName_must_be_consumed
                  )}`}
                  value={
                    fields?.field_options?.must_be_consumed === "true"
                      ? true
                      : false
                  }
                  cssClass="col-6"
                />
              </div>
            </div>
          </div>
        </>

        <div className="row mb-3 align-items-center">
          <TextArea
            onBlurHandler={onBlurHandler}
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.file_extensions}_${fields.internalId}`}
            name={TextFieldResource.file_extensions}
            label={`${t(
              "contentTranslator:content.Allowed_File_types",
              TextFieldResource.Allowed_File_types
            )}`}
            value={fields?.field_options?.file_extensions}
            placeholder={TextFieldResource.file_extensions}
            cssClass="col-12"
          />
        </div>
      </Accordion>
    );
  },
};

export default FileInputService;
