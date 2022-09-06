import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import FormEditorService from "../FormEditor.service";
import { RegexOptions } from "../../../constants/TextFiledConstants";
import TextboxFieldService from "./TextboxField.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const TextboxField = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, dataFields, nodesData } = props;
  const [fields, setFields] = useState(element);
  const [regexType, setRegexType] = useState(RegexOptions[0].value);
  const [isMultilineChecked, setIsMultilineChecked] = useState(false);
  const dispatch = useDispatch();
  const onBlurHandler = (data) => {
    let updatedField = TextboxFieldService.updateTextboxOnBlurHandler(
      data,
      fields
    );

    if (JSON.stringify(updatedField) !== JSON.stringify(fields)) {
      saveElementForm(updatedField);
    }
  };

  const onIncreaseHandler = (name, value) => {
    let fieldOptions = { ...fields.field_options };
    let updatedValue = FormEditorService.onIncreaseHandler(value, name);
    let updatedField = {
      ...fields,
      field_options: { ...fieldOptions, [name]: updatedValue },
    };

    saveElementForm(updatedField);
  };

  const onDecreaseHandler = (name, value) => {
    let fieldOptions = { ...fields.field_options };
    let updatedValue = FormEditorService.onDecreaseHandler(value, name);
    let updatedField = {
      ...fields,
      field_options: { ...fieldOptions, [name]: updatedValue },
    };

    saveElementForm(updatedField);
  };

  const onChangeHandler = (data) => {
    let updatedField = TextboxFieldService.updateTextboxOnChangeHandler(
      data,
      fields,
      setRegexType,
      setIsMultilineChecked
    );

    saveElementForm(updatedField);
  };

  const saveElementForm = (data) => {
    setFields(data);
    dispatch(updateFormFieldsByElementId(data));
    dispatch(updateFormModificationStatus(false));
  };

  const renderAccordion = () => {
    let data = {
      fields,
      regexType,
      onChangeHandler,
      onBlurHandler,
      onIncreaseHandler,
      onDecreaseHandler,
      t,
      isMultilineChecked,
      dataFields,
      nodesData,
    };

    return (
      <Accordion
        type={FBService.getTranslation("Label_Text_Input", FormBuilderResource)}
        label={fields?.field_options?.label}
        removeElement={props.removeElement}
        duplicateElement={props.duplicateElement}
        elementId={element.internalId}
        showEllipsis
        showDraggableArea
        accordionId={`new-form-element-${fields.internalId}`}
      >
        {TextboxFieldService.getTextboxBasicDetails(data)}
        {CommonHtmlTemplate.getInstructionsForClickworker(data)}
        {TextboxFieldService.getTextboxValidateAnswerForSpecificFormat(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayout(data)}
      </Accordion>
    );
  };

  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default TextboxField;
