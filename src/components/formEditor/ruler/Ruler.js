import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import RulerService from "./Ruler.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const Ruler = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element } = props;
  const [fields, setFields] = useState(element);
  const dispatch = useDispatch();

  const onChangeHandler = (data) => {
    let updatedField = RulerService.updateRulerOnChangeHandler(data, fields);

    saveElementForm(updatedField);
  };

  const saveElementForm = (data) => {
    setFields(data);
    dispatch(updateFormFieldsByElementId(data));
    dispatch(updateFormModificationStatus(false));
  };

  const renderAccordion = () => {
    let data = { fields, onChangeHandler, t };

    return (
      <Accordion
        type={FBService.getTranslation(
          "Label_Ruler_Output",
          FormBuilderResource
        )}
        label={FBService.getTranslation("Label_Ruler", FormBuilderResource)}
        removeElement={props.removeElement}
        duplicateElement={props.duplicateElement}
        elementId={element.internalId}
        showEllipsis
        showDraggableArea
        isRuler
        accordionId={`new-form-element-${fields.internalId}`}
      >
        {RulerService.getRulerDetails(data)}
      </Accordion>
    );
  };

  return (
    <div className="MP5__configTextField__wrapper MP5__ConfigRuler_wrapper">
      {renderAccordion()}
    </div>
  );
};

export default Ruler;
