import FormBuilderResource from "../../resource/FormBuilder.Resource";
import { useTranslation } from "react-i18next";

export const AddModal = (props) => {
  const { hideModal, modalTitle, children, modalId, isHideFooter } = props;
  const { t } = useTranslation(["translation", "contentTranslator"]);

  return (
    <div
      className="modal fade modal-fullscreen MB5_preview_modal"
      tabIndex="-1"
      id={modalId}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            {!!modalTitle && (
              <h3 className="modal-title fw-bold ps-3">{modalTitle}</h3>
            )}
            <ul className="nav nav-tabs MB5_preview_nav_tabs" id="MB5_nav_tabs">
              <li className="nav-item" role="presentation">
                <a className="nav-link active" href="#">
                  {`${t(
                    `contentTranslator:content.Label_Desktop`,
                    FormBuilderResource.Label_Desktop
                  )}`}
                </a>
              </li>
            </ul>
            <button
              onClick={() => hideModal()}
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">{children}</div>
          </div>
          {!isHideFooter && (
            <div className="modal-footer row justify-content-between">
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-link text-primary opacity-25"
                  disabled
                >
                  <i className="fa-solid fa-chevron-left fs-5"></i>
                </button>
              </div>

              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-link text-primary opacity-25"
                  disabled
                >
                  <i className="fa-solid fa-chevron-right fs-5"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
