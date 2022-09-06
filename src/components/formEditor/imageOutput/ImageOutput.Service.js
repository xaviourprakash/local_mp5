import TextFieldResource from "../../../resource/TextField.Resource";
import { TextArea, TextInput, FileInput } from "../../common";
import FBService from "../../formBuilder/FormBuilder.service";

const ImageOutputService = {
  fileUploadHandler(event, slug, updateFileData) {
    FBService.fileUploadRequestHandler(event, slug, updateFileData);
  },

  updateImageOutputOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
      case TextFieldResource.FieldName_Image_Text:
      case TextFieldResource.FieldName_Height:
      case TextFieldResource.FieldName_Width:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [name]: value },
        };
        break;
      case TextFieldResource.FieldName_KeepOnPreviousPage:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
          },
        };
        break;
      case TextFieldResource.mp_df_mobile_create:
      case TextFieldResource.mp_df_mobile_edit:
      case TextFieldResource.mp_df_mobile_validate:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            show_in_nodes: {
              ...showNodes,
              [name]: value === true ? "true" : "false",
            },
          },
        };
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  getImageOutputBasicDetails(data) {
    let {
      fields,
      onChangeHandler,
      t,
      onIncreaseHandler,
      onDecreaseHandler,
      fileUploadHandler,
      clearUploadedFile,
      isShowFileName,
    } = data;

    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Image_Text}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Image_Text}
            label={`${t(
              "contentTranslator:content.Image_Name_Label",
              TextFieldResource.Image_Name_Label
            )}`}
            value={fields?.field_options?.image_text}
            cssClass="col-12"
          />
        </div>

        <div className="row mb-2 fw-bold align-items-center ps-4">
          {t(
            "contentTranslator:content.Image_Upload_Label",
            TextFieldResource.Image_Upload_Label
          )}
        </div>

        {!isShowFileName && (
          <FileInput
            fileUploadHandler={fileUploadHandler}
            id={`file_input_${fields.internalId}`}
          />
        )}

        {isShowFileName && (
          <div className="row mb-3 align-items-center">
            <span className="col-5">
              {fields?.field_options?.uploaded_file_name ||
                TextFieldResource.Uploaded_Image_Placeholder_Label}
            </span>
            <span className="col-1 bg-transparent" onClick={clearUploadedFile}>
              <i className="fa-solid fa-trash border-0 fs-5 text-secondary"></i>
            </span>
          </div>
        )}

        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.Image_Width_Label",
              TextFieldResource.Image_Width_Label
            )}`}
            placeholder={TextFieldResource.Original_Placeholder_Label}
            value={fields?.field_options?.width}
            type="number"
            id={`${TextFieldResource.FieldName_Width}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Width}
            onChangeHandler={onChangeHandler}
            showIncreaseDecreaseIndicator={true}
            onIncreaseHandler={(name, value) =>
              onIncreaseHandler(name, value, "changeHandler")
            }
            onDecreaseHandler={(name, value) =>
              onDecreaseHandler(name, value, "changeHandler")
            }
            cssClass="col-3"
          />

          <TextInput
            label={`${t(
              "contentTranslator:content.Image_Height_Label",
              TextFieldResource.Image_Height_Label
            )}`}
            placeholder={TextFieldResource.Original_Placeholder_Label}
            value={fields?.field_options?.height}
            type="number"
            id={`${TextFieldResource.FieldName_Height}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Height}
            onChangeHandler={onChangeHandler}
            showIncreaseDecreaseIndicator={true}
            onIncreaseHandler={(name, value) =>
              onIncreaseHandler(name, value, "changeHandler")
            }
            onDecreaseHandler={(name, value) =>
              onDecreaseHandler(name, value, "changeHandler")
            }
            cssClass="col-3"
          />
        </div>
      </>
    );
  },
};

export default ImageOutputService;
