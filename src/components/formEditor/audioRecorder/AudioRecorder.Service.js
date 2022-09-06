import TextFieldResource from "../../../resource/TextField.Resource";
import { TextInput, CheckBox, Accordion, SelectDropDown } from "../../common";
import { AudioFormat } from "../../../constants/TextFiledConstants";
import FormEditorService from "../FormEditor.service";

const AudioRecorderService = {
  updateVideoOnChangeHandler(data, fields) {
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
      case TextFieldResource.Min_File:
      case TextFieldResource.Max_File:
      case TextFieldResource.MinLength:
      case TextFieldResource.MaxLength:
      case TextFieldResource.FiledName_Max_noise:
      case TextFieldResource.FiledName_Audio:
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
      case TextFieldResource.FieldName_AutoPlay:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
          },
        };
        break;
      case TextFieldResource.FiledName_CheckBagroundNoise:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value === true ? "true" : "false",
            max_background_noise: "",
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
      case TextFieldResource.FieldName_IsMandatory:
        updatedData = { ...fields, [name]: value === true ? "true" : "false" };
        break;
      case TextFieldResource.FieldName_InternalName_Slug:
        updatedData = {
          ...fields,
          slug: FormEditorService.checkInternalNameValidation(value),
        };
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },
  updateTextboxOnBlurHandler(data, fields) {
    let updatedData, maxValue;
    let fieldOptions = { ...fields.field_options };
    let { name, value } = data;

    switch (name) {
      case TextFieldResource.MinLength:
        maxValue =
          parseInt(value) > parseInt(fieldOptions.maxlength) &&
          !!fieldOptions.maxlength
            ? value
            : fieldOptions.maxlength;
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            minlength: value,
            maxlength: maxValue,
          },
        };
        break;
      case TextFieldResource.MaxLength:
        maxValue =
          parseInt(fieldOptions.minlength) > parseInt(value)
            ? fieldOptions.minlength
            : value;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, maxlength: maxValue },
        };
        break;
      case TextFieldResource.Min_File:
        maxValue =
          parseInt(value) > parseInt(fieldOptions.max) && !!fieldOptions.max
            ? value
            : fieldOptions.max;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, min: value, max: maxValue },
        };
        break;
      case TextFieldResource.Max_File:
        maxValue =
          parseInt(fieldOptions.min) > parseInt(value)
            ? fieldOptions.min
            : value;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, max: maxValue },
        };
        break;

      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },
  getElementSetting(data) {
    let {
      fields,
      onChangeHandler,
      onBlurHandler,
      t,
      onIncreaseHandler,
      onDecreaseHandler,
    } = data;

    return (
      <Accordion
        type={`${t(
          `contentTranslator:content.SetTheSettings`,
          TextFieldResource.SetTheSettings
        )}`}
        cssClass="mp5__configTextField__set-setting"
        isChildAccordion
        accordionId={`setTheSettings-${fields.internalId}`}
      >
        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_AutoPlay}_${fields.internalId}`}
            name={TextFieldResource.FieldName_AutoPlay}
            label={`${t(
              "contentTranslator:content.AutoPlay_Label",
              TextFieldResource.AutoPlay_Label
            )}`}
            value={
              fields?.field_options?.auto_play_sequence === "true"
                ? true
                : false
            }
            cssClass="col-6"
          />
        </div>
        <div className="row mb-3">
          <SelectDropDown
            options={AudioFormat}
            name={TextFieldResource.FiledName_Audio}
            label={`${t(
              "contentTranslator:content.AudioFormat_Label",
              TextFieldResource.AudioFormat_Label
            )}`}
            value={fields?.field_options?.camera}
            onChangeHandler={onChangeHandler}
            cssClass="col-12"
          />
        </div>

        <div className="row mb-3 align-items-center ps-4">
          {t(
            "contentTranslator:content.NumberOfAudio_Label",
            TextFieldResource.NumberOfAudio_Label
          )}
        </div>

        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.min",
              TextFieldResource.Min
            )}`}
            value={fields?.field_options?.min}
            type="number"
            id={`${TextFieldResource.Min_File}_${fields.internalId}`}
            name={TextFieldResource.Min_File}
            onBlurHandler={onBlurHandler}
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
              "contentTranslator:content.max",
              TextFieldResource.Max
            )}`}
            value={fields?.field_options?.max}
            type="number"
            id={`${TextFieldResource.Max_File}_${fields.internalId}`}
            name={TextFieldResource.Max_File}
            onBlurHandler={onBlurHandler}
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

        <div className="row mb-3 align-items-center ps-4">
          {t(
            "contentTranslator:content.LengthPerAudio_Label",
            TextFieldResource.LengthPerAudio_Label
          )}
        </div>

        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.MinLength_File",
              TextFieldResource.MinLength
            )}`}
            value={fields?.field_options?.minlength}
            type="number"
            id={`${TextFieldResource.MinLength}_${fields.internalId}`}
            name={TextFieldResource.MinLength}
            onBlurHandler={onBlurHandler}
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
              "contentTranslator:content.MaxLength_File",
              TextFieldResource.MaxLength
            )}`}
            value={fields?.field_options?.maxlength}
            type="number"
            id={`${TextFieldResource.MaxLength}_${fields.internalId}`}
            name={TextFieldResource.MaxLength}
            onBlurHandler={onBlurHandler}
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
        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FiledName_CheckBagroundNoise}_${fields.internalId}`}
            name={TextFieldResource.FiledName_CheckBagroundNoise}
            label={`${t(
              "contentTranslator:content.CheckBagroundNoise",
              TextFieldResource.CheckBagroundNoise
            )}`}
            value={
              fields?.field_options?.check_background_noise === "true"
                ? true
                : false
            }
            cssClass="col-6"
          />
          {fields?.field_options?.check_background_noise === "true" && (
            <TextInput
              label={`${t(
                "contentTranslator:content.Max_Noise",
                TextFieldResource.Max_Noise
              )}`}
              value={fields?.field_options?.max_background_noise}
              type="number"
              id={`${TextFieldResource.FiledName_Max_noise}_${fields.internalId}`}
              name={TextFieldResource.FiledName_Max_noise}
              onBlurHandler={onBlurHandler}
              onChangeHandler={onChangeHandler}
              showIncreaseDecreaseIndicator={true}
              onIncreaseHandler={(name, value) =>
                onIncreaseHandler(name, value, "changeHandler")
              }
              onDecreaseHandler={(name, value) =>
                onDecreaseHandler(name, value, "changeHandler")
              }
              cssClass="col-6"
            />
          )}
        </div>
      </Accordion>
    );
  },
};

export default AudioRecorderService;
