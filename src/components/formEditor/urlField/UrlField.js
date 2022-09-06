import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import UrlFieldService from "./UrlField.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const UrlField = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, dataFields, nodesData } = props;
  const [fields, setFields] = useState(element);
  const dispatch = useDispatch();

  const onChangeHandler = (data) => {
    let updatedField = UrlFieldService.updateUrlOnChangeHandler(data, fields);

    saveElementForm(updatedField);
  };

  const saveElementForm = (data) => {
    setFields(data);
    dispatch(updateFormFieldsByElementId(data));
    dispatch(updateFormModificationStatus(false));
  };

  const renderAccordion = () => {
    let data = { fields, onChangeHandler, t, dataFields, nodesData };

    return (
      <Accordion
        type={FBService.getTranslation("Label_Url_Input", FormBuilderResource)}
        label={fields?.field_options?.label}
        removeElement={props.removeElement}
        duplicateElement={props.duplicateElement}
        elementId={element.internalId}
        showEllipsis
        showDraggableArea
        accordionId={`new-form-element-${fields.internalId}`}
      >
        {UrlFieldService.getUrlBasicDetails(data)}
        {CommonHtmlTemplate.getInstructionsForClickworker(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayout(data)}
      </Accordion>
    );
  };
  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default UrlField;
