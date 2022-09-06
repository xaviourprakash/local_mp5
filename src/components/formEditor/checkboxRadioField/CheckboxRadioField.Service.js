import TextFieldResource from "../../../resource/TextField.Resource";
import { CheckBox, TextArea } from "../../common";
import FormEditorService from "../FormEditor.service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";

const CheckboxRadioFieldService = {
  updateCheckboxRadioOnChangeHandler(data, fields, setIsAllowMultipleAnswers) {
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
      case TextFieldResource.FieldName_KeepOnPreviousPage:
      case TextFieldResource.FieldName_Additional_Open_Answer:
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
      case TextFieldResource.FieldName_Allow_Multiple_Answers:
        updatedData = FormEditorService.setAllowMultipleAnswers(fields, value);
        setIsAllowMultipleAnswers && setIsAllowMultipleAnswers(value);
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

  getCheckboxRadioBasicDetails(data) {
    let {
      fields,
      onChangeHandler,
      t,
      isAllowMultipleAnswers,
      addNewMultiChoice,
      dataFields,
    } = data;

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

        {CommonHtmlTemplate.getAnswersHtml(data, addNewMultiChoice, t)}

        <div className="row border-y py-3 mb-3 align-items-center">
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
            id={`${TextFieldResource.FieldName_Additional_Open_Answer}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Additional_Open_Answer}
            label={`${t(
              "contentTranslator:content.Additional_Open_Answer",
              TextFieldResource.Additional_Open_Answer
            )}`}
            value={
              fields?.field_options?.include_other_option === "true"
                ? true
                : false
            }
            cssClass="col-6"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Allow_Multiple_Answers}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Allow_Multiple_Answers}
            label={`${t(
              "contentTranslator:content.Allow_Multiple_Answers",
              TextFieldResource.Allow_Multiple_Answers
            )}`}
            value={isAllowMultipleAnswers}
            cssClass="col-6"
          />
        </div>
      </>
    );
  },
};

export default CheckboxRadioFieldService;
