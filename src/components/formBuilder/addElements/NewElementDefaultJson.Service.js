import FBService from "../FormBuilder.service";
import FormBuilderResource from "../../../resource/FormBuilder.Resource";

const NewElementDefaultJsonService = {
  getFormElement(elementType, counter, t) {
    let newId = counter + 1;

    switch (elementType) {
      case "add_element_text_field":
      case "text_area":
      case "text_field":
        return {
          field_options: {
            description: "",
            break_line: true,
            number_of_columns: 12,
            instructions: "",
            detailed_instruction: "",
            label: FBService.getTranslation(
              "Label_Unnamed_Text_Field",
              FormBuilderResource
            ),
            keep_on_previous_page: "false",
            minlength: "",
            min_max_length_units: "words",
            maxlength: "",
            units: "",
            html_editor: false,
            rich_text: false,
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "text_field",
          is_mandatory: false,
          slug: FBService.getSlugLabel(
            FBService.getTranslation(
              "Label_Unnamed_Text_Field",
              FormBuilderResource
            )
          ),
          is_output: false,
          source: "data",
          group: "input",
          previous_types: {
            output: "text_field",
            input: "text_field",
          },
          regexp: "",
          id: null,
          internalId: newId,
        };
      case "add_element_checkbox_radio_field":
      case "radio_button":
      case "check_box":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            description: "",
            instructions: "",
            detailed_instruction: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
            options: [
              {
                label: "",
                checked: false,
              },
              {
                label: "",
                checked: false,
              },
            ],
            label: `${t(
              "contentTranslator:content.Unnamed_Selection",
              "Unnamed Selection"
            )}`,
            include_other_option: "false",
            keep_on_previous_page: "false",
          },
          type: "radio_button",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            `${t(
              "contentTranslator:content.Unnamed_Selection",
              "Unnamed Selection"
            )}`
          ),
          previous_types: {
            output: "radio_button",
            input: "radio_button",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_dropdown_field":
      case "drop_box":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            description: "",
            instructions: "",
            detailed_instruction: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
            options: [
              {
                label: "",
                checked: false,
              },
              {
                label: "",
                checked: false,
              },
            ],
            label: `${t(
              "contentTranslator:content.Unnamed_Dropdown",
              "Unnamed Dropdown"
            )}`,
            include_other_option: "false",
            keep_on_previous_page: "false",
          },
          type: "drop_box",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            `${t(
              "contentTranslator:content.Unnamed_Dropdown",
              "Unnamed Dropdown"
            )}`
          ),
          previous_types: {
            output: "drop_box",
            input: "drop_box",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_date_field":
      case "date":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            label: `${t(
              "contentTranslator:content.Date_Label",
              "Unnamed Date Input"
            )}`,
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "date",
          slug: FBService.getSlugLabel(
            `${t("contentTranslator:content.Date_Label", "Unnamed Date Input")}`
          ),
          is_output: false,
          source: "data",
          group: "input",
          previous_types: {
            output: "date",
            input: "date",
          },
          id: null,
          internalId: newId,
        };
      case "output_paragraph":
      case "add_element_paragraph_field":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            output_paragraph_description: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "output_paragraph",
          is_mandatory: false,
          is_output: true,
          source: "data",
          group: "non_input",
          slug: FBService.getSlugLabel("Unnamed paragraph"),
          previous_types: {
            output: "output_paragraph",
            input: "output_paragraph",
          },
          id: null,
          internalId: newId,
        };
      case "output_horizontal_ruller":
      case "add_element_ruler_field":
        return {
          field_options: {
            starts_chapter: "false",
            starts_group: "false",
            group_background_image_url: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "output_horizontal_ruller",
          is_mandatory: false,
          is_output: true,
          source: "data",
          group: "non_input",
          slug: FBService.getSlugLabel("Unnamed Ruler"),
          previous_types: {
            output: "output_horizontal_ruller",
            input: "output_horizontal_ruller",
          },
          id: null,
          internalId: newId,
        };
      case "image":
      case "add_element_image_field":
        return {
          field_options: {
            description: "",
            break_line: true,
            number_of_columns: 12,
            instructions: "",
            detailed_instruction: "",
            include_depth_information: false,
            label: FBService.getTranslation(
              "Label_Unnamed_Camera_Input",
              FormBuilderResource
            ),
            min: "",
            max: "",
            keep_on_previous_page: "false",
            live_photo: "false",
            detect_faces: "false",
            camera: "",
            camera_orientation: "",
            image_shot_mode: "",
            number_of_images_in_shot: "",
            delay_in_shot: "",
            image_camera_lens: "",
            minimum_resolution: "",
            flash: "",
            source: "",
            image_raw_format: "",
            annotation_steps: [],
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "image",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            FBService.getTranslation(
              "Label_Unnamed_Camera_Input",
              FormBuilderResource
            )
          ),
          previous_types: {
            output: "image",
            input: "image",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_url_field":
      case "url":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            url_clickworker_id_include_disable: "false",
            label: `${t(
              "contentTranslator:content.Url_Label",
              "Unnamed Url Input"
            )}`,
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "url",
          slug: FBService.getSlugLabel(
            `${t("contentTranslator:content.Url_Label", "Unnamed Url Input")}`
          ),
          is_output: false,
          source: "data",
          group: "input",
          previous_types: {
            output: "url",
            input: "url",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_file_field":
      case "file":
        return {
          field_options: {
            description: "",
            break_line: true,
            number_of_columns: 12,
            instructions: "",
            detailed_instruction: "",
            label: `${t(
              "contentTranslator:content.File_Label",
              "Unnamed File Input"
            )}`,
            min: "",
            detect_faces: "false",
            max: "",
            must_be_consumed: "false",
            file_extensions: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "file",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            `${t("contentTranslator:content.File_Label", "Unnamed File Input")}`
          ),
          previous_types: {
            output: "file",
            input: "file",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_output_video":
      case "output_video":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            label: "",
            video_link: "",
            must_be_consumed: "false",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "output_video",
          is_output: false,
          source: "data",
          group: "non_input",
          slug: FBService.getSlugLabel("Unnamed videoOutput"),
          previous_types: {
            output: "output_video",
            input: "output_video",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_confirmation_code":
      case "confirmation_code":
        return {
          field_options: {
            description: "",
            break_line: true,
            number_of_columns: 12,
            instructions: "",
            detailed_instruction: "",
            confirmation_type: "",
            label: `${t(
              "contentTranslator:content.Confirmation_Title",
              "Unnamed Confirmation Code Input"
            )}`,
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "confirmation_code",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            `${t(
              "contentTranslator:content.Confirmation_Title",
              "Unnamed Confirmation Code Input"
            )}`
          ),
          previous_types: {
            output: "confirmation_code",
            input: "confirmation_code",
          },
          id: null,
          internalId: newId,
        };
      case "add_link_elements":
      case "output_link":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            link_text: "",
            must_be_consumed: "false",
            link: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "output_link",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "non_input",
          slug: FBService.getSlugLabel("Unnamed link"),
          previous_types: {
            output: "output_link",
            input: "output_link",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_output_audio":
      case "output_audio":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            label: "",
            keep_on_previous_page: true,
            must_be_consumed: true,
            audio_link: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "output_audio",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "non_input",
          slug: FBService.getSlugLabel("Unnamed audioOutput"),
          previous_types: {
            output: "output_audio",
            input: "output_audio",
          },
          id: null,
          internalId: newId,
        };
      case "video_recorder":
      case "add_element_video_recorder":
        return {
          field_options: {
            description: "",
            break_line: true,
            number_of_columns: 12,
            instructions: "",
            detailed_instruction: "",
            label: `${t(
              "contentTranslator:content.Unnamed_Video_Label",
              "Unnamed Video Recorder"
            )}`,
            auto_play_sequence: "false",
            video_without_sound: "false",
            min: "",
            max: "",
            minlength: "",
            maxlength: "",
            min_max_length_units: "words",
            keep_on_previous_page: "false",
            camera: "",
            camera_orientation: "",
            minimum_resolution: "",
            flash: "",
            source: "",
            audio_guide_url: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "video_recorder",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            `${t(
              "contentTranslator:content.Unnamed_Video_Label",
              "Unnamed Video Recorder"
            )}`
          ),
          previous_types: {
            output: "video_recorder",
            input: "video_recorder",
          },
          id: null,
          internalId: newId,
        };
      case "output_img":
      case "add_element_image_output":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            image_url: "",
            image_id: "",
            width: "",
            height: "",
            image_text: "",
            uploaded_file_name: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "output_img",
          is_mandatory: false,
          is_output: true,
          source: "data",
          group: "non_input",
          slug: FBService.getSlugLabel("Unnamed image output"),
          previous_types: {
            output: "output_img",
            input: "output_img",
          },
          id: null,
          internalId: newId,
        };
      case "output_file":
      case "add_element_file_output":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            file_url: "",
            file_id: "",
            file_name: "",
            uploaded_file_name: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "output_file",
          is_mandatory: false,
          is_output: true,
          source: "data",
          group: "non_input",
          slug: FBService.getSlugLabel("Unnamed file output"),
          previous_types: {
            output: "output_file",
            input: "output_file",
          },
          id: null,
          internalId: newId,
        };
      case "add_element_geolocation":
      case "geolocation":
        return {
          field_options: {
            break_line: true,
            number_of_columns: 12,
            label: FBService.getTranslation(
              "Label_Unnamed_Geo_Location_Input",
              FormBuilderResource
            ),
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "geolocation",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            FBService.getTranslation(
              "Label_Unnamed_Geo_Location_Input",
              FormBuilderResource
            )
          ),
          previous_types: {
            output: "geolocation",
            input: "geolocation",
          },
          id: null,
          internalId: newId,
        };
      case "audio_recorder":
      case "add_element_audio_recorder":
        return {
          field_options: {
            description: "",
            break_line: true,
            number_of_columns: 12,
            instructions: "",
            detailed_instruction: "",
            label: `${t(
              "contentTranslator:content.Unnamed_Audio_Label",
              "Unnamed Audio Recorder"
            )}`,
            auto_play_sequence: "false",
            min: "",
            max: "",
            minlength: "",
            maxlength: "",
            min_max_length_units: "words",
            keep_on_previous_page: "false",
            audioformat: "",
            check_background_noise: "false",
            max_background_noise: "",
            show_in_nodes: {
              mp_df_mobile_validate: "true",
              mp_df_mobile_edit: "true",
              mp_df_mobile_create: "true",
            },
          },
          type: "audio_recorder",
          is_mandatory: false,
          is_output: false,
          source: "data",
          group: "input",
          slug: FBService.getSlugLabel(
            `${t(
              "contentTranslator:content.Unnamed_Audio_Label",
              "Unnamed Audio Recorder"
            )}`
          ),
          previous_types: {
            output: "audio_recorder",
            input: "audio_recorder",
          },
          id: null,
          internalId: newId,
        };
      default:
        return null;
    }
  },
};

export default NewElementDefaultJsonService;
