import React, { useState, useEffect } from "react";
import FormBuilderResource from "../../resource/FormBuilder.Resource";
import { useTranslation } from "react-i18next";

export const AddDataFieldModal = (props) => {
  const {
    modalId,
    dataFields,
    onSaveDataFieldHandler,
    selectedValue,
    hideModalHandler,
    isResetOption,
  } = props;
  const [selectedOption, setSelectedOption] = useState("");
  const { t } = useTranslation(["translation", "contentTranslator"]);

  useEffect(() => {
    setSelectedOption(selectedValue);
  }, [isResetOption]);

  const onDataFieldClick = (event, value) => {
    event.preventDefault();
    setSelectedOption(value);
  };

  const renderDataFieldContent = () => {
    return (
      <>
        <h5 className="modal-title">
          <b>
            {`${t(
              `contentTranslator:content.Label_Select_Data`,
              FormBuilderResource.Label_Select_Data
            )}`}
          </b>
        </h5>
        <ul className="list-group">
          {dataFields.map((item) => (
            <a
              href="#/"
              className={`${
                selectedOption === item.selectedValue ? "selected" : ""
              } list-group-item list-group-item-action`}
              id={item.value}
              key={item.value}
              onClick={(event) => onDataFieldClick(event, item.selectedValue)}
            >
              {item.label}
            </a>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div
      className="modal fade bd-example-modal-sm"
      id={modalId}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content min-h-75">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={(event) => hideModalHandler(event, selectedValue)}
            ></button>
          </div>
          <div className="modal-body p-0 for-list-group">
            {renderDataFieldContent()}
          </div>
          <div className="modal-footer d-block border-0 pb-4">
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={(event) => hideModalHandler(event, selectedValue)}
                >
                  {`${t(
                    `contentTranslator:content.Label_Cancel`,
                    FormBuilderResource.Label_Cancel
                  )}`}
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={(event) =>
                    onSaveDataFieldHandler(event, selectedOption)
                  }
                >
                  {`${t(
                    `contentTranslator:content.Label_Ok`,
                    FormBuilderResource.Label_Ok
                  )}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
