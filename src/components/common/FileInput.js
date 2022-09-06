import React, { useState } from "react";
import TextFieldResource from "../../resource/TextField.Resource";

export const FileInput = (props) => {
  let { id } = props;
  const [selectedFileEvent, setSelectedFileEvent] = useState();

  const onClickHandler = () => {
    let elementId = `fileInputHidden_${id}`;
    document.getElementById(elementId).click();
  };

  const onChangeHandler = (event) => {
    setSelectedFileEvent(event);
    props.fileUploadHandler(event);
  };

  return (
    <div className="row mb-3 align-items-center MP5__fileInput__wrapper">
      <div className="col-8">
        <input
          type="file"
          className="form-control d-none"
          id={`fileInputHidden_${id}`}
          onChange={onChangeHandler}
          name="file"
        />
        <div className="input-group" onClick={onClickHandler}>
          <div
            className="form-control MP5__fileInput__placeholder bg-transparent"
            readOnly
          >
            {selectedFileEvent?.target?.files[0]?.name ||
              TextFieldResource.Select_File_Placeholder_Label}
          </div>
          <label className="input-group-btn">
            <span className="btn btn-outline-secondary MP5__fileInput__btn">
              {TextFieldResource.Browse_Computer_Label}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
