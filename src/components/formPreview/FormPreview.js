import { useSelector } from "react-redux";
import FormPreviewService from "./FormPreview.Service";
import FormBuilderResource from "../../resource/FormBuilder.Resource";
import { useTranslation } from "react-i18next";

export const FormPreview = (props) => {
  let { cssClass } = props;
  const { t } = useTranslation(["translation", "contentTranslator"]);
  const formData = useSelector((state) => state.formBuilder.formData);
  const previewBriefing = useSelector(
    (state) => state.formBuilder.previewBriefing
  );

  const renderPreview = () => {
    let fields = formData && formData.form_body && formData.form_body.fields;

    return (
      <div className="row g-0">
        {fields &&
          fields.map((element) =>
            FormPreviewService.getElementPreview(element)
          )}
      </div>
    );
  };

  const renderPreviewBriefing = () => {
    let { product_slug, name, description } = previewBriefing;
    let orderTitle = product_slug + " " + name;

    return (
        <div className="mt-2 mb-3">
          <h1 className="fw-semibold mb-3">{orderTitle}</h1>
          <div className="card border-0 rounded-WPCard bg-light">
              <div className="card-header bg-transparent">
                  <h1 className="mt-1 mb-0">{`${t(
                      `contentTranslator:content.Label_PreviewBriefing_TaskDescription`,
                      FormBuilderResource.Label_PreviewBriefing_TaskDescription
                  )}`}</h1>
              </div>
              <div className="card-body bg-transparent"
                   dangerouslySetInnerHTML={{
                       __html: `${description}`,
                   }}>
              </div>
          </div>
        </div>
    );
  };

  return (
    <div className={cssClass}>
      {renderPreviewBriefing()}
      {renderPreview()}
    </div>
  );
};
