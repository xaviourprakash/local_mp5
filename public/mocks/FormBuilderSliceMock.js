export const mockFormDataActionPayload = {
  name: "FORMNAME",
  form_body: {
    fields: [
      {
        field_options: {
          description: "description",
          break_line: true,
          number_of_columns: 12,
          instructions: "instruction",
          detailed_instruction: "detailed instruction",
          label: "Unnamed Text Field",
          keep_on_previous_page: "",
          minlength: "",
          min_max_length_units: "words",
          maxlength: "",
          units: "",
          html_editor: false,
          rich_text: false,
        },
        type: "text_field",
        is_mandatory: true,
        slug: "tunnamed_textbox",
        is_output: false,
        source: "data",
        group: "input",
        previous_types: {
          output: "text_field",
          input: "text_field",
        },
        regexp: "",
        id: 1,
      },
    ],
  },
};

export const mockUpdatedFormDataResponse = {
  formData: {
    name: "FORMNAME",
    form_body: {
      fields: [
        {
          field_options: {
            description: "description",
            break_line: true,
            number_of_columns: 12,
            instructions: "instruction",
            detailed_instruction: "detailed instruction",
            label: "Unnamed Text Field",
            keep_on_previous_page: "",
            minlength: "",
            min_max_length_units: "words",
            maxlength: "",
            units: "",
            html_editor: false,
            rich_text: false,
          },
          type: "text_field",
          is_mandatory: true,
          slug: "tunnamed_textbox",
          is_output: false,
          source: "data",
          group: "input",
          previous_types: {
            output: "text_field",
            input: "text_field",
          },
          regexp: "",
          id: 1,
        },
      ],
    },
  },
  formModificationStatus: false,
};

export const mockFormDataActionPayload3 = {
  field_options: {
    description: "description",
    break_line: true,
    number_of_columns: 12,
    instructions: "instruction",
    detailed_instruction: "detailed instruction",
    label: "Test Label",
    keep_on_previous_page: true,
    minlength: "",
    min_max_length_units: "words",
    maxlength: "",
    units: "",
    html_editor: false,
    rich_text: false,
  },
  type: "text_field",
  is_mandatory: true,
  slug: "tunnamed_textbox",
  is_output: false,
  source: "data",
  group: "input",
  previous_types: {
    output: "text_field",
    input: "text_field",
  },
  regexp: "",
  id: 1,
};

export const mockUpdatedFormDataResponse3 = {
  formData: {
    name: "FORMNAME",
    form_body: {
      fields: [
        {
          field_options: {
            description: "description",
            break_line: true,
            number_of_columns: 12,
            instructions: "instruction",
            detailed_instruction: "detailed instruction",
            label: "Unnamed Text Field",
            keep_on_previous_page: "",
            minlength: "",
            min_max_length_units: "words",
            maxlength: "",
            units: "",
            html_editor: false,
            rich_text: false,
          },
          type: "text_field",
          is_mandatory: true,
          slug: "tunnamed_textbox",
          is_output: false,
          source: "data",
          group: "input",
          previous_types: {
            output: "text_field",
            input: "text_field",
          },
          regexp: "",
          id: 1,
        },
      ],
    },
  },
  formModificationStatus: false,
};
