import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  updateFormFieldsByElementId,
  updateFormModificationStatus,
} from "../../../redux/features/formBuilder/formBuilderSlice";
import { Accordion } from "../../common";
import FileOutputService from "./FileOutput.Service";
import CommonHtmlTemplate from "../CommonHtmlTemplate.Service";
import FBService from "../../formBuilder/FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const FileOutput = (props) => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const { element, nodesData } = props;
  const [fields, setFields] = useState(element);
  const [isShowFileName, setIsShowFileName] = useState(false);
  const dispatch = useDispatch();

  const onChangeHandler = (data) => {
    let updatedField = FileOutputService.updateImageOutputOnChangeHandler(
      data,
      fields
    );

    saveElementForm(updatedField);
  };

  const fileUploadHandler = (event) => {
    FileOutputService.fileUploadHandler(event, fields?.slug, updateFileData);
  };

  const updateFileData = (data) => {
    let { name, id, url } = data;
    let fieldOptions = { ...fields.field_options };
    let updatedData = {
      ...fields,
      field_options: {
        ...fieldOptions,
        uploaded_file_name: name,
        file_id: id,
        file_url: url,
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
        file_id: "",
        file_url: "",
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
      fileUploadHandler,
      clearUploadedFile,
      isShowFileName,
      nodesData,
    };

    return (
      <Accordion
        type={FBService.getTranslation(
          "Label_File_Output",
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
        {FileOutputService.getImageOutputBasicDetails(data)}
        {CommonHtmlTemplate.getAdvancedFunctionsLayoutWithoutInternalName(data)}
      </Accordion>
    );
  };

  return (
    <div className="MP5__configTextField__wrapper">{renderAccordion()}</div>
  );
};

export default FileOutput;
