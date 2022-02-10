import { createContext, useContext, useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { decryptText } from "../../../utils/enc-dec.utils";
import { getSession, updateSession } from "../../../utils/firebaseQueries";

const GdprContext = createContext();

export const useGdprContext = () => {
  return useContext(GdprContext);
};

const GdprCotextProvider = ({ children }) => {
  const [gdprConsent, setGdprConsent] = useState(null);
  const [errCode, setErrCode] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [sessionID, setSessionID] = useState(null);
  const [baseLoading, setBaseLoading] = useState(false);
  const { encryptedID } = useParams();
  const surveyID = decryptText(
    encryptedID?.split("-")[0] ? encryptedID?.split("-")[0] : ""
  );
  const history = useHistory();
  const location = useLocation();
  const srcID = new URLSearchParams(location.search).get("SRCID");
  const rID = new URLSearchParams(location.search).get("RID");
  const setErrCodeAndMsg = (code, msg) => {
    setErrCode(code);
    setErrMsg(msg);
    setBaseLoading(false);
  };
  // get session id of the user
  useEffect(() => {
    const func = async () => {
      await getSession(surveyID, setSessionID);
    };
    func();
  }, []);

  // check gdpr consent and insert it in database
  useEffect(() => {
    console.log(sessionID, gdprConsent);
    if (sessionID && gdprConsent != null) {
      const func = async () => {
        updateSession(surveyID, sessionID, {
          GDPR_agreement: gdprConsent,
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        if (gdprConsent) {
          history.push(
            `/blaze/${encryptedID}/questions/42?SRCID=${srcID}&RID=${rID}`
          );
        } else {
          setErrCodeAndMsg(
            36,
            "EU-based respondent terminated when they did not consent to GDPR"
          );
        }
      };
      func();
    }
  }, [gdprConsent, sessionID]);

  const value = { setGdprConsent, errCode, errMsg };
  return <GdprContext.Provider value={value}>{children}</GdprContext.Provider>;
};
export default GdprCotextProvider;
