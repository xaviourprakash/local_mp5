import { LayoutOptions } from "../../constants/TextFiledConstants";
import FBService from "../formBuilder/FormBuilder.service";
import TextFieldResource from "../../resource/TextField.Resource";
import {
  TextInput,
  TextArea,
  CheckBox,
  SelectDropDown,
  Accordion,
} from "../common";

const CommonHtmlTemplate = {
  getAnswersHtml(data, addNewMultiChoice, t) {
    return (
      <>
        <div className="row mb-3 align-items-center">
          <div className="col-12">
            <div className="textLabelHead ps-0">{`${t(
              "contentTranslator:content.Options_Label",
              TextFieldResource.Options_Label
            )}`}</div>
          </div>
        </div>
        {CommonHtmlTemplate.getMultipleChoiceHtml(data)}
        <div className="row mb-3 align-items-center">
          <div className="col-12">
            <button className="appendContent" onClick={addNewMultiChoice}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </>
    );
  },

  getMultipleChoiceHtml(data) {
    let { fields } = data;
    let options = fields?.field_options?.options;
    let isShowTextareaGroup = !!options && options.length > 1;

    return (
      options &&
      options.map((option, index) =>
        CommonHtmlTemplate.getChoiceHtml(
          option,
          index,
          data,
          isShowTextareaGroup
        )
      )
    );
  },

  getChoiceHtml(option, index, data, isShowTextareaGroup) {
    let {
      fields,
      isAllowMultipleAnswers,
      onRadioChange,
      onCheckboxChange,
      onChangeOptionHandler,
      removeMultiChoice,
      t,
    } = data;

    return (
      <div
        className="row mb-3 align-items-center"
        key={`multiple-choice--${fields.internalId}-${index}`}
      >
        <div className="col-12">
          <div className="row align-items-center g-3">
            <div className="col-auto pb-3">
              {!isAllowMultipleAnswers && (
                <input
                  className="form-check-input"
                  type="radio"
                  id={`flexRadioDefault--${fields.internalId}-${index}`}
                  checked={option.checked}
                  onClick={onRadioChange}
                  onChange={() => {
                    return;
                  }}
                />
              )}
              {isAllowMultipleAnswers && (
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={option.checked}
                  id={`flexRadioDefault--${fields.internalId}-${index}`}
                  onChange={onCheckboxChange}
                />
              )}
            </div>
            <div className="col">
              <label className="form-check-label w-100">
                <TextArea
                  removeMultiChoice={removeMultiChoice}
                  onChangeHandler={onChangeOptionHandler}
                  id={`${TextFieldResource.FieldName_Option}--${fields.internalId}-${index}`}
                  name={`${TextFieldResource.FieldName_Option}--${fields.internalId}-${index}`}
                  value={option.label}
                  isDisableEnterKey={true}
                  isShowTextareaGroup={isShowTextareaGroup}
                  placeholder={`${t(
                    "contentTranslator:content.MultiChoice_Options_Placeholder",
                    TextFieldResource.MultiChoice_Options_Placeholder
                  )}`}
                  cssClass="col-12"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  },

  getBasicDetails(data) {
    let { fields, onChangeHandler, t, dataFields } = data;

    return (
      <>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Label}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Label}
            label={`${t(
              "contentTranslator:content.title",
              TextFieldResource.Title
            )}`}
            value={fields?.field_options?.label}
            isDisableEnterKey={true}
            cssClass="col-12"
            dataFields={dataFields}
          />
        </div>

        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_IsMandatory}_${fields.internalId}`}
            name={TextFieldResource.FieldName_IsMandatory}
            label={`${t(
              "contentTranslator:content.manditory",
              TextFieldResource.Mandatory
            )}`}
            value={fields?.is_mandatory}
            cssClass="col-6"
          />
        </div>
      </>
    );
  },

  getInstructionsForClickworker(data) {
    let { fields, onChangeHandler, t, dataFields } = data;

    return (
      <Accordion
        type={`${t(
          `contentTranslator:content.EnterInstructionsForClickworker`,
          TextFieldResource.EnterInstructionsForClickworker
        )}`}
        isChildAccordion
        cssClass="mp5__configTextField__clickworker-instruction"
        accordionId={`instructionsForClickworker-${fields.internalId}`}
      >
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Description}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Description}
            label={`${t(
              "contentTranslator:content.description",
              TextFieldResource.Description
            )}`}
            value={fields?.field_options?.description}
            placeholder={TextFieldResource.Description}
            cssClass="col-12"
            dataFields={dataFields}
          />
        </div>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_Instructions}_${fields.internalId}`}
            name={TextFieldResource.FieldName_Instructions}
            label={`${t(
              "contentTranslator:content.instruction",
              TextFieldResource.Instructions
            )}`}
            value={fields?.field_options?.instructions}
            placeholder={TextFieldResource.Instructions}
            cssClass="col-12"
            dataFields={dataFields}
          />
        </div>
        <div className="row mb-3 align-items-center">
          <TextArea
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_DetailedInstruction}_${fields.internalId}`}
            name={TextFieldResource.FieldName_DetailedInstruction}
            label={`${t(
              "contentTranslator:content.detailedInstruction",
              TextFieldResource.DetailedInstructions
            )}`}
            value={fields?.field_options?.detailed_instruction}
            placeholder={TextFieldResource.DetailedInstructions}
            cssClass="col-12"
            dataFields={dataFields}
          />
        </div>
      </Accordion>
    );
  },

  getAdvancedFunctionsLayout(data) {
    let { fields, onChangeHandler, t, nodesData } = data;
    return (
      <Accordion
        type={`${t(
          `contentTranslator:content.AdvancedFunctionsLayout`,
          TextFieldResource.AdvancedFunctionsLayout
        )}`}
        cssClass="mp5__configTextField__advanced-layout"
        isChildAccordion
        accordionId={`advancedFunctionsLayout-${fields.internalId}`}
      >
        <div className="row mb-3 align-items-center">
          <TextInput
            label={`${t(
              "contentTranslator:content.internalName",
              TextFieldResource.InternalName
            )}`}
            value={fields?.slug}
            type="text"
            id={`${TextFieldResource.FieldName_InternalName_Slug}_${fields.internalId}`}
            name={TextFieldResource.FieldName_InternalName_Slug}
            onChangeHandler={onChangeHandler}
            cssClass="col-12"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_KeepOnPreviousPage}_${fields.internalId}`}
            name={TextFieldResource.FieldName_KeepOnPreviousPage}
            label={`${t(
              "contentTranslator:content.keepElementOnPreviousPage",
              TextFieldResource.KeepElementOnPreviousPage
            )}`}
            value={
              fields?.field_options?.keep_on_previous_page === "true"
                ? true
                : false
            }
            cssClass="col-6"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_BreakLine}_${fields.internalId}`}
            name={TextFieldResource.FieldName_BreakLine}
            label={`${t(
              "contentTranslator:content.startNewLineAfterElement",
              TextFieldResource.StartNewLineAfterElement
            )}`}
            value={fields?.field_options?.break_line}
            cssClass="col-6"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={LayoutOptions}
            name={TextFieldResource.NumberOfColumns}
            label={`${t(
              "contentTranslator:content.layout",
              TextFieldResource.Layout
            )}`}
            value={fields?.field_options?.number_of_columns}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />
        </div>
        {nodesData &&
          !!nodesData.length &&
          CommonHtmlTemplate.displyShowNodes(data)}
      </Accordion>
    );
  },

  displyShowNodes(data) {
    let { fields, onChangeHandler, t, nodesData } = data;
    return (
      <>
        <div className="textLabelHead">
          {/* {t(
            "contentTranslator:content.Label_Show_nodes",
            TextFieldResource.Label_Show_nodes
          )} */}
          {FBService.getTranslation("Label_Show_nodes", TextFieldResource)}
        </div>
        <div className="row mb-3 align-items-center">
          {nodesData.map((node, index) => {
            let show_nodes = fields?.field_options?.show_in_nodes;
            return (
              <CheckBox
                key={index}
                onChangeHandler={onChangeHandler}
                id={`${node}_${fields.id}`}
                name={node}
                //label={`${t(`contentTranslator:content.${node}`)}`}
                label={FBService.getTranslation(node, TextFieldResource)}
                value={show_nodes && show_nodes[node] === "true" ? true : false}
                cssClass="col-3"
              />
            );
          })}
        </div>
      </>
    );
  },

  getAdvancedFunctionsLayoutWithoutInternalName(data) {
    //let { fields, onChangeHandler, t, nodesData } = data;
    let { fields, onChangeHandler, nodesData } = data;

    return (
      <Accordion
        // type={`${t(
        //   `contentTranslator:content.AdvancedFunctionsLayout`,
        //   TextFieldResource.AdvancedFunctionsLayout
        // )}`}
        type={FBService.getTranslation(
          "AdvancedFunctionsLayout",
          TextFieldResource
        )}
        cssClass="mp5__configTextField__advanced-layout"
        isChildAccordion
        accordionId={`advancedFunctionsLayout-${fields.internalId}`}
      >
        <div className="row mb-3 align-items-center">
          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_KeepOnPreviousPage}_${fields.internalId}`}
            name={TextFieldResource.FieldName_KeepOnPreviousPage}
            // label={`${t(
            //   "contentTranslator:content.keepElementOnPreviousPage",
            //   TextFieldResource.KeepElementOnPreviousPage
            // )}`}
            label={FBService.getTranslation(
              "keepElementOnPreviousPage",
              TextFieldResource
            )}
            value={
              fields?.field_options?.keep_on_previous_page === "true"
                ? true
                : false
            }
            cssClass="col-6"
          />

          <CheckBox
            onChangeHandler={onChangeHandler}
            id={`${TextFieldResource.FieldName_BreakLine}_${fields.internalId}`}
            name={TextFieldResource.FieldName_BreakLine}
            // label={`${t(
            //   "contentTranslator:content.startNewLineAfterElement",
            //   TextFieldResource.StartNewLineAfterElement
            // )}`}
            label={FBService.getTranslation(
              "startNewLineAfterElement",
              TextFieldResource
            )}
            value={fields?.field_options?.break_line}
            cssClass="col-6"
          />
        </div>
        <div className="row mb-3 align-items-center">
          <SelectDropDown
            options={LayoutOptions}
            name={TextFieldResource.NumberOfColumns}
            // label={`${t(
            //   "contentTranslator:content.layout",
            //   TextFieldResource.Layout
            // )}`}
            label={FBService.getTranslation("Layout", TextFieldResource)}
            value={fields?.field_options?.number_of_columns}
            onChangeHandler={onChangeHandler}
            cssClass="col-6"
          />
        </div>
        {nodesData &&
          !!nodesData.length &&
          CommonHtmlTemplate.displyShowNodes(data)}
      </Accordion>
    );
  },
};

export default CommonHtmlTemplate;
