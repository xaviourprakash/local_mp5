import { RegexOptions } from "../../constants/TextFiledConstants";
import TextFieldResource from "../../resource/TextField.Resource";

const FormEditorService = {
  findTypeofRegex(regexp) {
    let selectedRegexType = RegexOptions.filter(
      (item) => item.regexValue === regexp
    );
    if (selectedRegexType?.length === 0 || regexp === "")
      return RegexOptions[0]?.value;
    return selectedRegexType[0]?.value;
  },

  getRegexOptionData(fields, selectedOption) {
    let selectedRegexType = RegexOptions.filter(
      (item) => item.value === selectedOption
    );
    let { field_options, ...rest } = fields;
    let updated_rest = { ...rest, regexp: selectedRegexType[0].regexValue };
    let updatedFields = { ...fields, ...updated_rest };

    return updatedFields;
  },

  setMultilineOption(fields, value) {
    let selectedElementType = value ? "text_area" : "text_field";
    let fieldOptions = { ...fields.field_options };
    let previousTypes = { ...fields.previous_types };
    let updated_fields = {
      ...fields,
      type: selectedElementType,
      regexp: "",
      field_options: {
        ...fieldOptions,
        units: "",
        html_editor: false,
        rich_text: false,
      },
      previous_types: {
        ...previousTypes,
        output: selectedElementType,
        input: selectedElementType,
      },
    };

    return { ...updated_fields };
  },

  setAllowMultipleAnswers(fields, value) {
    let selectedElementType = value ? "check_box" : "radio_button";
    let fieldOptions = { ...fields.field_options };
    let previousTypes = { ...fields.previous_types };
    let options = FormEditorService.cleanMultiChoiceOptions([
      ...fieldOptions.options,
    ]);
    let updated_fields = {
      ...fields,
      type: selectedElementType,
      field_options: {
        ...fieldOptions,
        options: [...options],
      },
      previous_types: {
        ...previousTypes,
        output: selectedElementType,
        input: selectedElementType,
      },
    };

    return { ...updated_fields };
  },

  getCurrentChoiceIndex(name) {
    let elementIndex = name.split("-");
    let currentIndex = elementIndex[elementIndex.length - 1];

    return currentIndex;
  },

  getFieldDetails(name) {
    let elementIndex = name.split("__");
    let fieldName = elementIndex[0];
    let currentIndex = elementIndex[elementIndex.length - 1];

    return { fieldName, currentIndex };
  },

  cleanMultiChoiceOptions(options) {
    let updatedOptions = options.map((option) => {
      return { ...option, checked: false };
    });

    return updatedOptions;
  },

  resetOptions(fields) {
    let fieldOptions = { ...fields.field_options };
    let updatedOptions = fieldOptions.options.map((option) => {
      return { ...option, checked: false };
    });

    let updated_fields = {
      ...fields,
      field_options: {
        ...fieldOptions,
        options: [...updatedOptions],
      },
    };

    return updated_fields;
  },

  updateMultiChoiceOptions(options, currentIndex, value, type, fieldType) {
    let fieldValue =
      fieldType === "annotationSteps" && typeof value === "boolean"
        ? value === true
          ? "true"
          : "false"
        : value;

    let updatedOptions = options.map((option, index) => {
      if (index === parseInt(currentIndex)) {
        return { ...option, [type]: fieldValue };
      }

      return option;
    });

    return updatedOptions;
  },

  updateMultiChoiceHandler(fields, name, value, type) {
    let currentIndex = FormEditorService.getCurrentChoiceIndex(name);
    let fieldOptions = { ...fields.field_options };
    let options = FormEditorService.updateMultiChoiceOptions(
      fieldOptions.options,
      currentIndex,
      value,
      type
    );
    let updated_fields = {
      ...fields,
      field_options: {
        ...fieldOptions,
        options: [...options],
      },
    };

    return updated_fields;
  },

  updateAddRemoveChoiceHandler(fields, isAdd, currentIndex) {
    let fieldOptions = { ...fields.field_options };
    let options = [...fieldOptions.options];

    if (isAdd) {
      options.push({ label: "", checked: false });
    } else {
      options = options.filter((field, index) => {
        return index !== parseInt(currentIndex);
      });
    }

    let updated_fields = {
      ...fields,
      field_options: {
        ...fieldOptions,
        options: [...options],
      },
    };

    return updated_fields;
  },

  getUpdatedValue(value, name) {
    let { fieldName } = FormEditorService.getFieldDetails(name);

    switch (fieldName) {
      case TextFieldResource.FieldName_NumberOfImages:
        return value <= 1 && value !== "" ? 2 : value;
      case TextFieldResource.FieldName_DelayInShot:
        return value < 500 && value !== "" ? 500 : value;
      default:
        return value;
    }
  },

  onDecreaseHandler(value, name) {
    let newValue = parseInt(value) || 0;

    if (newValue > 0) {
      newValue = parseInt(value) - 1;
    }

    newValue = FormEditorService.getUpdatedValue(newValue, name);

    return newValue.toString();
  },

  onIncreaseHandler(value, name) {
    let newValue = parseInt(value) || 0;
    newValue = parseInt(newValue) + 1;
    newValue = FormEditorService.getUpdatedValue(newValue, name);

    return newValue.toString();
  },

  checkInternalNameValidation(val) {
    return val.replace(/[^A-Za-z0-9\_]/gi, "").toLowerCase();
  },

  isValidDataField(value, dataFields) {
    let selectedDataField = dataFields.filter(
      (item) => item.selectedValue === value
    );

    return !!selectedDataField.length;
  },
};

export default FormEditorService;
