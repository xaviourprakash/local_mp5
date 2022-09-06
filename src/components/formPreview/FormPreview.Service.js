import React from "react";
import TextFieldResource from "../../resource/TextField.Resource";
import { TextInput, TextArea, SelectDropDown, CheckBox } from "../common/index";

const FormPreviewService = {
  renderPreview(element, htmlContent) {
    let { label, description, instructions, detailed_instruction } =
      element?.field_options;
    let { is_mandatory } = element;

    return (
      <div className="row mb-3" key={element.internalId}>
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
        {htmlContent}
        {!!description && (
          <div className="row align-items-center fs-7">{description}</div>
        )}
      </div>
    );
  },

  renderGeoLocation() {
    return (
      <div className="row col-12 ps-0 mb-1 align-items-center">
        <div className="col-3">
          <div className="input-group">
            <label className="input-group-text">
              {TextFieldResource.Label_Lat}
            </label>
            <div className="form-control bg-transparent"></div>
          </div>
        </div>
        <div className="col-3">
          <div className="input-group">
            <label className="input-group-text">
              {TextFieldResource.Label_Long}
            </label>
            <div className="form-control bg-transparent"></div>
          </div>
        </div>
        <button className="col-auto btn btn-primary">
          <i className="fa-solid fa-location-dot"></i>
        </button>
      </div>
    );
  },

  renderImageOutput(element) {
    let { height, width, image_text, image_url } = element?.field_options;
    let currentHeight = !!height && height !== "0" ? height : "";
    let currentWidth = !!width && width !== "0" ? width : "";
    let htmlContent = (
      <React.Fragment>
        {!!image_text && (
          <label className="ps-0 mb-1 align-items-center label-preview">
            {image_text}
          </label>
        )}
        {!!image_url && (
          <div className="ps-0 mb-1 align-items-center">
            <img
              className="img-responsive"
              src={image_url}
              width={currentWidth}
              height={currentHeight}
            />
          </div>
        )}
      </React.Fragment>
    );
    return FormPreviewService.renderPreview(element, htmlContent);
  },

  getElementPreview(element) {
    let htmlContent = "";

    switch (element.type) {
      case "text_field":
        return (
          <TextInput
            key={element.internalId}
            isPreview={true}
            previewData={element}
          />
        );
      case "text_area":
        return (
          <TextArea
            key={element.internalId}
            isPreview={true}
            previewData={element}
          />
        );
      case "check_box":
        return (
          <CheckBox
            key={element.internalId}
            isPreview={true}
            previewData={element}
            isCheckbox={true}
          />
        );
      case "radio_button":
        return (
          <CheckBox
            key={element.internalId}
            isPreview={true}
            previewData={element}
            isCheckbox={false}
          />
        );
      case "drop_box":
        return (
          <SelectDropDown
            key={element.internalId}
            isPreview={true}
            previewData={element}
          />
        );
      case "date":
        htmlContent = (
          <div className="row col-5 mb-1 align-items-center">
            <div className="input-group ps-0">
              <input
                type="text"
                className="form-control"
                placeholder="dd-mm-yyyy"
                readOnly={true}
              />
              <span className="input-group-text bg-transparent">
                <i className="fa-solid fa-calendar-days"></i>
              </span>
            </div>
          </div>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "url":
        htmlContent = (
          <div className="row mb-1 align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder=""
              readOnly={true}
            />
          </div>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "confirmation_code":
        htmlContent = (
          <div className="row col-5 mb-1 align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder=""
              readOnly={true}
            />
          </div>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "file":
        htmlContent = (
          <div className="row ps-0 mb-1 align-items-center">
            <div className="input-group">
              <div className="form-control bg-transparent">
                {TextFieldResource.Select_File_Placeholder_Label}
              </div>
              <label className="input-group-text">
                {TextFieldResource.Browse_Computer_Label}
              </label>
            </div>
          </div>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "output_video":
        htmlContent = (
          <div className="row ps-0 col-6 mb-1 align-items-center" disabled>
            <video controls>
              <source src="" type="video/mp4" />
            </video>
          </div>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "output_audio":
        htmlContent = (
          <div className="row ps-0 col-6 mb-1 align-items-center" disabled>
            <audio controls>
              <source src="" type="audio/mpeg" />
            </audio>
          </div>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "geolocation":
        htmlContent = FormPreviewService.renderGeoLocation();
        return FormPreviewService.renderPreview(element, htmlContent);
      case "output_link":
        let { link_text } = element?.field_options;
        htmlContent = (
          <React.Fragment>
            {!!link_text && (
              <div className="row ps-0 mb-1 align-items-center">
                <a href="#">{link_text}</a>
              </div>
            )}
          </React.Fragment>
        );

        return FormPreviewService.renderPreview(element, htmlContent);
      case "output_horizontal_ruller":
        htmlContent = (
          <div className="row ps-0 mb-1 align-items-center">
            <span className="border border-top-1"></span>
          </div>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "output_paragraph":
        let { output_paragraph_description } = element?.field_options;
        htmlContent = (
          <React.Fragment>
            {!!output_paragraph_description && (
              <div className="row mb-1 align-items-center">
                <div
                  className="ps-0"
                  dangerouslySetInnerHTML={{
                    __html: `${output_paragraph_description}`,
                  }}
                ></div>
              </div>
            )}
          </React.Fragment>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      case "output_img":
        return FormPreviewService.renderImageOutput(element);
      case "output_file":
        let { file_name } = element?.field_options;
        htmlContent = (
          <React.Fragment>
            {!!file_name && (
              <div className="row ps-0 mb-1 align-items-center">
                <a href="#">{file_name}</a>
              </div>
            )}
          </React.Fragment>
        );
        return FormPreviewService.renderPreview(element, htmlContent);
      default:
        break;
    }
  },
};

export default FormPreviewService;
