import React from "react";

export const CheckBox = (props) => {
  const {
    id,
    name,
    label,
    value,
    cssClass,
    onChangeHandler,
    isPreview,
    previewData,
    isCheckbox,
  } = props;

  const onChange = (event) => {
    onChangeHandler({ name, value: event.target.checked });
  };

  const renderOptions = (options) => {
    return (
      options && options.map((option, index) => renderOptionHtml(option, index))
    );
  };

  const renderOptionHtml = (option, index) => {
    let inputType = isCheckbox ? "checkbox" : "radio";

    return (
      <div className="row mb-1 align-items-center" key={`choice-${index}`}>
        <div className="form-check">
          <input
            className="form-check-input"
            type={inputType}
            id={`inputType-${option.label}-${index}`}
            checked={option.checked}
            disabled
          />
          <label
            className="form-check-label"
            htmlFor={`inputType-${option.label}-${index}`}
          >
            {option.label}
          </label>
        </div>
      </div>
    );
  };

  const renderCheckboxPreview = () => {
    let { label, description, instructions, detailed_instruction, options } =
      previewData?.field_options;
    let { is_mandatory } = previewData;

    return (
      <div className="row mb-3">
        {!!label && (
          <label className="ps-0 mb-1 align-items-center label-preview">
            {label} {is_mandatory && <span className="text-danger">*</span>}
          </label>
        )}
        {!!detailed_instruction && (
          <div className="row align-items-center fs-7">
            {detailed_instruction}
          </div>
        )}
        {!!instructions && (
          <div className="row align-items-center fs-7">{instructions}</div>
        )}
        <div className="row align-items-center">{renderOptions(options)}</div>
        {!!description && (
          <div className="row align-items-center fs-7">{description}</div>
        )}
      </div>
    );
  };

  const renderCheckbox = () => {
    return (
      <div className={cssClass}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name={name}
            onChange={onChange}
            defaultChecked={value}
            id={id + "_checkbox"}
          />
          <label className="form-check-label" htmlFor={id + "_checkbox"}>
            {label}
          </label>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {!isPreview && renderCheckbox()}
      {isPreview && renderCheckboxPreview()}
    </React.Fragment>
  );
};
