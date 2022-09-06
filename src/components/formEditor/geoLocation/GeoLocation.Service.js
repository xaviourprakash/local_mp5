import TextFieldResource from "../../../resource/TextField.Resource";
import FormEditorService from "../FormEditor.service";

const GeoLocationService = {
  updateGeoLocationOnChangeHandler(data, fields) {
    let updatedData;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };

    let { name, value } = data;

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_Instructions:
      case TextFieldResource.FieldName_DetailedInstruction:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [name]: value },
        };
        break;
      case TextFieldResource.FieldName_Description:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, description: value },
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
      case TextFieldResource.FieldName_IsMandatory:
        updatedData = { ...fields, [name]: value };
        break;
      case TextFieldResource.FieldName_InternalName_Slug:
        updatedData = {
          ...fields,
          slug: FormEditorService.checkInternalNameValidation(value),
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
};

export default GeoLocationService;
