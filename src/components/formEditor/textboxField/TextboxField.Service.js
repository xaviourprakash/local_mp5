import TextFieldResource from "../../../resource/TextField.Resource";
import {
  TextArea,
  CheckBox,
  TextInput,
  SelectDropDown,
  Accordion,
} from "../../common";
import {
  RegexOptions,
  LimitationUnits,
} from "../../../constants/TextFiledConstants";
import FormEditorService from "../FormEditor.service";

const TextboxFieldService = {
  updateTextboxOnChangeHandler(
    data,
    fields,
    setRegexType,
    setIsMultilineChecked
  ) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_Instructions:
      case TextFieldResource.FieldName_DetailedInstruction:
      case TextFieldResource.MinMaxLengthUnits:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.FieldName_Units:
      case TextFieldResource.NumberOfColumns:
      case TextFieldResource.MinLength:
      case TextFieldResource.MaxLength:
      case TextFieldResource.FieldName_Html_Editor:
      case TextFieldResource.FieldName_Rich_Text:
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

      case TextFieldResource.FieldName_KeepOnPreviousPage:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
          },
        };
        break;
      case TextFieldResource.FieldName_MultiLine:
        updatedData = FormEditorService.setMultilineOption(fields, value);
        setIsMultilineChecked && setIsMultilineChecked(value);
        setRegexType && setRegexType(RegexOptions[0].value);
        break;
      case TextFieldResource.FieldName_IsMandatory:
        updatedData = { ...fields, [name]: value };
        break;
      case TextFieldResource.Regexp:
        let selectedRegexpType = FormEditorService.findTypeofRegex(value);
        updatedData = { ...fields, [name]: value };
        setRegexType && setRegexType(selectedRegexpType);
        break;
      case TextFieldResource.FieldName_InternalName_Slug:
        updatedData = {
          ...fields,
          slug: FormEditorService.checkInternalNameValidation(value),
        };
        break;
      case TextFieldResource.RegexType:
        let updated_fields = {
          ...fields,
          field_options: {
            ...fieldOptions,
            minlength: "",
            maxlength: "",
            min_max_length_units: LimitationUnits[0].value,
            units: "",
          },
        };
        updatedData = FormEditorService.getRegexOptionData(
          updated_fields,
          value,
          name
        );
        setRegexType && setRegexType(value);
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  updateTextboxOnBlurHandler(data, fields) {
    let updatedData, maxValue;
    let fieldOptions = { ...fields.field_options };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.MinLength:
        maxValue =
          parseInt(value) > parseInt(fieldOptions.maxlength) &&
          !!fieldOptions.maxlength
            ? value
            : fieldOptions.maxlength;
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            minlength: value,
            maxlength: maxValue,
          },
        };
        break;
      case TextFieldResource.MaxLength:
        maxValue =
          parseInt(fieldOptions.minlength) > parseInt(value)
            ? fieldOptions.minlength
            : value;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, maxlength: maxValue },
        };
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  getTextboxBasicDetails(data) {
    let {
      fields,
      onChangeHandler,
      onBlurHandler,
      t,
      isMultilineChecked,
      dataFields,
    } = data;

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
            id={`${TextFieldResource.FieldName_MultiLine}_${fields.internalId}`}
            name={TextFieldResource.FieldName_MultiLine}
            label={`${t(
              "contentTranslator:content.MultiLine",
              TextFieldResource.MultiLine
            )}`}
            value={isMultilineChecked}
            cssClass="col-6"
          />
        </div>
      </>
    );
  },

  getTextboxValidateAnswerForSpecificFormat(data) {
    let {
      fields,
      regexType,
      onChangeHandler,
      onBlurHandler,
      onIncreaseHandler,
      onDecreaseHandler,
      t,
      isMultilineChecked,
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
        <div
          className={`${
            !isMultilineChecked && regexType !== RegexOptions[3].value
              ? "row mb-3 align-items-center"
              : ""
          }`}
        >
          {!isMultilineChecked && (
            <SelectDropDown
              options={RegexOptions}
              name={TextFieldResource.RegexType}
              label={`${t(
                "contentTranslator:content.inputFieldType",
                TextFieldResource.InputFieldType
              )}`}
              value={regexType}
              onChangeHandler={onChangeHandler}
              cssClass="col-6"
            />
          )}

          {!isMultilineChecked && regexType !== RegexOptions[3].value && (
            <TextInput
              label={`${t(
                "contentTranslator:content.units",
                TextFieldResource.Units
              )}`}
              value={fields?.field_options?.units}
              type="text"
              id={`${TextFieldResource.FieldName_Units}_${fields.internalId}`}
              name={TextFieldResource.FieldName_Units}
              onBlurHandler={onBlurHandler}
              onChangeHandler={onChangeHandler}
              cssClass="col-6"
            />
          )}
        </div>

        {regexType === RegexOptions[0].value && (
          <>
            {" "}
            <label>
              {t(
                "contentTranslator:content.limitation",
                TextFieldResource.Limitation_Label
              )}
            </label>
            <div className="row mb-3 align-items-center">
              <div className="col-12 col-lg-6">
                <div className="row align-items-center">
                  {
                    <TextInput
                      label={`${t(
                        "contentTranslator:content.min",
                        TextFieldResource.Min
                      )}`}
                      value={fields?.field_options?.minlength}
                      type="number"
                      id={`${TextFieldResource.MinLength}_${fields.internalId}`}
                      name={TextFieldResource.MinLength}
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
                    value={fields?.field_options?.maxlength}
                    type="number"
                    id={`${TextFieldResource.MaxLength}_${fields.internalId}`}
                    name={TextFieldResource.MaxLength}
                    onBlurHandler={onBlurHandler}
                    onChangeHandler={onChangeHandler}
                    showIncreaseDecreaseIndicator={true}
                    onIncreaseHandler={onIncreaseHandler}
                    onDecreaseHandler={onDecreaseHandler}
                    cssClass="col-6 col-lg-3 pe-lg-2"
                  />

                  <SelectDropDown
                    options={LimitationUnits}
                    name={TextFieldResource.MinMaxLengthUnits}
                    label={`${t(
                      "contentTranslator:content.limitationUnits",
                      TextFieldResource.LimitationUnits
                    )}`}
                    value={fields?.field_options.min_max_length_units}
                    onChangeHandler={onChangeHandler}
                    cssClass="col-12 col-lg-6"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {!isMultilineChecked && (
          <div className="row mb-3 align-items-center">
            <TextInput
              label={`${t(
                "contentTranslator:content.regexpTran",
                TextFieldResource.Regexp_Label
              )}`}
              value={fields?.regexp}
              type="text"
              id={`${TextFieldResource.Regexp}_${fields.internalId}`}
              name={TextFieldResource.Regexp}
              onBlurHandler={onBlurHandler}
              onChangeHandler={onChangeHandler}
              cssClass="col-12"
            />
          </div>
        )}

        {isMultilineChecked && (
          <div className="row mb-3 align-items-center">
            <CheckBox
              onChangeHandler={onChangeHandler}
              id={`${TextFieldResource.FieldName_Rich_Text}_${fields.internalId}`}
              name={TextFieldResource.FieldName_Rich_Text}
              label={`${t(
                "contentTranslator:content.RichText",
                TextFieldResource.RichText
              )}`}
              value={fields?.field_options?.rich_text}
              cssClass="col-6"
            />

            <CheckBox
              onChangeHandler={onChangeHandler}
              id={`${TextFieldResource.FieldName_Html_Editor}_${fields.internalId}`}
              name={TextFieldResource.FieldName_Html_Editor}
              label={`${t(
                "contentTranslator:content.HtmlEditor",
                TextFieldResource.HtmlEditor
              )}`}
              value={fields?.field_options?.html_editor}
              cssClass="col-6"
            />
          </div>
        )}
      </Accordion>
    );
  },
};

export default TextboxFieldService;
