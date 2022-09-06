import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import FormEditorService from "../FormEditor.service";
import ImageOutputService from "./ImageOutput.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const ImageOutput = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, nodesData } = props;
  const [fields, setFields] = useState(element);
  const [isShowFileName, setIsShowFileName] = useState(false);
  const dispatch = useDispatch();

  const onIncreaseHandler = (name, value, type) => {
    let updatedValue = FormEditorService.onIncreaseHandler(value, name);

    onChangeHandler({ name, value: updatedValue });
  };

  const onDecreaseHandler = (name, value, type) => {
    let updatedValue = FormEditorService.onDecreaseHandler(value, name);

    onChangeHandler({ name, value: updatedValue });
  };

  const onChangeHandler = (data) => {
    let updatedField = ImageOutputService.updateImageOutputOnChangeHandler(
      data,
      fields
    );

    saveElementForm(updatedField);
  };

  const fileUploadHandler = (event) => {
    ImageOutputService.fileUploadHandler(event, fields?.slug, updateFileData);
  };

  const updateFileData = (data) => {
    let { name, id, url } = data;
    let fieldOptions = { ...fields.field_options };
    let updatedData = {
      ...fields,
      field_options: {
        ...fieldOptions,
        uploaded_file_name: name,
        image_id: id,
        image_url: url,
      },
    };
    setIsShowFileName(true);

    saveElementForm(updatedData);
  };

  const clearUploadedFile = () => {
    let fieldOptions = { ...fields.field_options };
    let updatedData = {
      ...fields,
      field_options: {
        ...fieldOptions,
        uploaded_file_name: "",
        image_id: "",
        image_url: "",
      },
    };
    setIsShowFileName(false);

    saveElementForm(updatedData);
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
      onIncreaseHandler,
      onDecreaseHandler,
      fileUploadHandler,
      clearUploadedFile,
      isShowFileName,
      nodesData,
    };

    return (
      <Accordion
        type={FBService.getTranslation(
          "Label_Image_Viewer_Output",
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
        {ImageOutputService.getImageOutputBasicDetails(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayoutWithoutInternalName(data)}
      </Accordion>
    );
  };

  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default ImageOutput;
