import { addDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { db } from "../../../firebase";
import { useBlazeContext } from "../BlazeContext";
import { decryptText } from "../../../utils/enc-dec.utils";
import ErrorPage from "../../../components/error-page/ErrorPage";
import { useGdprContext } from "./GdprConsentContext";

const GdprConsent = () => {
  const { setGdprConsent, errCode, errMsg } = useGdprContext();
  const [response, setResponse] = useState();
  return (
    <>
      {errCode && errMsg ? (
        <ErrorPage errCode={errCode} errMsg={errMsg} />
      ) : (
        <div className="survey_page">
          <div className="line_design"></div>
          <div className="survey_page_question_options">
            <p className="survey_page_question">GDPR consent</p>
            <p className="survey_page_desc">Please give gdpr consent</p>
            <div className="survey_question_response_section">
              <div className="survey_question_option">
                <input
                  type="radio"
                  id="agree"
                  name="option"
                  value="agree"
                  onChange={(e) => setResponse(true)}
                />
                <label htmlFor="agree">Agree</label>
              </div>
              <div className="survey_question_option">
                <input
                  type="radio"
                  id="disagree"
                  name="option"
                  value="disagree"
                  onChange={(e) => setResponse(false)}
                />
                <label htmlFor="disagree">Disagree</label>
              </div>
            </div>
            <div className="survey_page_btns">
              <div className="survey_page_next_btn">
                <button
                  className="next_btn"
                  onClick={() => setGdprConsent(response)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="powered_by_text">
            <span>
              Powered by <span>Mirats Insights</span>
            </span>
            <div className="privacy_terms">
              <span>
                <a href="#">Privacy Policy</a> | <a href="#">General Terms</a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GdprConsent;
