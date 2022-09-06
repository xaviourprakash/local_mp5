import React, { useState } from "react";
import FBService from "../formBuilder/FormBuilder.service";

export const Accordion = (props) => {
  const {
    type,
    label,
    children,
    removeElement,
    elementId,
    duplicateElement,
    toggleHeading,
    isDefaultOpen,
    showEllipsis,
    isChildAccordion,
    showDraggableArea,
    cssClass,
    isRuler,
    isDeleteIcon,
    index,
    removeAnnotation,
    accordionId,
    setIsOpenAccordian,
  } = props;
  const [isOpen, setIsOpen] = useState(isDefaultOpen || false);
  let currentId = `MB5__element-${elementId}`;
  let popoverId = `MB5__popover-element-${elementId}`;
  let draggableAreaClass = showDraggableArea ? "fb-draggable-area" : "";
  let isShowType = isRuler && !isOpen ? false : true;

  const setOpen = (value) => {
    setIsOpenAccordian && setIsOpenAccordian(index, value);
    setIsOpen(value);
  };

  return (
    <div
      className={`accordion-wrapper ${
        isChildAccordion
          ? "col-12 MP5__configTextField__childAccordion"
          : "row g-0"
      } ${cssClass || ""}`}
    >
      <div
        className={`MP5__configTextField__content ${
          isChildAccordion ? "col-12" : "col pe-3"
        }`}
      >
        <div className={`accordion ${isOpen ? "open" : ""}`} id={accordionId}>
          <div
            className={`accordion-header ${draggableAreaClass}`}
            id="headingOne"
          >
            <div
              className={`d-inline-block accordion-title ${
                isOpen ? "open" : ""
              }`}
              onClick={() => setOpen(!isOpen)}
            >
              {isShowType && type && (
                <span className={isChildAccordion ? "type" : "textTitleHead"}>
                  {type}
                </span>
              )}
              {label && !isOpen && (
                <div className="textLabelHead text-truncate ps-4" title={label}>
                  {label}
                </div>
              )}
              {isOpen && !!toggleHeading && (
                <div className="textLabelHead text-truncate ps-4">
                  {toggleHeading}
                </div>
              )}
            </div>
            {isDeleteIcon && (
              <div
                className="bg-transparent MP5__accordion__deleteIcon"
                onClick={(event) => removeAnnotation(event, index)}
              >
                <i className="fa-solid fa-trash border-0 fs-5 text-secondary"></i>
              </div>
            )}
          </div>
          <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
            <div
              className={`accordion-content ${
                isChildAccordion
                  ? "row px-0 align-items-center"
                  : "row ps-5 pt-0 mb-3"
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
      {showEllipsis && (
        <div
          className="accordion-ellipsis col-auto d-flex align-items-center justify-content-center MB5_side-menu MB5__tooltip"
          id={currentId}
          onMouseMove={(event) =>
            FBService.handleMouseMove(event, currentId, popoverId)
          }
        >
          <div className="ellipsis-center">
            <i className="fa fa-ellipsis-vertical"></i>
          </div>
          <div className="tooltiptext" id={popoverId}>
            <i
              className="fa-solid fa-trash"
              onClick={() => removeElement(elementId)}
            ></i>
            <i
              className="fa-solid fa-clone"
              onClick={() => duplicateElement(elementId)}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};
