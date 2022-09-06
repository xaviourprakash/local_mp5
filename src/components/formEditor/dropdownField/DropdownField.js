import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import FormEditorService from "../FormEditor.service";
import DropdownFieldService from "./DropdownField.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const DropdownField = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, dataFields, nodesData } = props;
  const [fields, setFields] = useState(element);
  const dispatch = useDispatch();

  const onChangeHandler = (data) => {
    let updatedField = DropdownFieldService.updateDropdownOnChangeHandler(
      data,
      fields
    );

    saveElementForm(updatedField);
  };

  const addNewMultiChoice = (event) => {
    event.preventDefault();
    let isAdd = true;
    let updatedField = FormEditorService.updateAddRemoveChoiceHandler(
      fields,
      isAdd
    );

    saveElementForm(updatedField);
  };

  const removeMultiChoice = (event, name) => {
    event.preventDefault();
    let isAdd = false;
    let currentIndex = FormEditorService.getCurrentChoiceIndex(name);
    let updatedField = FormEditorService.updateAddRemoveChoiceHandler(
      fields,
      isAdd,
      currentIndex
    );

    saveElementForm(updatedField);
  };

  const onRadioChange = (event) => {
    let currentIndex = FormEditorService.getCurrentChoiceIndex(event.target.id);
    let isChecked =
      fields.field_options.options[parseInt(currentIndex)].checked;

    let type = "checked";
    let updatedField = FormEditorService.resetOptions(fields);
    if (!isChecked) {
      updatedField = FormEditorService.updateMultiChoiceHandler(
        updatedField,
        event.target.id,
        event.target.checked,
        type
      );
    }

    saveElementForm(updatedField);
  };

  const onChangeOptionHandler = ({ name, value }) => {
    let type = "label";
    let updatedField = FormEditorService.updateMultiChoiceHandler(
      fields,
      name,
      value,
      type
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
      t,
      addNewMultiChoice,
      removeMultiChoice,
      onRadioChange,
      onChangeOptionHandler,
      dataFields,
      nodesData,
    };

    return (
      <Accordion
        type={FBService.getTranslation(
          "Label_Single_Choice_Dropdown_Input",
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
        {DropdownFieldService.getDropdownBasicDetails(data)}
        {CommonHtmlTemplate.getInstructionsForClickworker(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayout(data)}
      </Accordion>
    );
  };

  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default DropdownField;
