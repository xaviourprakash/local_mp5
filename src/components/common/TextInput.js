import React from "react";

export const TextInput = (props) => {
  const {
    id,
    type,
    name,
    label,
    value,
    placeholder,
    cssClass,
    isExternalLabel,
    showInputTextGroup,
    onChangeHandler,
    onBlurHandler,
    showIncreaseDecreaseIndicator,
    onIncreaseHandler,
    onDecreaseHandler,
    beforeGroupText,
    afterGroupText,
    readOnly,
    onClickHandler,
    isPreview,
    previewData,
  } = props;

  const onBlur = (name, value) => {
    onBlurHandler && onBlurHandler({ name, value });
  };

  const onChange = (event) => {
    return (
      onChangeHandler && onChangeHandler({ name, value: event.target.value })
    );
  };

  const onClick = (event) => {
    return onClickHandler && onClickHandler(event);
  };

  const renderInput = () => {
    return (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        className="form-control"
        placeholder={placeholder || " "}
        onChange={onChange}
        onClick={onClick}
        onBlur={(event) => onBlur(event.target.name, event.target.value)}
        readOnly={readOnly || false}
      />
    );
  };

  const renderInputTextGroup = () => {
    return (
      <div className="input-group">
        {!!beforeGroupText && (
          <span className="input-group-text">{beforeGroupText}</span>
        )}
        {renderInput()}
        {!!afterGroupText && (
          <span className="input-group-text">{afterGroupText}</span>
        )}
      </div>
    );
  };

  const renderIncreaseDecreaseIndicator = () => {
    return (
      <>
        <a
          href="#"
          className="increase text-muted"
          onMouseLeave={() => onBlur(name, value)}
          onClick={() => onIncreaseHandler(name, value)}
        >
          <i className="fa-solid fa-chevron-up"></i>
        </a>
        <a
          href="#"
          className="decrease text-muted"
          onMouseLeave={() => onBlur(name, value)}
          onClick={() => onDecreaseHandler(name, value)}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </a>
      </>
    );
  };

  const renderTextInput = () => {
    return (
      <div
        className={isExternalLabel || !label ? "form-group" : "form-floating"}
      >
        {isExternalLabel && label && <label htmlFor={id}>{label}</label>}
        {renderInput()}
        {showIncreaseDecreaseIndicator && renderIncreaseDecreaseIndicator()}
        {!isExternalLabel && label && <label htmlFor={id}>{label}</label>}
      </div>
    );
  };

  const renderInputPreview = () => {
    let {
      label,
      description,
      instructions,
      detailed_instruction,
      maxlength,
      minlength,
    } = previewData?.field_options;
    let { is_mandatory } = previewData;
    let isShowMinMaxIndicator =
      (!!minlength && minlength !== "0") || (!!maxlength && maxlength !== "0")
        ? `(required ${minlength} - ${maxlength} Words)`
        : "";

    return (
      <div className="row g-0 mb-3">
        {!!label && (
          <label className="ps-0 mb-1 align-items-center label-preview">
            {label} {is_mandatory && <span className="text-danger">*</span>}
          </label>
        )}
        {!!detailed_instruction && (
          <div className="col-12 align-items-center fs-7">
            {detailed_instruction}
          </div>
        )}
        {!!instructions && (
          <div className="col-12 align-items-center fs-7">{instructions}</div>
        )}
        <div className="col-12 mb-1 align-items-center position-relative">
          {(previewData?.field_options.hasOwnProperty("minlength") ||
            previewData?.field_options.hasOwnProperty("maxlength")) && (
            <div className="fs-7 words-counter">{`0 words / 0 letters ${isShowMinMaxIndicator}`}</div>
          )}
          <input
            type="text"
            defaultValue=""
            className="form-control"
            readOnly={true}
          />
        </div>
        {!!description && (
          <div className="col-12 align-items-center fs-7">{description}</div>
        )}
      </div>
    );
  };

  return (
    <div className={cssClass}>
      {!isPreview && !showInputTextGroup && renderTextInput()}
      {!isPreview && showInputTextGroup && renderInputTextGroup()}
      {isPreview && renderInputPreview()}
    </div>
  );
};
