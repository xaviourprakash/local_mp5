import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import ParagraphTextService from "./ParagraphText.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const ParagraphText = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, dataFields, nodesData } = props;
  const [fields, setFields] = useState(element);
  const dispatch = useDispatch();

  const onChangeHandler = (data) => {
    let updatedField = ParagraphTextService.updateParagraphOnChangeHandler(
      data,
      fields
    );

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
        type={FBService.getTranslation(
          "Label_Paragraph_Output",
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
        {ParagraphTextService.getParagraphBasicDetails(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayoutWithoutInternalName(data)}
      </Accordion>
    );
  };

  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default ParagraphText;
