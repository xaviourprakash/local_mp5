import React, { useEffect } from "react";
import { FormBuilder } from "../formBuilder/FormBuilder";
import { useTranslation } from "react-i18next";
import FBService from "../formBuilder/FormBuilder.service";

export default function Layout() {
  const { i18n, t } = useTranslation(["translation", "contentTranslator"]);

  useEffect(() => {
    i18n.changeLanguage(window?.I18n?.locale || "en");
    FBService.setTranslation(t);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(window?.I18n?.locale || "en");
    FBService.setTranslation(t);
  }, [window?.I18n?.locale]);

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    FBService.setTranslation(t);
  };

  return (
    <>
      <div className="layout__body-container">
        {process.env.REACT_APP_ENV === "development" ? (
          <div className="MP5--language-locale">
            <select
              name="lang"
              defaultValue="en"
              id="lang"
              onChange={(e) => changeLanguage(e)}
            >
              <option value="en">English</option>
              <option value="de">German</option>
            </select>
          </div>
        ) : (
          ""
        )}

        <FormBuilder />
      </div>
    </>
  );
}
