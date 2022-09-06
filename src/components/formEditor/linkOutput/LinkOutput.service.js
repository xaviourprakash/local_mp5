import TextFieldResource from "../../../resource/TextField.Resource";
import { CheckBox, TextArea } from "../../common";

const LinkOutputService = {
  updateOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Link_Name:
      case TextFieldResource.FieldName_Link:
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
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

  getLinkBasicDetails(data) {
    let { fields, onChangeHandler, t } = data;
    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Link_Name}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Link_Name}
            label={`${t(
              "contentTranslator:content.Link_Text",
              TextFieldResource.Link_Text
            )}`}
            value={fields?.field_options?.link_text}
            placeholder={TextFieldResource.Link_Text}
            cssClass="col-12"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Link}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Link}
            label={`${t(
              "contentTranslator:content.Link",
              TextFieldResource.Link
            )}`}
            value={fields?.field_options?.link}
            placeholder={TextFieldResource.Link}
            cssClass="col-12"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_must_be_consumed}_${fields.internalId}`}
            name={TextFieldResource.FieldName_must_be_consumed}
            label={`${t(
              "contentTranslator:content.FieldName_must_be_consumed",
              TextFieldResource.FieldName_must_be_consumed
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

export default LinkOutputService;
