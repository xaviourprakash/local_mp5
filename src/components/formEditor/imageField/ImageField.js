import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import FormEditorService from "../FormEditor.service";
import ImageFieldService from "./ImageField.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const ImageField = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, dataFields, nodesData } = props;
  const [fields, setFields] = useState(element);
  const [newIndex, setNewIndex] = useState();
  const dispatch = useDispatch();

  const onChangeOutlineMethodHandler = ({ name, value }) => {
    let type = "outline_fill_methods";
    let updatedField = ImageFieldService.updateFillAndOutlineMethodHandler(
      fields,
      name,
      value,
      type
    );

    saveElementForm(updatedField);
  };

  const setIsOpenAccordianHandler = (index, value) => {
    let updatedField = ImageFieldService.setIsOpenAccordian(
      index,
      value,
      fields
    );

    saveElementForm(updatedField);
  };

  const onChangeFillMethodHandler = ({ name, value }) => {
    let type = "fill_methods";
    let updatedField = ImageFieldService.updateFillAndOutlineMethodHandler(
      fields,
      name,
      value,
      type
    );

    saveElementForm(updatedField);
  };

  const onBlurHandler = (data) => {
    let updatedField = ImageFieldService.updateImageOnBlurHandler(data, fields);

    if (JSON.stringify(updatedField) !== JSON.stringify(fields)) {
      saveElementForm(updatedField);
    }
  };

  const updateIncreaseDecreaseValue = (name, value, type) => {
    switch (type) {
      case "changeHandler":
        onChangeHandler({ name, value });
        break;
      case "fillMethod":
        onChangeFillMethodHandler({ name, value });
        break;
      case "outlineFillMethod":
        onChangeOutlineMethodHandler({ name, value });
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
    let updatedField = ImageFieldService.updateImageOnChangeHandler(
      details,
      fields
    );

    saveElementForm(updatedField);
  };

  const addNewAnnotation = (event) => {
    event.preventDefault();
    let annotationSteps = fields?.field_options?.annotation_steps;
    setNewIndex(annotationSteps.length);
    let isAdd = true;
    let updatedField = ImageFieldService.updateAddRemoveAnnotation(
      fields,
      isAdd
    );

    saveElementForm(updatedField);
  };

  const removeAnnotation = (event, index) => {
    event.preventDefault();
    let isAdd = false;
    let updatedField = ImageFieldService.updateAddRemoveAnnotation(
      fields,
      isAdd,
      index
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
      onChangeHandler,
      onBlurHandler,
      onIncreaseHandler,
      onDecreaseHandler,
      t,
      removeAnnotation,
      addNewAnnotation,
      onChangeFillMethodHandler,
      onChangeOutlineMethodHandler,
      setIsOpenAccordianHandler,
      dataFields,
      nodesData,
    };

    return (
      <Accordion
        type={FBService.getTranslation(
          "Label_Camera_Input",
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
        {ImageFieldService.getElementSetting(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayout(data)}
        {ImageFieldService.getAnnotationSteps(data, newIndex)}
      </Accordion>
    );
  };
  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default ImageField;
