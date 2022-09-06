import TextFieldResource from "../../../resource/TextField.Resource";
import { TextArea, CheckBox } from "../../common";
import FormEditorService from "../FormEditor.service";

const UrlFieldService = {
  updateUrlOnChangeHandler(data, fields) {
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
      case TextFieldResource.FieldName_url_clickworker_id_include_disable:
      case TextFieldResource.FieldName_KeepOnPreviousPage:
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

  getUrlBasicDetails(data) {
    let { fields, onChangeHandler, t, dataFields } = data;

    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Label}_${fields.iinternalIdd}`}
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
            id={`${TextFieldResource.FieldName_url_clickworker_id_include_disable}_${fields.internalId}`}
            name={
              TextFieldResource.FieldName_url_clickworker_id_include_disable
            }
            label={`${t(
              "contentTranslator:content.url_clickworker_id_include_disable",
              TextFieldResource.url_clickworker_id_include_disable
            )}`}
            value={
              fields?.field_options?.url_clickworker_id_include_disable ===
              "true"
                ? true
                : false
            }
            cssClass="col-6"
          />
        </div>
      </>
    );
  },
};

export default UrlFieldService;
