import TextFieldResource from "../../../resource/TextField.Resource";
import { TextInput, CheckBox, TextArea, SelectDropDown } from "../../common";
import { ConformationCodeTypes } from "../../../constants/TextFiledConstants";
import FormEditorService from "../FormEditor.service";

const ConfirmCodeService = {
  updateConfirmCodeOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };
    let { name, value } = data;
    let fields_is = { ...fields };

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_Instructions:
      case TextFieldResource.FieldName_DetailedInstruction:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
      case TextFieldResource.confirmation_Value_input:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [name]: value },
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
      case TextFieldResource.FieldName_Description:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, description: value },
        };
        break;
      case TextFieldResource.FieldName_KeepOnPreviousPage:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
          },
        };
        break;
      case TextFieldResource.Regexp:
      case TextFieldResource.FieldName_IsMandatory:
        updatedData = { ...fields, [name]: value };
        break;
      case TextFieldResource.FieldName_InternalName_Slug:
        updatedData = {
          ...fields,
          slug: FormEditorService.checkInternalNameValidation(value),
        };
        break;
      case TextFieldResource.confirmation_type:
        delete fields_is?.regexp;
        delete fieldOptions?.confirmation_value;

        if (value === "fixed") {
          updatedData = {
            ...fields_is,
            field_options: {
              ...fieldOptions,
              [name]: value,
              confirmation_value: "",
            },
          };
        } else if (value === "regexp") {
          updatedData = {
            ...fields_is,
            regexp: "",
            field_options: { ...fieldOptions, [name]: value },
          };
        } else {
          updatedData = {
            ...fields_is,
            field_options: { ...fieldOptions, [name]: value },
          };
        }
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  confirmationCodeInputValues(fields, confirmation_type) {
    let confirmationCodeObj = {
      labelName: "",
      transLang: "",
      inputName: "",
      value: "",
    };
    switch (confirmation_type) {
      case "regexp":
        confirmationCodeObj.labelName = TextFieldResource.Regexp_Label;
        confirmationCodeObj.transLang = "regexpTran";
        confirmationCodeObj.inputName = TextFieldResource.Regexp;
        confirmationCodeObj.value = fields?.regexp;
        return confirmationCodeObj;
      case "fixed":
        confirmationCodeObj.labelName = TextFieldResource.confirmation_Value;
        confirmationCodeObj.transLang = "confirmation_Value";
        confirmationCodeObj.inputName =
          TextFieldResource.confirmation_Value_input;
        confirmationCodeObj.value = fields?.field_options?.confirmation_value;
        return confirmationCodeObj;
      default:
        return confirmationCodeObj;
    }
  },

  getConfirmCodeBasicDetails(data) {
    let { fields, onChangeHandler, t, dataFields } = data;
    const confirmationTypeValue = fields?.field_options?.confirmation_type;
    const inputNameValues = ConfirmCodeService.confirmationCodeInputValues(
      fields,
      confirmationTypeValue
    );

    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
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
        </div>

        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={ConformationCodeTypes}
            name={TextFieldResource.confirmation_type}
            label={`${t(
              "contentTranslator:content.ConfirmationCodeTypes",
              TextFieldResource.ConfirmationCodeTypes
            )}`}
            value={confirmationTypeValue}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />

          {ConformationCodeTypes[0].value !== inputNameValues.inputName && (
            <TextInput
              label={`${t(
                `contentTranslator:content.${inputNameValues.transLang}`,
                inputNameValues.labelName
              )}`}
              value={inputNameValues.value}
              type="text"
              id={`${inputNameValues.inputName}_${fields.internalId}`}
              name={inputNameValues.inputName}
              onChangeHandler={onChangeHandler}
              cssClass="col-6"
            />
          )}
        </div>
      </>
    );
  },
};

export default ConfirmCodeService;
