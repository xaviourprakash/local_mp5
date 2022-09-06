import React, { useState, useEffect } from "react";
import { AddDataFieldModal } from "./AddDataFieldModal";
import { Modal } from "bootstrap";
import FormEditorService from "../formEditor/FormEditor.service";

export const TextArea = (props) => {
  const {
    id,
    name,
    label,
    value,
    placeholder,
    cssClass,
    onBlurHandler,
    onChangeHandler,
    isDisableEnterKey,
    isShowTextareaGroup,
    removeMultiChoice,
    dataFields,
    isPreview,
    previewData,
  } = props;
  const [modalInstance, setModalInstance] = useState(null);
  const [isDataFieldSelected, setIsDataFieldSelected] = useState(false);
  let isDataFieldsNotEmpty = !!dataFields && !!dataFields.length;
  const [isResetOption, setIsResetOption] = useState(false);

  useEffect(() => {
    if (!!value) {
      autoResize();
      !!dataFields &&
        !!dataFields.length &&
        setIsDataFieldSelected(
          FormEditorService.isValidDataField(value, dataFields)
        );
    }
  }, [value]);

  useEffect(() => {
    let modalId = `#${id}-modal`;
    let dataFieldModal = null;

    if (isResetOption && !!dataFields && !!dataFields.length) {
      dataFieldModal = new Modal(modalId, {
        backdrop: "static",
        keyboard: false,
      });

      dataFieldModal.show();
      setModalInstance(dataFieldModal);
    }
  }, [isResetOption]);

  const onBlur = (event) => {
    onBlurHandler &&
      onBlurHandler({ name: event.target.name, value: event.target.value });
  };

  const onChange = (event) => {
    onChangeHandler && onChangeHandler({ name, value: event.target.value });
  };

  const autoResize = () => {
    let textarea = document.getElementById(id);
    textarea.style.height = "";
    textarea.style.height = textarea.scrollHeight + 2 + "px";
  };

  const onKeyDown = (event) => {
    if (isDisableEnterKey && event.key === "Enter") {
      event.preventDefault();
    }
  };

  const onShowModal = (event) => {
    event.preventDefault();
    setIsResetOption(true);
  };

  const hideModalHandler = (event) => {
    event.preventDefault();
    modalInstance.hide();
    setIsResetOption(false);
  };

  const onSaveDataFieldHandler = (event, value) => {
    event.preventDefault();
    hideModalHandler(event);
    onChangeHandler && onChangeHandler({ name, value });
  };

  const renderTextarea = () => {
    return (
      <textarea
        className={`form-control ${
          isDataFieldSelected ? "text-primary" : "text-secondary"
        }`}
        id={id}
        name={name}
        rows="1"
        value={value}
        placeholder={placeholder || " "}
        onKeyUp={autoResize}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      ></textarea>
    );
  };

  const renderTextareaInput = () => {
    return (
      <div className={!label ? "form-group" : "form-floating"}>
        {renderTextarea()}
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  };

  const renderTextareaGroup = () => {
    return (
      <div className="input-group">
        {renderTextarea()}
        <button
          className="input-group-text bg-transparent"
          onClick={(event) => removeMultiChoice(event, name)}
        >
          <i className="fa-solid fa-trash border-0 fs-5 text-secondary"></i>
        </button>
      </div>
    );
  };

  const renderTextareaDataFieldGroup = () => {
    return (
      <>
        {isResetOption && (
          <AddDataFieldModal
            hideModalHandler={hideModalHandler}
            modalId={`${id}-modal`}
            dataFields={dataFields}
            selectedValue={value}
            onSaveDataFieldHandler={onSaveDataFieldHandler}
            isResetOption={isResetOption}
          />
        )}
        <div
          className={
            !label
              ? "input-group has-data-fields-button"
              : "form-floating has-data-fields-button"
          }
        >
          {renderTextarea()}
          {label && <label htmlFor={id}>{label}</label>}
          <button
            className="btn btn-data-transfer bg-transparent"
            data-toggle="modal"
            data-target=".bd-example-modal-sm"
            onClick={onShowModal}
          >
            <i
              className={`fa-solid fa-database border-0 fs-5 ${
                isDataFieldSelected ? "text-primary" : "text-secondary"
              }`}
            ></i>
          </button>
        </div>
      </>
    );
  };

  const renderTextareaPreview = () => {
    let {
      label,
      description,
      instructions,
      detailed_instruction,
      maxlength,
      minlength,
      html_editor,
    } = previewData?.field_options;
    let { is_mandatory } = previewData;
    let isShowMinMaxIndicator =
      (!!minlength && minlength !== "0") || (!!maxlength && maxlength !== "0")
        ? `(required ${minlength} - ${maxlength} Words)`
        : "";

    return (
      <div className="row mb-3">
        {!!label && (
          <label className="ps-0 mb-1 align-items-center label-preview">
            {label} {is_mandatory && <span className="text-danger">*</span>}
          </label>
        )}
        {html_editor && (
          <div className="col-12 align-items-center fs-6 text-danger">
            HTML Editor is not supported. Use Richtext instead
          </div>
        )}
        {!html_editor && (
          <React.Fragment>
            {!!detailed_instruction && (
              <div className="col-12 align-items-center fs-7">
                {detailed_instruction}
              </div>
            )}
            {!!instructions && (
              <div className="col-12 align-items-center fs-7">
                {instructions}
              </div>
            )}
            <div className="col-12 mb-1 align-items-center position-relative">
              {(previewData?.field_options.hasOwnProperty("minlength") ||
                previewData?.field_options.hasOwnProperty("maxlength")) && (
                <div className="fs-7 words-counter">{`0 words / 0 letters ${isShowMinMaxIndicator}`}</div>
              )}
              <textarea
                type="text"
                defaultValue=""
                className="form-control resize_none"
                readOnly={true}
                rows="3"
              />
            </div>
            {!!description && (
              <div className="col-12 align-items-center fs-7">
                {description}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  };

  return (
    <div className={cssClass}>
      {!isPreview &&
        !isShowTextareaGroup &&
        (!isDataFieldsNotEmpty
          ? renderTextareaInput()
          : renderTextareaDataFieldGroup())}
      {!isPreview && isShowTextareaGroup && renderTextareaGroup()}
      {isPreview && renderTextareaPreview()}
    </div>
  );
};
