import React, { useState, useEffect } from "react";
import { NavTabs } from "../navTabs/NavTabs";
import { AddElements } from "./addElements/AddElements";
import FBService from "./FormBuilder.service";
import { useSelector, useDispatch } from "react-redux";
import {
  updateFormData,
  updateFormFields,
  updateFormModificationStatus,
  updateFormDataFields,
  updatePreviewBriefing,
} from "../../redux/features/formBuilder/formBuilderSlice";
import Sortable from "sortablejs";
import { useTranslation } from "react-i18next";
import NewElementDefaultJsonService from "./addElements/NewElementDefaultJson.Service";
import { Modal } from "bootstrap";
import { AddModal } from "../common";
import { FormPreview } from "../formPreview/FormPreview";
import FormBuilderResource from "../../resource/FormBuilder.Resource";

export const FormBuilder = () => {
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const formData = useSelector((state) => state.formBuilder.formData);
  const formModificationStatus = useSelector(
    (state) => state.formBuilder.formModificationStatus
  );
  const formDataField = useSelector(
    (state) => state.formBuilder.upload_data_array
  );
  const nodesData = useSelector((state) => state.formBuilder.showNodes);
  const dispatch = useDispatch();
  const [showAddIcon, setShowAddIcon] = useState(true);
  const [idCounter, setIdCounter] = useState(0);
  const [oldIndex, setOldIndex] = useState();
  const [newIndex, setNewIndex] = useState();
  const [cloneEvent, setCloneEvent] = useState();
  const [isDragged, setIsDragged] = useState(false);

  const [apiStatus, setApiStatus] = useState({
    request_Status: "Label_AutoSave",
    request_Label_IconClass: "fa-solid fa-floppy-disk",
  });
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setApiStatus({
      request_Status: "Label_AutoSave",
      request_Label_IconClass: "fa-solid fa-floppy-disk mp5-saving-icons",
    });
    dispatch(updateFormModificationStatus(true));
  }, [formData]);

  useEffect(() => {
    if (
      apiStatus.request_Status === "Label_SavingFailed" ||
      apiStatus.request_Status === "Label_NoInternetConnection"
    ) {
      dispatch(updateFormModificationStatus(true));
    }
  }, [apiStatus]);

  useEffect(() => {
    FBService.getInitialFormDetails(initialRequestCallbackHandler);
    FBService.getDataFieldsDetails(dataFieldsRequestCallbackHandler);
    FBService.getOrderPreviewBriefing(previewBriefingCallbackHandler);
    FBService.getNodesData(dispatch);
    let fbFormElement = document.getElementById("fbFormElement");
    new Sortable(fbFormElement, {
      group: "shared",
      animation: 150,
      ghostClass: "background-class",
      handle: ".fb-draggable-area",
      onEnd: function (evt) {
        setOldIndex(evt.oldIndex);
        setNewIndex(evt.newIndex);
        setIsDragged(true);
      },
    });
  }, []);

  useEffect(() => {
    if (!showAddIcon) {
      let fbFormAddElementInput = document.getElementById(
        "fbFormAddElementInput"
      );
      let fbFormAddElementOutput = document.getElementById(
        "fbFormAddElementOutput"
      );
      createSortableInstance(fbFormAddElementInput);
      createSortableInstance(fbFormAddElementOutput);
    }
  }, [showAddIcon]);

  useEffect(() => {
    isDragged && dragEndHandler();
  }, [isDragged]);

  useEffect(() => {
    cloneEvent && addNewCloneElementToForm(cloneEvent);
  }, [cloneEvent]);

  useEffect(() => {
    const interval = setInterval(() => saveFormHandler(), 5000);
    return () => clearInterval(interval);
  }, [formModificationStatus]);

  useEffect(() => {
    setModal(
      new Modal(`#${FormBuilderResource.Modal_Id_Order_Form_Preview}`, {
        backdrop: "static",
        keyboard: false,
      })
    );
  }, []);

  const showModal = () => {
    modal.show();
  };

  const hideModal = () => {
    modal.hide();
  };

  const renderModelPopup = () => {
    return (
      <AddModal
        hideModal={hideModal}
        modalTitle={`${t(
          `contentTranslator:content.Label_Form_Preview`,
          FormBuilderResource.Label_Form_Preview
        )}`}
        modalId={FormBuilderResource.Modal_Id_Order_Form_Preview}
        isHideFooter={true}
      >
        <FormPreview cssClass="row g-0" />
      </AddModal>
    );
  };

  const initialRequestCallbackHandler = (data) => {
    let fields = data && data.form_body && data.form_body.fields;
    let lastCounter =
      fields && Math.max(...fields.map((field) => field.internalId), 0);

    dispatch(updateFormData(data));
    setIdCounter(lastCounter || 0);
  };

  const dataFieldsRequestCallbackHandler = (data) => {
    dispatch(updateFormDataFields(data));
  };

  const previewBriefingCallbackHandler = (data) => {
    dispatch(updatePreviewBriefing(data));
  };

  const addNewCloneElementToForm = (event) => {
    let addElementId = event.item.id || event.item?.attributes?.name?.value;
    let newCloneElementIndex = event.newIndex;

    if (addElementId) {
      let removeCloneFormHtml = document.querySelectorAll(
        ".MB5__formContainer .remove-clone-form-element"
      );
      let newElement = NewElementDefaultJsonService.getFormElement(
        addElementId,
        idCounter,
        t
      );
      let formFields = formData.form_body.fields;
      let cloneListItems = [...formFields];

      if (!!removeCloneFormHtml.length) {
        removeCloneFormHtml[0].remove();
        setIdCounter(idCounter + 1);
        cloneListItems.splice(newCloneElementIndex, 0, newElement);
        dispatch(updateFormFields(cloneListItems));
        dispatch(updateFormModificationStatus(true));
      }
    }

    setCloneEvent(null);
    event.clone.replaceWith(event.item);
  };

  const createSortableInstance = (id) => {
    new Sortable(id, {
      group: {
        name: "shared",
        put: false,
        pull: "clone",
      },
      animation: 150,
      sort: false,
      fallbackTolerance: 0,
      onEnd: function (event) {
        setCloneEvent(event);
      },
    });
  };

  const showAddElementPanel = () => {
    setShowAddIcon(false);
  };

  const hideAddElementPanel = () => {
    setShowAddIcon(true);
  };

  const insertElement = (selectedElement) => {
    let newElement = NewElementDefaultJsonService.getFormElement(
      selectedElement,
      idCounter,
      t
    );
    let formFields = formData.form_body.fields;
    let fields = [...formFields, newElement];

    setIdCounter(idCounter + 1);
    dispatch(updateFormFields(fields));
    dispatch(updateFormModificationStatus(false));
  };

  const removeElement = (elementId) => {
    let formFields = formData.form_body.fields;
    let restFields = formFields.filter((field) => {
      return field.internalId !== elementId;
    });
    let fields = [...restFields];

    dispatch(updateFormFields(fields));
    dispatch(updateFormModificationStatus(false));
  };

  const duplicateElement = (elementId) => {
    let startIndex;
    let formFields = [...formData.form_body.fields];
    let cloneElement = formFields.filter((field, index) => {
      if (field.internalId === elementId) startIndex = index + 1;

      return field.internalId === elementId;
    })[0];
    let newElementId = idCounter + 1;
    let newElementSlug = FBService.getSlugLabel(
      cloneElement.field_options.label
    );
    let newElement = {
      ...cloneElement,
      slug: newElementSlug,
      id: null,
      internalId: newElementId,
    };

    formFields.splice(startIndex, 0, newElement);
    setIdCounter(newElementId);
    dispatch(updateFormFields(formFields));
    dispatch(updateFormModificationStatus(false));
  };

  const dragEndHandler = () => {
    let formFields = formData.form_body.fields;
    let copyListItems = [...formFields];
    let dragItemContent = copyListItems[oldIndex];

    copyListItems.splice(oldIndex, 1);
    copyListItems.splice(newIndex, 0, dragItemContent);
    setNewIndex(null);
    setOldIndex(null);
    setIsDragged(false);
    dispatch(updateFormFields(copyListItems));
    dispatch(updateFormModificationStatus(false));
  };

  const saveFormHandler = () => {
    if (formModificationStatus && !!formData?.name) {
      setApiStatus({
        request_Status: "Label_Saving",
        request_Label_IconClass: "fa-solid fa-floppy-disk mp5-saving-icons",
      });
      FBService.updateFormHandler(formData, updateApiStatusHandler);
      dispatch(updateFormModificationStatus(false));
    }
  };

  const updateApiStatusHandler = (obj) => {
    if (!window.navigator.onLine) {
      const statusObj = {
        request_Label_IconClass: "fa-solid fa-triangle-exclamation text-danger",
        request_Status: "Label_NoInternetConnection",
      };
      setApiStatus(statusObj);
    } else {
      setApiStatus(obj);
    }
  };

  const renderAddElementContainer = () => {
    return (
      <div className="col-auto MP5__addElement__container fade show active">
        <AddElements
          hideAddElementPanel={hideAddElementPanel}
          insertElement={insertElement}
        />
      </div>
    );
  };

  const renderFormContainer = () => {
    let sidePanelOpenClass = !showAddIcon ? "side-panel-open" : "";
    let fields = formData && formData.form_body && formData.form_body.fields;
    let dataFields = FBService.getFormattedDataField({
      ...formDataField.upload_data_array,
    });
    return (
      <div className={`MB5__formContainer col ${sidePanelOpenClass}`}>
        <form className="MB5__form list-group h-100" id="fbFormElement">
          {fields &&
            fields.map((element) =>
              FBService.getElementHtml(
                element,
                removeElement,
                duplicateElement,
                dataFields,
                nodesData
              )
            )}
        </form>
      </div>
    );
  };

  const callAPIOnUserClick = () => {
    setApiStatus({
      request_Status: "Label_Saving",
      request_Label_IconClass: "fa-solid fa-floppy-disk mp5-saving-icons",
    });
    FBService.updateFormHandler(formData, updateApiStatusHandler);
  };
  return (
    <div>
      <NavTabs
        apiStatus={apiStatus}
        updateFormBuilderStatus={() => callAPIOnUserClick()}
        showModal={showModal}
      />
      {renderModelPopup()}
      <div className="container-fluid">
        <div className="row">
          {renderFormContainer()}
          {!showAddIcon && renderAddElementContainer()}
        </div>
      </div>
      {showAddIcon && (
        <button
          className="add-icon--blue"
          onClick={() => showAddElementPanel()}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
    </div>
  );
};
