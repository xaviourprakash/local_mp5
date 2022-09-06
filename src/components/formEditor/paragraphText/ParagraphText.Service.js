import TextFieldResource from "../../../resource/TextField.Resource";
import { TextArea } from "../../common";

const ParagraphTextService = {
  updateParagraphOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
      case TextFieldResource.FieldName_Paragraph:
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

  getParagraphBasicDetails(data) {
    let { fields, onChangeHandler, t, dataFields } = data;

    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Paragraph}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Paragraph}
            label={`${t(
              "contentTranslator:content.Text_For_Output",
              TextFieldResource.Text_For_Output
            )}`}
            value={fields?.field_options?.output_paragraph_description}
            placeholder={TextFieldResource.FieldName_Paragraph}
            cssClass="col-12"
            dataFields={dataFields}
          />
        </div>
      </>
    );
  },
};

export default ParagraphTextService;
