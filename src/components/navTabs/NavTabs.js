import React from "react";
import { useTranslation } from "react-i18next";
import FormBuilderResource from "../../resource/FormBuilder.Resource";
export const NavTabs = (props) => {
  const { apiStatus, showModal, updateFormBuilderStatus } = props;
  const { t } = useTranslation(["translation", "contentTranslator"]);

  const updateApiStatusChangesByClick = () => {
    if (apiStatus.request_Status !== "Label_Saving") {
      updateFormBuilderStatus();
    }
  };

  return (
    <div className="MB5_navTabs">
      <div className="row g-0 align-items-center">
        <div className="col-3 ps-2">
          {apiStatus && apiStatus.request_Status && (
            <span className="text-primary">
              <a
                href="#/"
                className="p-events-active text-decoration-none"
                onClick={() => updateApiStatusChangesByClick()}
              >
                <i
                  className={`${apiStatus.request_Label_IconClass} fs-3`}
                ></i>
                <span className="fs-6 saving-button-txt">
                  {t(
                    `contentTranslator:content.${apiStatus.request_Status}`,
                    `FormBuilderResource.${apiStatus.request_Status}`
                  )}
                </span>
              </a>
            </span>
          )}
        </div>
        <div className="col-auto ms-auto me-auto">
          <ul
            className="nav nav-tabs justify-content-center ms-auto"
            id="MB5_nav_tabs"
          >
            <li className="nav-item" role="presentation">
              <a className="nav-link active" href="#/">
                {t(
                  "contentTranslator:content.structure",
                  FormBuilderResource.Structure_Label
                )}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-3 text-end">
          <button className="btn btn-link btn-preview-modal" onClick={showModal}>
            <i className="fa-solid fa-eye border-0 fs-5 text-secondary"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
