import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import FormEditorService from "../FormEditor.service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import AudioRecorderService from "../audioRecorder/AudioRecorder.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const AudioRecorder = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, dataFields, nodesData } = props;
  const [fields, setFields] = useState(element);
  const dispatch = useDispatch();

  const updateIncreaseDecreaseValue = (name, value, type) => {
    switch (type) {
      case "changeHandler":
        onChangeHandler({ name, value });
        break;
      default:
        break;
    }
  };

  const onIncreaseHandler = (name, value, type) => {
    let updatedValue = FormEditorService.onIncreaseHandler(value, name);

    updateIncreaseDecreaseValue(name, updatedValue, type);
  };

  const onDecreaseHandler = (name, value, type) => {
    let updatedValue = FormEditorService.onDecreaseHandler(value, name);

    updateIncreaseDecreaseValue(name, updatedValue, type);
  };

  const onChangeHandler = (data) => {
    let { fieldName, currentIndex } = FormEditorService.getFieldDetails(
      data.name
    );
    let details = { ...data, name: fieldName, currentIndex };
    let updatedField = AudioRecorderService.updateVideoOnChangeHandler(
      details,
      fields
    );

    saveElementForm(updatedField);
  };

  const onBlurHandler = (data) => {
    let updatedField = AudioRecorderService.updateTextboxOnBlurHandler(
      data,
      fields
    );
    if (JSON.stringify(updatedField) !== JSON.stringify(fields)) {
      saveElementForm(updatedField);
    }
  };

  const saveElementForm = (data) => {
    setFields(data);
    dispatch(updateFormFieldsByElementId(data));
    dispatch(updateFormModificationStatus(false));
  };

  const renderAccordion = () => {
    let data = {
      fields,
      onBlurHandler,
      onChangeHandler,
      onIncreaseHandler,
      onDecreaseHandler,
      t,
      dataFields,
      nodesData,
    };

    return (
      <Accordion
        type={FBService.getTranslation(
          "Label_Audio_Recorder_Input",
          FormBuilderResource
        )}
        label={fields?.field_options?.label}
        removeElement={props.removeElement}
        duplicateElement={props.duplicateElement}
        elementId={element.internalId}
        showEllipsis
        showDraggableArea
        accordionId={`new-form-element-${fields.internalId}`}
      >
        {CommonHtmlTemplate.getBasicDetails(data)}
        {CommonHtmlTemplate.getInstructionsForClickworker(data)}
        {AudioRecorderService.getElementSetting(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayout(data)}
      </Accordion>
    );
  };
  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default AudioRecorder;
