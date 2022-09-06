import TextFieldResource from "../../../resource/TextField.Resource";
import { CheckBox, TextArea, TextInput } from "../../common";

const OutputVideoService = {
  updateVideoOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
      case TextFieldResource.FiledName_Video:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [name]: value },
        };
        break;
      case TextFieldResource.FieldName_KeepOnPreviousPage:
      case TextFieldResource.FieldName_must_be_consumed:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
          },
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

  getVideoBasicDetails(data) {
    let { fields, onChangeHandler, t, dataFields } = data;

    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Label}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Label}
            value={fields?.field_options?.label}
            isDisableEnterKey={true}
            cssClass="col-12"
            dataFields={dataFields}
          />
        </div>

        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.VideoLink",
              TextFieldResource.VideoLink
            )}`}
            value={fields?.field_options?.video_link}
            type="text"
            id={`${TextFieldResource.FiledName_Video}_${fields.internalId}`}
            name={TextFieldResource.FiledName_Video}
            onChangeHandler={onChangeHandler}
            cssClass="col-12"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_must_be_consumed}_${fields.internalId}`}
            name={TextFieldResource.FieldName_must_be_consumed}
            label={`${t(
              "contentTranslator:content.FieldName_must_be_consumed_Video",
              TextFieldResource.FieldName_must_be_consumed_Video
            )}`}
            value={
              fields?.field_options?.must_be_consumed === "true" ? true : false
            }
            cssClass="col-12"
          />
        </div>
      </>
    );
  },
};

export default OutputVideoService;
