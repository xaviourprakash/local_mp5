import Api from "../../api";
import TextboxField from "../formEditor/textboxField/TextboxField";
import DateField from "../formEditor/dateField/DateField";
import UrlField from "../formEditor/urlField/UrlField";
import CheckboxRadioField from "../formEditor/checkboxRadioField/CheckboxRadioField";
import ParagraphText from "../formEditor/paragraphText/ParagraphText";
import FileInput from "../formEditor/fileInput/FileInput";
import Ruler from "../formEditor/ruler/Ruler";
import DropdownField from "../formEditor/dropdownField/DropdownField";
import ImageField from "../formEditor/imageField/ImageField";
import OutputVideo from "../formEditor/outputVideo/OutputVideo";
import ConfirmCode from "../formEditor/confirmCode/ConfirmCode";
import VideoRecorder from "../formEditor/videoRecorder/VideoRecorder";
import LinkOutput from "../formEditor/linkOutput/LinkOutput";
import ImageOutput from "../formEditor/imageOutput/ImageOutput";
import FileOutput from "../formEditor/fileOutput/FileOutput";
import OutputAudio from "../formEditor/outputAudio/OutputAudio";
import AudioRecorder from "../formEditor/audioRecorder/AudioRecorder";
import GeoLocation from "../formEditor/geoLocation/GeoLocation";
import { updateShowNodes } from "../../redux/features/formBuilder/formBuilderSlice";

const FBService = {
  preTop: 0,
  translationText: null,

  setTranslation(t) {
    FBService.translationText = t;
  },

  getTranslation(label, resourceFile) {
    let newLabel = FBService.translationText(
      `contentTranslator:content.${label}`,
      resourceFile[label]
    );

    return newLabel;
  },

  getRandomLabel() {
    return Math.random().toString(36).substring(2);
  },

  getOrderId() {
    return window?.fb_order_id || 926;
  },

  resetDefaultValueByKey(data, key) {
    let updated_field;
    let fields = data?.form_body?.fields || [];
    let updatedFields = fields.map((field, index) => {
      updated_field = {
        ...field,
        [key]: index + 1,
      };

      return { ...updated_field };
    });

    return {
      ...data,
      form_body: {
        fields: [...updatedFields],
      },
    };
  },

  getOrderPreviewBriefing(previewBriefingCallbackHandler) {
    let url = `fb_order/${FBService.getOrderId()}`;
    Api.get(url)
      .then((response) => {
        previewBriefingCallbackHandler(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },

  getDataFieldsDetails(dataFieldsRequestCallbackHandler) {
    let url = `fb_order/${FBService.getOrderId()}/fb_data_pool/fb_data_items`;
    Api.get(url)
      .then((response) => {
        dataFieldsRequestCallbackHandler(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },

  getInitialFormDetails(initialRequestCallbackHandler) {
    let url = `fb_order/${FBService.getOrderId()}/fb_form`;
    Api.get(url)
      .then((response) => {
        initialRequestCallbackHandler(
          FBService.resetDefaultValueByKey(response.data, "internalId")
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },

  getNodesData(dispatch) {
    Api.get(`fb_order/${FBService.getOrderId()}/product/nodes_list`)
      .then((response) => {
        dispatch(updateShowNodes(response.data || []));
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },

  updateFormHandler(data, updateApiStatusHandler) {
    let updatedData = FBService.resetDefaultValueByKey(data, "id");
    let url = `fb_order/${FBService.getOrderId()}/fb_form`;
    let form_body = JSON.stringify(updatedData.form_body);
    let formData = new FormData();
    formData.append(`form[name]`, updatedData.name);
    formData.append(`form[form_body]`, form_body);

    Api.put(url, formData)
      .then((response) => {
        console.log("Success!");
        const statusObj = {
          request_Status: "Label_AutoSave",
          request_Label_IconClass: "fa-solid fa-floppy-disk",
        };
        updateApiStatusHandler(statusObj);
      })
      .catch((error) => {
        const statusObj = {
          request_Status: "Label_SavingFailed",
          request_Label_IconClass:
            "fa-solid fa-triangle-exclamation text-danger",
        };
        updateApiStatusHandler(statusObj);
        console.error("There was an error!", error);
      });
  },

  fileUploadRequestHandler(event, slug, fileUploadCallbackHandler) {
    event.preventDefault();
    let file = event.target.files[0];
    let url = `fb_order/${FBService.getOrderId()}/fb_form/fb_assets`;
    let formData = new FormData();
    formData.append(`fb_asset[file]`, file);
    formData.append(`fb_asset[name]`, file.name);
    formData.append(`fb_asset[slug]`, slug);

    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    Api.post(url, formData, config)
      .then((response) => {
        console.log("Success!");
        fileUploadCallbackHandler({
          name: event?.target?.files[0]?.name,
          id: response?.data?.asset?.id,
          url: response?.data?.url,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },

  getFormattedDataField(data) {
    let dataFields = [];

    for (const [key, value] of Object.entries(data)) {
      dataFields.push({
        label: value,
        value: key,
        selectedValue: "{{" + key + "}}",
      });
    }

    return dataFields;
  },

  getSlugLabel(label) {
    let slug = label ? label.trim().toLowerCase().replace(/\W+/g, "_") : "";
    let slug_label = "s" + Math.random().toString(36).substring(8) + "_" + slug;

    return slug_label;
  },

  handleMouseMove(e, currentId, popoverId) {
    e.persist();

    let innerDiv = document.getElementById(popoverId);
    let rec = document.getElementById(currentId).getBoundingClientRect();
    let top = rec.top + window.scrollY + 20;
    let currentTop = e.clientY > top ? e.clientY - top : 0;

    if (
      currentTop - 20 > FBService.preTop ||
      currentTop + 20 < FBService.preTop
    ) {
      FBService.preTop = currentTop;
      innerDiv.style.top = currentTop + "px";
    }
  },

  getElementComponent(elementType) {
    switch (elementType) {
      case "text_field":
      case "text_area":
        return TextboxField;
      case "check_box":
      case "radio_button":
        return CheckboxRadioField;
      case "drop_box":
        return DropdownField;
      case "image":
        return ImageField;
      case "date":
        return DateField;
      case "url":
        return UrlField;
      case "output_horizontal_ruller":
        return Ruler;
      case "output_paragraph":
        return ParagraphText;
      case "file":
        return FileInput;
      case "output_video":
        return OutputVideo;
      case "confirmation_code":
        return ConfirmCode;
      case "output_img":
        return ImageOutput;
      case "output_file":
        return FileOutput;
      case "output_link":
        return LinkOutput;
      case "video_recorder":
        return VideoRecorder;
      case "output_audio":
        return OutputAudio;
      case "geolocation":
        return GeoLocation;
      case "audio_recorder":
        return AudioRecorder;
      default:
        break;
    }
  },

  getElementHtml(
    element,
    removeElement,
    duplicateElement,
    dataFields,
    nodesData
  ) {
    let Component = FBService.getElementComponent(element.type);

    return Component ? (
      <div
        className="MB5__formField list-group-item"
        key={`formField-element-${element.internalId}`}
      >
        <Component
          element={element}
          removeElement={removeElement}
          duplicateElement={duplicateElement}
          dataFields={dataFields}
          nodesData={nodesData}
        />
      </div>
    ) : (
      ""
    );
  },

  getElementCard(card, insertElement) {
    return (
      <div
        className="col-auto list-group-item remove-clone-form-element"
        key={card.type}
        id={card.id}
        name={card.id}
      >
        <div
          className="card MP5_FormbuilderAddElement"
          onDoubleClick={() => insertElement(card.type)}
        >
          <i className={`mp5-icons ${card.icoClass} my-2 fa-2x`}>
            {card.icoClass === "ico-multichoice" && (
              <>
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
              </>
            )}
          </i>
          <div className="card-body">
            <div className="card-titles-container">
              <p className="card-sub-title">{card.subTitle}</p>
              <p className="card-title">{card.title}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export default FBService;
