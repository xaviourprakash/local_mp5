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
  CameraLens,
  ShotMode,
  CameraOrientation,
  MinimumResolution,
  Flash,
  Source,
  PhotoFormat,
  FillAndOutlineMethod,
  Shape,
} from "../../../constants/TextFiledConstants";
import FormEditorService from "../FormEditor.service";
import FBService from "../../formBuilder/FormBuilder.service";

const ImageFieldService = {
  updateImageOnChangeHandler(data, fields) {
    let updatedData, annotationSteps;
    let fieldOptions = { ...fields.field_options };
    let showNodes = { ...fieldOptions.show_in_nodes };

    let { name, value, currentIndex } = data;

    switch (name) {
      case TextFieldResource.FieldName_Label:
      case TextFieldResource.FieldName_Instructions:
      case TextFieldResource.FieldName_DetailedInstruction:
      case TextFieldResource.FieldName_BreakLine:
      case TextFieldResource.NumberOfColumns:
      case TextFieldResource.Min_File:
      case TextFieldResource.Max_File:
      case TextFieldResource.FieldName_IncludeDepthInformation:
      case TextFieldResource.FieldName_Camera:
      case TextFieldResource.FieldName_CameraOrientation:
      case TextFieldResource.FieldName_NumberOfImages:
      case TextFieldResource.FieldName_DelayInShot:
      case TextFieldResource.FieldName_CameraLens:
      case TextFieldResource.FieldName_MinimumResolution:
      case TextFieldResource.FieldName_Flash:
      case TextFieldResource.FieldName_Source:
      case TextFieldResource.FieldName_PhotoFormat:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [name]: value },
        };
        break;
      case TextFieldResource.FieldName_ShotMode:
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            [name]: value,
            delay_in_shot: "",
            number_of_images_in_shot: "",
          },
        };
        break;
      case TextFieldResource.FieldName_Description:
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, description: value },
        };
        break;
      case TextFieldResource.FieldName_KeepOnPreviousPage:
      case TextFieldResource.FieldName_LivePhoto:
      case TextFieldResource.FieldName_DetectFaces:
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
      case TextFieldResource.FieldName_Annotation_Slug:
      case TextFieldResource.FieldName_Annotation_Title:
      case TextFieldResource.FieldName_Annotation_TitleDE:
      case TextFieldResource.FieldName_Annotation_Description:
      case TextFieldResource.FieldName_Annotation_DescriptionDE:
      case TextFieldResource.FieldName_OutlineStrength:
      case TextFieldResource.FieldName_Shape:
      case TextFieldResource.FieldName_DrawOnImage:
      case TextFieldResource.FieldName_SortOrder:
      case TextFieldResource.FieldName_IsOpen:
        annotationSteps = FormEditorService.updateMultiChoiceOptions(
          fieldOptions.annotation_steps,
          currentIndex,
          value,
          name,
          "annotationSteps"
        );
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            annotation_steps: [...annotationSteps],
          },
        };
        break;
      case TextFieldResource.FieldName_Text:
      case TextFieldResource.FieldName_Barcode:
      case TextFieldResource.FieldName_Animal:
      case TextFieldResource.FieldName_Face:
      case TextFieldResource.FieldName_Human:
        let type = "auto_detectors";
        annotationSteps = ImageFieldService.updateFillAndOutlineMethod(
          fieldOptions.annotation_steps,
          currentIndex,
          value,
          name,
          type
        );
        updatedData = {
          ...fields,
          field_options: {
            ...fieldOptions,
            annotation_steps: [...annotationSteps],
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

  updateImageOnBlurHandler(data, fields) {
    let updatedData, newValue;
    let fieldOptions = { ...fields.field_options };
    let { name, value } = data;
    let { fieldName } = FormEditorService.getFieldDetails(name);

    switch (fieldName) {
      case TextFieldResource.FieldName_NumberOfImages:
        newValue = value <= 1 && value !== "" ? "2" : value;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [fieldName]: newValue },
        };
        break;
      case TextFieldResource.FieldName_DelayInShot:
        newValue = value < 500 && value !== "" ? "500" : value;
        updatedData = {
          ...fields,
          field_options: { ...fieldOptions, [fieldName]: newValue },
        };
        break;
      default:
        updatedData = { ...fields };
    }

    return updatedData;
  },

  updateFillAndOutlineMethod(
    annotationSteps,
    currentIndex,
    value,
    fieldName,
    fieldType
  ) {
    let fieldValue =
      fieldType === "auto_detectors" && typeof value === "boolean"
        ? value === true
          ? "true"
          : "false"
        : value;
    let data;
    let updatedAnnotationSteps = annotationSteps.map(
      (annotationStep, index) => {
        if (index === parseInt(currentIndex)) {
          data = annotationStep[fieldType][0];

          if (
            fieldName === TextFieldResource.FieldName_OutlineAndFillMethod_Type
          ) {
            switch (fieldValue) {
              case FillAndOutlineMethod[1].value:
                data = { [fieldName]: fieldValue, color: "" };
                break;
              case FillAndOutlineMethod[2].value:
              case FillAndOutlineMethod[3].value:
              case FillAndOutlineMethod[4].value:
                data = { [fieldName]: fieldValue, strength: "" };
                break;
              case FillAndOutlineMethod[5].value:
              case FillAndOutlineMethod[6].value:
                data = {
                  [fieldName]: fieldValue,
                  blur_strength: "",
                  inpaint_strength: "",
                };
                break;
              default:
                data = {};
                break;
            }

            return { ...annotationStep, [fieldType]: [{ ...data }] };
          }

          return {
            ...annotationStep,
            [fieldType]: [{ ...data, [fieldName]: fieldValue }],
          };
        }

        return annotationStep;
      }
    );

    return updatedAnnotationSteps;
  },

  updateFillAndOutlineMethodHandler(fields, name, value, type) {
    let fieldOptions = { ...fields.field_options };
    let annotationSteps = [...fieldOptions.annotation_steps];
    let { fieldName, currentIndex } = FormEditorService.getFieldDetails(name);
    annotationSteps = ImageFieldService.updateFillAndOutlineMethod(
      fieldOptions.annotation_steps,
      currentIndex,
      value,
      fieldName,
      type
    );

    let updated_fields = {
      ...fields,
      field_options: {
        ...fieldOptions,
        annotation_steps: [...annotationSteps],
      },
    };

    return updated_fields;
  },

  getAnnotationStep() {
    return {
      fill_methods: [{}],
      outline_fill_methods: [{}],
      auto_detectors: [
        {
          text: "false",
          face: "false",
          human: "false",
          barcode: "false",
          animal: "false",
        },
      ],
      shape: "",
      sort_order: "",
      slug: "",
      title: "",
      title_de: "",
      description: "",
      description_de: "",
      outline_strength: "",
      draw_on_image: "",
      isOpen: "true",
    };
  },

  getMultipleAnnotationHtml(data) {
    let { fields } = data;
    let annotationSteps = fields?.field_options?.annotation_steps;

    return (
      annotationSteps &&
      annotationSteps.map((annotation, index) => {
        return ImageFieldService.getAnnotationHtml(annotation, index, data);
      })
    );
  },

  setIsOpenAccordian(index, value, fields) {
    let data = {
      name: TextFieldResource.FieldName_IsOpen,
      value: value,
      currentIndex: index,
    };
    let updatedField = ImageFieldService.updateImageOnChangeHandler(
      data,
      fields
    );

    return updatedField;
  },

  updateAddRemoveAnnotation(fields, isAdd, currentIndex) {
    let fieldOptions = { ...fields.field_options };
    let annotationSteps = [...fieldOptions.annotation_steps];

    if (isAdd) {
      annotationSteps.push(ImageFieldService.getAnnotationStep());
    } else {
      annotationSteps = annotationSteps.filter((field, index) => {
        return index !== parseInt(currentIndex);
      });
    }

    let updated_fields = {
      ...fields,
      field_options: {
        ...fieldOptions,
        annotation_steps: [...annotationSteps],
      },
    };

    return updated_fields;
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
            id={`${TextFieldResource.FieldName_LivePhoto}_${fields.internalId}`}
            name={TextFieldResource.FieldName_LivePhoto}
            label={`${t(
              "contentTranslator:content.LivePhoto_Label",
              TextFieldResource.LivePhoto_Label
            )}`}
            value={fields?.field_options?.live_photo === "true" ? true : false}
            cssClass="col-6"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_IncludeDepthInformation}_${fields.internalId}`}
            name={TextFieldResource.FieldName_IncludeDepthInformation}
            label={`${t(
              "contentTranslator:content.IncludeDepthInformation_Label",
              TextFieldResource.IncludeDepthInformation_Label
            )}`}
            value={fields?.field_options?.include_depth_information}
            cssClass="col-6"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_DetectFaces}_${fields.internalId}`}
            name={TextFieldResource.FieldName_DetectFaces}
            label={`${t(
              "contentTranslator:content.DetectFaces_Label",
              TextFieldResource.DetectFaces_Label
            )}`}
            value={
              fields?.field_options?.detect_faces === "true" ? true : false
            }
            cssClass="col-12 mb-3"
          />
        </div>

        <div className="row mb-3 align-items-center">
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
            cssClass="col-6 pe-0"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={ShotMode}
            name={TextFieldResource.FieldName_ShotMode}
            label={`${t(
              "contentTranslator:content.ShotMode_Label",
              TextFieldResource.ShotMode_Label
            )}`}
            value={fields?.field_options?.image_shot_mode}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />

          {fields?.field_options?.image_shot_mode === ShotMode[2].value && (
            <>
              <TextInput
                label={`${t(
                  "contentTranslator:content.NumberOfImages_Label",
                  TextFieldResource.NumberOfImages_Label
                )}`}
                value={fields?.field_options?.number_of_images_in_shot}
                type="number"
                id={`${TextFieldResource.FieldName_NumberOfImages}_${fields.internalId}`}
                name={TextFieldResource.FieldName_NumberOfImages}
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
                  "contentTranslator:content.DelayInShot_Label",
                  TextFieldResource.DelayInShot_Label
                )}`}
                value={fields?.field_options?.delay_in_shot}
                type="number"
                id={`${TextFieldResource.FieldName_DelayInShot}_${fields.internalId}`}
                name={TextFieldResource.FieldName_DelayInShot}
                onBlurHandler={onBlurHandler}
                onChangeHandler={onChangeHandler}
                showIncreaseDecreaseIndicator={true}
                onIncreaseHandler={(name, value) =>
                  onIncreaseHandler(name, value, "changeHandler")
                }
                onDecreaseHandler={(name, value) =>
                  onDecreaseHandler(name, value, "changeHandler")
                }
                cssClass="col-3 pe-0"
              />
            </>
          )}
        </div>

        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={CameraLens}
            name={TextFieldResource.FieldName_CameraLens}
            label={`${t(
              "contentTranslator:content.CameraLens_Label",
              TextFieldResource.CameraLens_Label
            )}`}
            value={fields?.field_options?.image_camera_lens}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />

          <SelectDropDown
            options={MinimumResolution}
            name={TextFieldResource.FieldName_MinimumResolution}
            label={`${t(
              "contentTranslator:content.MinimumResolution_Label",
              TextFieldResource.MinimumResolution_Label
            )}`}
            value={fields?.field_options?.minimum_resolution}
            onChangeHandler={onChangeHandler}
            cssClass="col-6 pe-0"
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
            cssClass="col-6 pe-0"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={PhotoFormat}
            name={TextFieldResource.FieldName_PhotoFormat}
            label={`${t(
              "contentTranslator:content.PhotoFormat_Label",
              TextFieldResource.PhotoFormat_Label
            )}`}
            value={fields?.field_options?.image_raw_format}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />
        </div>

        <div className="row mb-3 align-items-center ps-4">
          {t(
            "contentTranslator:content.NumberOfPhotos_Label",
            TextFieldResource.NumberOfPhotos_Label
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
      </Accordion>
    );
  },

  getFillAndOutlineMethodHtml(method, methodType, data, index) {
    let fillMethodType =
      methodType === "fillMethod"
        ? "FillMethod_Label"
        : "OutlineFillMethod_Label";
    let {
      fields,
      onBlurHandler,
      t,
      onIncreaseHandler,
      onDecreaseHandler,
      onChangeFillMethodHandler,
      onChangeOutlineMethodHandler,
    } = data;
    let { type, color, inpaint_strength, blur_strength, strength } = method[0];
    let fieldLabel = FBService.getTranslation(
      fillMethodType,
      TextFieldResource
    );
    let strengthCheck = [
      FillAndOutlineMethod[2].value,
      FillAndOutlineMethod[3].value,
      FillAndOutlineMethod[4].value,
    ];
    let inpaintBlurStrengthCheck = [
      FillAndOutlineMethod[5].value,
      FillAndOutlineMethod[6].value,
    ];
    let isStrength = strengthCheck.indexOf(type) !== -1;
    let isInpaintBlurStrength = inpaintBlurStrengthCheck.indexOf(type) !== -1;

    return (
      <div className="row mb-3 align-items-center">
        <SelectDropDown
          options={FillAndOutlineMethod}
          name={`${TextFieldResource.FieldName_OutlineAndFillMethod_Type}__${index}`}
          label={fieldLabel}
          value={type || ""}
          onChangeHandler={
            methodType === "fillMethod"
              ? onChangeFillMethodHandler
              : onChangeOutlineMethodHandler
          }
          cssClass="col-4"
        />

        {isStrength && (
          <>
            {/*- add hyphen here*/}{" "}
            <TextInput
              label={`${t(
                "contentTranslator:content.Strength_Label",
                TextFieldResource.Strength_Label
              )}`}
              value={strength}
              type="number"
              id={`${TextFieldResource.FieldName_OutlineAndFillMethod_Strength}_${fields.internalId}-${index}`}
              name={`${TextFieldResource.FieldName_OutlineAndFillMethod_Strength}__${index}`}
              onBlurHandler={onBlurHandler}
              onChangeHandler={
                methodType === "fillMethod"
                  ? onChangeFillMethodHandler
                  : onChangeOutlineMethodHandler
              }
              showIncreaseDecreaseIndicator={true}
              onIncreaseHandler={(name, value) =>
                onIncreaseHandler(name, value, methodType)
              }
              onDecreaseHandler={(name, value) =>
                onDecreaseHandler(name, value, methodType)
              }
              cssClass="col-4"
            />
          </>
        )}

        {isInpaintBlurStrength && (
          <>
            <TextInput
              label={`${t(
                "contentTranslator:content.BlurStrength_Label",
                TextFieldResource.BlurStrength_Label
              )}`}
              value={blur_strength}
              type="number"
              id={`${TextFieldResource.FieldName_OutlineAndFillMethod_BlurStrength}_${fields.internalId}-${index}`}
              name={`${TextFieldResource.FieldName_OutlineAndFillMethod_BlurStrength}__${index}`}
              onBlurHandler={onBlurHandler}
              onChangeHandler={
                methodType === "fillMethod"
                  ? onChangeFillMethodHandler
                  : onChangeOutlineMethodHandler
              }
              showIncreaseDecreaseIndicator={true}
              onIncreaseHandler={(name, value) =>
                onIncreaseHandler(name, value, methodType)
              }
              onDecreaseHandler={(name, value) =>
                onDecreaseHandler(name, value, methodType)
              }
              cssClass="col-4"
            />{" "}
            {/*- add hyphen here*/}
            <TextInput
              label={`${t(
                "contentTranslator:content.InpaintStrength_Label",
                TextFieldResource.InpaintStrength_Label
              )}`}
              value={inpaint_strength}
              type="number"
              id={`${TextFieldResource.FieldName_OutlineAndFillMethod_InpaintStrength}_${fields.internalId}-${index}`}
              name={`${TextFieldResource.FieldName_OutlineAndFillMethod_InpaintStrength}__${index}`}
              onBlurHandler={onBlurHandler}
              onChangeHandler={
                methodType === "fillMethod"
                  ? onChangeFillMethodHandler
                  : onChangeOutlineMethodHandler
              }
              showIncreaseDecreaseIndicator={true}
              onIncreaseHandler={(name, value) =>
                onIncreaseHandler(name, value, methodType)
              }
              onDecreaseHandler={(name, value) =>
                onDecreaseHandler(name, value, methodType)
              }
              cssClass="col-4"
            />
          </>
        )}

        {type === FillAndOutlineMethod[1].value && (
          <>
            {" "}
            {/*- add hyphen here*/}{" "}
            <TextInput
              label={`${t(
                "contentTranslator:content.Color_Label",
                TextFieldResource.Color_Label
              )}`}
              value={color || ""}
              type="text"
              id={`${TextFieldResource.FieldName_OutlineAndFillMethod_Color}_${fields.internalId}-${index}`}
              name={`${TextFieldResource.FieldName_OutlineAndFillMethod_Color}__${index}`}
              onChangeHandler={
                methodType === "fillMethod"
                  ? onChangeFillMethodHandler
                  : onChangeOutlineMethodHandler
              }
              cssClass="col-4"
            />
          </>
        )}
      </div>
    );
  },

  getAnnotationHtml(annotation, index, data) {
    let {
      fields,
      onChangeHandler,
      onBlurHandler,
      t,
      removeAnnotation,
      onIncreaseHandler,
      onDecreaseHandler,
      setIsOpenAccordianHandler,
    } = data;
    let {
      fill_methods,
      outline_fill_methods,
      auto_detectors,
      shape,
      sort_order,
      slug,
      title,
      title_de,
      description,
      description_de,
      outline_strength,
      draw_on_image,
      isOpen,
    } = annotation;
    let randomLabel = FBService.getRandomLabel();

    return (
      <Accordion
        key={`annotation_step--${randomLabel}--${fields.internalId}-${index}`}
        type={`${t(
          "contentTranslator:content.AnnotationStep_Label",
          TextFieldResource.AnnotationStep_Label
        )} ${index + 1}`}
        cssClass="mp5__configTextField__annotation_step"
        isChildAccordion
        removeAnnotation={removeAnnotation}
        index={index}
        isDeleteIcon={true}
        isDefaultOpen={isOpen === "true" ? true : false}
        accordionId={`annotationStep_label--${randomLabel}--${fields.internalId}-${index}`}
        setIsOpenAccordian={setIsOpenAccordianHandler}
      >
        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.Slug_Label",
              TextFieldResource.Slug_Label
            )}`}
            value={slug || ""}
            type="text"
            id={`${TextFieldResource.FieldName_Annotation_Slug}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Annotation_Slug}__${index}`}
            onChangeHandler={onChangeHandler}
            cssClass="col-12"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.Title_Label",
              TextFieldResource.Title_Label
            )}`}
            value={title || ""}
            type="text"
            id={`${TextFieldResource.FieldName_Annotation_Title}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Annotation_Title}__${index}`}
            onChangeHandler={onChangeHandler}
            cssClass="col-12"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.TitleDE_Label",
              TextFieldResource.TitleDE_Label
            )}`}
            value={title_de || ""}
            type="text"
            id={`${TextFieldResource.FieldName_Annotation_TitleDE}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Annotation_TitleDE}__${index}`}
            onChangeHandler={onChangeHandler}
            cssClass="col-12"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Annotation_Description}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Annotation_Description}__${index}`}
            label={`${t(
              "contentTranslator:content.Description_Label",
              TextFieldResource.Description_Label
            )}`}
            value={description || ""}
            cssClass="col-12"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Annotation_DescriptionDE}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Annotation_DescriptionDE}__${index}`}
            label={`${t(
              "contentTranslator:content.DescriptionDE_Label",
              TextFieldResource.DescriptionDE_Label
            )}`}
            value={description_de || ""}
            cssClass="col-12"
          />
        </div>

        {ImageFieldService.getFillAndOutlineMethodHtml(
          fill_methods,
          "fillMethod",
          data,
          index
        )}
        {ImageFieldService.getFillAndOutlineMethodHtml(
          outline_fill_methods,
          "outlineFillMethod",
          data,
          index
        )}

        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.OutlineStrength_Label",
              TextFieldResource.OutlineStrength_Label
            )}`}
            value={outline_strength || ""}
            type="number"
            id={`${TextFieldResource.FieldName_OutlineStrength}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_OutlineStrength}__${index}`}
            onBlurHandler={onBlurHandler}
            onChangeHandler={onChangeHandler}
            showIncreaseDecreaseIndicator={true}
            onIncreaseHandler={(name, value) =>
              onIncreaseHandler(name, value, "changeHandler")
            }
            onDecreaseHandler={(name, value) =>
              onDecreaseHandler(name, value, "changeHandler")
            }
            cssClass="col-4"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={Shape}
            id={`${TextFieldResource.FieldName_Shape}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Shape}__${index}`}
            label={`${t(
              "contentTranslator:content.Shape_Label",
              TextFieldResource.Shape_Label
            )}`}
            value={shape || ""}
            onChangeHandler={onChangeHandler}
            cssClass="col-4"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_DrawOnImage}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_DrawOnImage}__${index}`}
            label={`${t(
              "contentTranslator:content.DrawOnImage_Label",
              TextFieldResource.DrawOnImage_Label
            )}`}
            value={draw_on_image === "true" ? true : false}
            cssClass="col-4 mb-3"
          />
        </div>

        <div className="row mb-3 align-items-center ps-4">
          <div className="textLabelHead ps-0">{`${t(
            "contentTranslator:content.AutoDetectors_Label",
            TextFieldResource.AutoDetectors_Label
          )}`}</div>
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Text}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Text}__${index}`}
            label={`${t(
              "contentTranslator:content.Text_Label",
              TextFieldResource.Text_Label
            )}`}
            value={auto_detectors?.text === "true" ? true : false}
            cssClass="col-2"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Barcode}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Barcode}__${index}`}
            label={`${t(
              "contentTranslator:content.Barcode_Label",
              TextFieldResource.Barcode_Label
            )}`}
            value={auto_detectors?.barcode === "true" ? true : false}
            cssClass="col-2"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Animal}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Animal}__${index}`}
            label={`${t(
              "contentTranslator:content.Animal_Label",
              TextFieldResource.Animal_Label
            )}`}
            value={auto_detectors?.animal === "true" ? true : false}
            cssClass="col-2"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Face}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Face}__${index}`}
            label={`${t(
              "contentTranslator:content.Face_Label",
              TextFieldResource.Face_Label
            )}`}
            value={auto_detectors?.face === "true" ? true : false}
            cssClass="col-2"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Human}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_Human}__${index}`}
            label={`${t(
              "contentTranslator:content.Human_Label",
              TextFieldResource.Human_Label
            )}`}
            value={auto_detectors?.human === "true" ? true : false}
            cssClass="col-2"
          />
        </div>

        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.SortOrder_Label",
              TextFieldResource.SortOrder_Label
            )}`}
            value={sort_order}
            type="number"
            id={`${TextFieldResource.FieldName_SortOrder}_${fields.internalId}-${index}`}
            name={`${TextFieldResource.FieldName_SortOrder}__${index}`}
            onBlurHandler={onBlurHandler}
            onChangeHandler={onChangeHandler}
            showIncreaseDecreaseIndicator={true}
            onIncreaseHandler={(name, value) =>
              onIncreaseHandler(name, value, "changeHandler")
            }
            onDecreaseHandler={(name, value) =>
              onDecreaseHandler(name, value, "changeHandler")
            }
            cssClass="col-4"
          />
        </div>
      </Accordion>
    );
  },

  getAnnotationSteps(data, newIndex) {
    let { t, addNewAnnotation } = data;

    return (
      <>
        <div className="row mb-3 mt-4 align-items-center">
          <div className="col-12">
            <div className="textLabelHead ps-0">{`${t(
              "contentTranslator:content.AnnotationSteps_Label",
              TextFieldResource.AnnotationSteps_Label
            )}`}</div>
          </div>
        </div>
        {ImageFieldService.getMultipleAnnotationHtml(data, newIndex)}
        <div className="row mt-3 mb-3 align-items-center">
          <div className="col-12">
            <button
              className="appendContent float-start"
              onClick={addNewAnnotation}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </>
    );
  },
};

export default ImageFieldService;
