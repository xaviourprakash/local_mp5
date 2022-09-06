import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import FormEditorService from "../FormEditor.service";
import FileInputService from "./FileInput.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const FileInput = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, dataFields, nodesData } = props;
  const [fields, setFields] = useState(element);
  const dispatch = useDispatch();

  const onBlurHandler = (data) => {
    let updatedField = FileInputService.updateFileOnBlurHandler(data, fields);

    if (JSON.stringify(updatedField) !== JSON.stringify(fields)) {
      saveElementForm(updatedField);
    }
  };

  const onChangeHandler = (data) => {
    let updatedField = FileInputService.updateFileOnChangeHandler(data, fields);
    saveElementForm(updatedField);
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

  const saveElementForm = (data) => {
    setFields(data);
    dispatch(updateFormFieldsByElementId(data));
    dispatch(updateFormModificationStatus(false));
  };

  const renderAccordion = () => {
    let data = {
      fields,
      onChangeHandler,
      onBlurHandler,
      onIncreaseHandler,
      onDecreaseHandler,
      t,
      dataFields,
      nodesData,
    };

    return (
      <Accordion
        type={FBService.getTranslation("Label_File_Input", FormBuilderResource)}
        label={fields?.field_options?.label}
        removeElement={props.removeElement}
        duplicateElement={props.duplicateElement}
        elementId={element.internalId}
        showEllipsis
        showDraggableArea
        accordionId={`new-form-element-${fields.internalId}`}
      >
        {FileInputService.getFileBasicDetails(data)}
        {CommonHtmlTemplate.getInstructionsForClickworker(data)}
        {FileInputService.getFileValidateAnswerForSpecificFormat(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayout(data)}
      </Accordion>
    );
  };
  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default FileInput;
