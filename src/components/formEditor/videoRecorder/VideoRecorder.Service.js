import TextFieldResource from "../../../resource/TextField.Resource";
import {
  TextInput,
  CheckBox,
  Accordion,
  SelectDropDown,
  TextArea,
} from "../../common";
import {
  Camera,
  CameraOrientation,
  MinimumResolution,
  Flash,
  Source,
} from "../../../constants/TextFiledConstants";
import FormEditorService from "../FormEditor.service";

const VideoRecorderService = {
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
      case TextFieldResource.FieldName_Camera:
      case TextFieldResource.FieldName_CameraOrientation:
      case TextFieldResource.FieldName_MinimumResolution:
      case TextFieldResource.FieldName_Flash:
      case TextFieldResource.FieldName_Source:
      case TextFieldResource.FieldName_AudioGuideUrl:
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
      case TextFieldResource.FieldName_Video_Without_Sound:
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
      case TextFieldResource.FieldName_IsMandatory:
        updatedData = { ...fields, [name]: value === true ? "true" : "false" };
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
        <div className="row mb-3">
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

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Video_Without_Sound}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Video_Without_Sound}
            label={`${t(
              "contentTranslator:content.Video_Without_Sound",
              TextFieldResource.Video_Without_Sound
            )}`}
            value={
              fields?.field_options?.video_without_sound === "true"
                ? true
                : false
            }
            cssClass="col-6"
          />
        </div>

        <div className="row mb-3">
          <SelectDropDown
            options={Camera}
            name={TextFieldResource.FieldName_Camera}
            label={`${t(
              "contentTranslator:content.Camera_Label",
              TextFieldResource.Camera_Label
            )}`}
            value={fields?.field_options?.camera}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />

          <SelectDropDown
            options={CameraOrientation}
            name={TextFieldResource.FieldName_CameraOrientation}
            label={`${t(
              "contentTranslator:content.CameraOrientation_Label",
              TextFieldResource.CameraOrientation_Label
            )}`}
            value={fields?.field_options?.camera_orientation}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={MinimumResolution}
            name={TextFieldResource.FieldName_MinimumResolution}
            label={`${t(
              "contentTranslator:content.MinimumResolution_Label",
              TextFieldResource.MinimumResolution_Label
            )}`}
            value={fields?.field_options?.minimum_resolution}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={Flash}
            name={TextFieldResource.FieldName_Flash}
            label={`${t(
              "contentTranslator:content.Flash_Label",
              TextFieldResource.Flash_Label
            )}`}
            value={fields?.field_options?.flash}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />

          <SelectDropDown
            options={Source}
            name={TextFieldResource.FieldName_Source}
            label={`${t(
              "contentTranslator:content.Source_Label",
              TextFieldResource.Source_Label
            )}`}
            value={fields?.field_options?.source}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />
        </div>
        <div className="row mb-1 align-items-center">
          <label>
            {t(
              "contentTranslator:content.NumberOfVideo_Label",
              TextFieldResource.NumberOfVideo_Label
            )}
          </label>
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

        <div className="row mb-1 align-items-center">
          <label>
            {t(
              "contentTranslator:content.LengthPerVideo_Label",
              TextFieldResource.LengthPerVideo_Label
            )}
          </label>
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
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_AudioGuideUrl}_${fields.internalId}`}
            name={TextFieldResource.FieldName_AudioGuideUrl}
            label={`${t(
              "contentTranslator:content.AudioGuideDescription",
              TextFieldResource.AudioGuideDescription
            )}`}
            value={fields?.field_options?.audio_guide_url}
            placeholder={TextFieldResource.AudioGuideDescription}
            cssClass="col-12"
          />
        </div>
      </Accordion>
    );
  },
};

export default VideoRecorderService;
