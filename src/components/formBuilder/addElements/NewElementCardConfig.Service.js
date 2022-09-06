import FormBuilderResource from "../../../resource/FormBuilder.Resource";
import FBService from "../FormBuilder.service";

const NewElementCardConfigService = {
  getInputCardElementConfig() {
    let fields = [
      {
        id: "add_element_text_field",
        type: FormBuilderResource.Type_Text_Field,
        title: FBService.getTranslation("Label_Text", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-textfield",
      },
      {
        id: "add_element_checkbox_radio_field",
        type: FormBuilderResource.Radio_Field,
        title: FBService.getTranslation(
          "Label_Single_Multiple_Choice",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-multichoice",
      },
      {
        id: "add_element_dropdown_field",
        type: FormBuilderResource.Dropdown_Field_Type,
        title: FBService.getTranslation(
          "Label_Single_Choice_Dropdown",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-dropdownfield",
      },
      {
        id: "add_element_date_field",
        type: FormBuilderResource.Date_Input,
        title: FBService.getTranslation("Label_Date", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-calendar",
      },
      {
        id: "add_element_url_field",
        type: FormBuilderResource.Url_Input,
        title: FBService.getTranslation("Label_Url", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-link-badge-plus",
      },
      {
        id: "add_element_file_field",
        type: FormBuilderResource.File_Input,
        title: FBService.getTranslation("Label_File", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-doc-badge-plus",
      },
      {
        id: "add_element_confirmation_code",
        type: FormBuilderResource.Confromation_Code_Input,
        title: FBService.getTranslation(
          "Label_Confirmation_Code",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-textfield-checkmark",
      },
      {
        id: "add_element_image_field",
        type: FormBuilderResource.Image_Field_Type,
        title: FBService.getTranslation("Label_Camera", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-cameraoutline",
      },
      {
        id: "add_element_video_recorder",
        type: FormBuilderResource.Video_Field_Type,
        title: FBService.getTranslation(
          "Label_Video_Recorder",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-videooutline",
      },
      {
        id: "add_element_audio_recorder",
        type: FormBuilderResource.AudioRecorder_Field_Type,
        title: FBService.getTranslation(
          "Label_Audio_Recorder",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-mic",
      },
      {
        id: "add_element_geolocation",
        type: FormBuilderResource.Geo_Location_Type,
        title: FBService.getTranslation(
          "Label_Geo_Location",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Input",
          FormBuilderResource
        ),
        icoClass: "ico-location",
      },
    ];

    return fields;
  },

  getOutputCardElementConfig() {
    let fields = [
      {
        id: "add_element_paragraph_field",
        type: FormBuilderResource.Type_Paragraph_Text,
        title: FBService.getTranslation("Label_Paragraph", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Output",
          FormBuilderResource
        ),
        icoClass: "ico-doc-richtext",
      },
      {
        id: "add_element_ruler_field",
        type: FormBuilderResource.Ruler_Field_Type,
        title: FBService.getTranslation("Label_Ruler", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Output",
          FormBuilderResource
        ),
        icoClass: "ico-ruler",
      },
      {
        id: "add_link_elements",
        type: FormBuilderResource.Link_Element_Type,
        title: FBService.getTranslation("Label_Url", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Output",
          FormBuilderResource
        ),
        icoClass: "ico-link",
      },
      {
        id: "add_element_output_video",
        type: FormBuilderResource.Output_Video,
        title: FBService.getTranslation(
          "Label_Video_Player",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Output",
          FormBuilderResource
        ),
        icoClass: "ico-film",
      },
      {
        id: "add_element_output_audio",
        type: FormBuilderResource.Output_Audio_Type,
        title: FBService.getTranslation(
          "Label_Audio_Player",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Output",
          FormBuilderResource
        ),
        icoClass: "ico-waveform",
      },
      {
        id: "add_element_image_output",
        type: FormBuilderResource.Image_Output_Field_Type,
        title: FBService.getTranslation(
          "Label_Image_Viewer",
          FormBuilderResource
        ),
        subTitle: FBService.getTranslation(
          "Sub_Label_Output",
          FormBuilderResource
        ),
        icoClass: "ico-photo-output",
      },
      {
        id: "add_element_file_output",
        type: FormBuilderResource.File_Output_Field_Type,
        title: FBService.getTranslation("Label_File", FormBuilderResource),
        subTitle: FBService.getTranslation(
          "Sub_Label_Output",
          FormBuilderResource
        ),
        icoClass: "ico-doc",
      },
    ];

    return fields;
  },
};

export default NewElementCardConfigService;
