import FormBuilderResource from "../../../resource/FormBuilder.Resource";
import FBService from "../FormBuilder.service";
import NewElementCardConfigService from "./NewElementCardConfig.Service";

export const AddElements = ({ hideAddElementPanel, insertElement }) => {
  const getElementCard = (cards) => {
    return (
      cards &&
      cards.map((card, index) => FBService.getElementCard(card, insertElement))
    );
  };

  const getElementCardTypeContainer = (cards, label, resourceFile) => {
    let fbFormAddElementId =
      label === "Sub_Label_Input"
        ? "fbFormAddElementInput"
        : "fbFormAddElementOutput";

    return (
      <div className="modal-container p-3">
        <div className="row">
          <div className="col">
            <h6 className="textLabelHead text-center fw-bold">
              {FBService.getTranslation(label, resourceFile)}
            </h6>
          </div>
        </div>
        <div
          className="row row-cols-2 row-cols-sm-3 g-newElement"
          id={fbFormAddElementId}
        >
          {getElementCard(cards)}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="">
        <h5 className="text-center mt-1 mb-3">
          {FBService.getTranslation("Add_Label", FormBuilderResource)}
        </h5>

        <div className="">
          {getElementCardTypeContainer(
            NewElementCardConfigService.getInputCardElementConfig(),
            "Sub_Label_Input",
            FormBuilderResource
          )}
          {getElementCardTypeContainer(
            NewElementCardConfigService.getOutputCardElementConfig(),
            "Sub_Label_Output",
            FormBuilderResource
          )}
        </div>
        <button
          className="close-icon--blue"
          onClick={() => hideAddElementPanel()}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
};
