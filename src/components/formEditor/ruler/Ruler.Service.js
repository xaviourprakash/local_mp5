import TextFieldResource from "../../../resource/TextField.Resource";
import { TextInput, CheckBox } from "../../common";

const RulerService = {
  updateRulerOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Background_Image_URL:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [name]: value },
        };
        break;
      case TextFieldResource.FieldName_Starts_Group:
      case TextFieldResource.FieldName_Starts_Chapter:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
          },
        };
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  getRulerDetails(data) {
    let { fields, onChangeHandler, t } = data;

    return (
      <>
        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Starts_Chapter}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Starts_Chapter}
            label={`${t(
              "contentTranslator:content.Starts_Chapter",
              TextFieldResource.Starts_Chapter
            )}`}
            value={
              fields?.field_options?.starts_chapter === "true" ? true : false
            }
            cssClass="col-6"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Starts_Group}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Starts_Group}
            label={`${t(
              "contentTranslator:content.Starts_Group",
              TextFieldResource.Starts_Group
            )}`}
            value={
              fields?.field_options?.starts_group === "true" ? true : false
            }
            cssClass="col-6"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <TextInput
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Background_Image_URL}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Background_Image_URL}
            label={`${t(
              "contentTranslator:content.Background_Image_URL",
              TextFieldResource.Background_Image_URL
            )}`}
            value={fields?.field_options?.group_background_image_url}
            cssClass="col-12"
          />
        </div>
      </>
    );
  },
};

export default RulerService;
