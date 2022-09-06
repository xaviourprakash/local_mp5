import React from "react";
//import { useTranslation } from "react-i18next";

import FBService from "../formBuilder/FormBuilder.service";
import { LayoutOptions } from "../../constants/TextFiledConstants";

export const SelectDropDown = (props) => {
  //const { t } = useTranslation(["translation", "contentTranslator"]);
  const {
    name,
    options,
    label,
    value,
    cssClass,
    onChangeHandler,
    isPreview,
    previewData,
  } = props;

  const onChange = (event) => {
    onChangeHandler({ name, value: event.target.value });
  };

  const renderDropDownPreview = () => {
    let { label, description, instructions, detailed_instruction } =
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
        <div className="row mb-1 align-items-center">
          <select className="form-select" defaultValue="" disabled>
            <option value="">Select option...</option>
          </select>
        </div>
        {!!description && (
          <div className="row align-items-center fs-7">{description}</div>
        )}
      </div>
    );
  };

  const renderDropDown = () => {
    return (
      <div className={cssClass}>
        <div className="form-floating">
          <select
            className="form-select"
            name={name}
            value={value}
            onChange={onChange}
          >
            {options &&
              options.map(function (option) {
                return (
                  <option value={option.value} key={option.value}>
                    {/* {`${t(
                    `contentTranslator:content.${option.label}`,
                    option.label
                    )}`} */}
                    {FBService.getTranslation(option.label, LayoutOptions)}
                  </option>
                );
              })}
          </select>
          {label && <label htmlFor={name}>{label}</label>}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {!isPreview && renderDropDown()}
      {isPreview && renderDropDownPreview()}
    </React.Fragment>
  );
};
