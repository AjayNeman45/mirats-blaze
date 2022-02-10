import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { decryptText, encryptText } from "../../utils/enc-dec.utils";
import { ClientJS } from "clientjs";
import SurveyQuestion from "../../components/SurveyQuestion";
import {
  addSession,
  getAllSessions,
  getAllSurveys,
  getSession,
  getSurvey,
  updateSession,
} from "../../utils/firebaseQueries";
import { fetchBackgroundDetails } from "../../utils/fetchBackgroundDetails";

const client = new ClientJS();
// const windowClient = new window.ClientJS();

const fingerPrint = client.getFingerprint();

const BlazeContext = createContext();

export const useBlazeContext = () => {
  return useContext(BlazeContext);
};

const BlazeContextProvider = ({ children }) => {
  const { encryptedID } = useParams();
  const [sessionID, setSessionID] = useState(null);
  const [baseLoading, setBaseLoading] = useState(false);
  const [errCode, setErrCode] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [sessionTechnicalDetails, setSessionTechnicalDetails] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [gdprConsent, setGdprConsent] = useState(null);
  const [version, setVersion] = useState(null);
  const [verificationDone, setVerificationDone] = useState(false);
  const [responses, setResponses] = useState({});

  const [ip, setIp] = useState(null);

  const location = useLocation();
  const srcID = new URLSearchParams(location.search).get("SRCID");
  const rID = new URLSearchParams(location.search).get("RID");
  const [finalVerification, setFinalverification] = useState();
  const history = useHistory();

  const surveyID = decryptText(
    encryptedID?.split("-")[0] ? encryptedID?.split("-")[0] : ""
  );
  const projectID = decryptText(
    encryptedID?.split("-")[1] ? encryptedID?.split("-")[1] : ""
  );
  const countryID = decryptText(
    encryptedID?.split("-")[2] ? encryptedID?.split("-")[2] : ""
  );

  // setting error code and message
  const setErrCodeAndMsg = (code, msg) => {
    setErrCode(code);
    setErrMsg(msg);
    setBaseLoading(false);
  };

  function check_cookie_name(name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) {
      console.log(match[2]);
      return match[2];
    }
    return false;
  }

  useEffect(() => {
    if (!encryptedID && !srcID && !rID) {
      setErrCode(1005);
      setErrMsg(
        "Uh-oh, You entered wrong URL. <span>Here is a solution:</span> We thank you for showing interest in this opportunity. Go to the invitation portal and get back to us with proper URL or Email us at <span>panel_support@miratsinsights.com</span> with the screenshot and error code."
      );
    } else if (!encryptedID && (!srcID || !rID)) {
      setErrCode(1006);
      setErrMsg(
        "Uh-oh, Your URL seems like it's broken. <span>Here is a solution:</span> We thank you for showing interest in this opportunity. Go to the invitation portal and get back to us with proper URL or Email us at <span>panel_support@miratsinsights.com</span> with the screenshot and error code."
      );
    } else if (!srcID && !rID) {
      setErrCode(1004);
      setErrMsg(
        "Uh-oh, It doesn't looks like you are having proper credential to continue this survey. <br /><span>Here is a solution : </span> We thank you for showing interest in this opportunity. Go to the invitation portal and get back to us with proper URL or Email us at <span>panel_support@miratsinsights.com</span>  with the screenshot and error code."
      );
    } else if (!encryptedID) {
      setErrCode(1003);
      setErrMsg(
        "Uh-oh, Your URL doesn't have any valid project configuration. <span>Here is a solution : </span> We thank you for showing interest in this opportunity. Go to the invitation portal and get back to us with proper URL or Email us at <span>panel_support@miratsinsights.com</span> with the screenshot and error code."
      );
    } else if (!srcID) {
      setErrCode(1002);
      setErrMsg(
        "Uh-oh, Looks like your source you are doing the survey is not configured properly.<span> Here is a solution : </span> We thank you for showing interest in this opportunity. Go to the invitation portal and get back to us with proper URL or Email us at <span>panel_support@miratsinsights.com</span> with the screenshot and error code."
      );
    } else if (!rID) {
      setErrCode(1001);
      setErrMsg(
        "Uh-oh, Looks like your respondent id is not configured properly. <span>Here is a solution : </span> We thank you for showing interest in this opportunity. Go to the invitation portal and get back to us with proper URL or Email us at <span>panel_support@miratsinsights.com</span> with the screenshot and error code."
      );
    } else {
      setBaseLoading(true);
      fetchBackgroundDetails();
    }
  }, [srcID, rID, encryptedID]);

  const fetchBackgroundDetails = () => {
    var os = "";
    if (navigator.appVersion.indexOf("Mac") != -1) os = "Mac OS";

    if (navigator.appVersion.indexOf("Win") != -1) os = "Windows OS";

    if (navigator.appVersion.indexOf("X11") != -1) os = "Unix OS";

    if (navigator.appVersion.indexOf("Linux") != -1) os = "Linus OS";

    //Device Type

    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setSessionTechnicalDetails({
        ...sessionTechnicalDetails,
        deviceType: "Tablet",
      });
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      setSessionTechnicalDetails({
        ...sessionTechnicalDetails,
        deviceType: "Mobile",
      });
    } else {
      setSessionTechnicalDetails({
        ...sessionTechnicalDetails,
        deviceType: "Desktop",
      });
    }

    async function FetchIP() {
      let url = "https://get.geojs.io/v1/ip.json";
      const response = await fetch(url);
      return response.json();
    }

    async function GEO(IP) {
      let url = `https://get.geojs.io/v1/ip/geo/${IP}.json`;
      const response = await fetch(url);
      return response.json();
    }

    FetchIP().then((data) => {
      setIp(data.ip);
      GEO(data["ip"]).then((data) => {
        setGeoData(data);
        // setBaseLoading(false);
      });
    });

    //Browser Detection
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = "" + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera 15+, the true version is after "OPR/"
    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt("" + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    setVersion(fullVersion);
    setSessionTechnicalDetails({
      ...sessionTechnicalDetails,
      version: fullVersion,
      os: os,
      browser_name: browserName,
      language: navigator.language,
      is_online: navigator.onLine,
      platform: navigator.platform,
      vendor: navigator.vendor,
      cookie_enabled: navigator.cookieEnabled,
      user_agent: navigator.userAgent,
    });
  };

  useEffect(() => {
    if (ip && sessionTechnicalDetails && geoData) {
      const checkSurveyExistance = async () => {
        if (surveyID == "") {
          setErrCode(131);
          setErrMsg("Encryption Failure");
          setBaseLoading(false);
        }
        const ref = doc(db, "mirats", "surveys", "survey", surveyID);
        const docSnap = await getDoc(ref);

        // survey exist
        if (docSnap.exists()) {
          verifyTechnicalDetails();
        }
      };

      checkSurveyExistance();
    }
  }, [sessionTechnicalDetails, geoData, ip]);

  //  verify ip, rid , encrypt url, cookie, country
  const verifyTechnicalDetails = async () => {
    console.log("verifying techincal details ");
    let techincalDetailsVerification = false;
    // get survey
    const survey = await getSurvey(surveyID);
    // get all the sessions of that survey
    const sessions = await getAllSessions(surveyID);

    // if there is not any sessions then directly move on to the next step
    if (sessions.size == 0) {
      techincalDetailsVerification = true;
    }
    // traverse over all the sessions to match ip , rid and all other things
    sessions?.forEach((doc) => {
      const geoData = doc.data().geo_data;
      if (!surveyID || !countryID || !projectID) {
        setErrCodeAndMsg(
          131,
          "Respondent did not enter the Lucid Marketplace with the expected encryption variable"
        );
        techincalDetailsVerification = false;
      }
      // verifying ip
      else if (geoData?.ip === ip) {
        setErrCodeAndMsg(30, "Respodant did not have unique IP");
        techincalDetailsVerification = false;
      }
      // verifying respondant id
      else if (doc.data()?.rid === rID) {
        setErrCodeAndMsg(
          35,
          "Respondent did not have a unique PID for that supplier"
        );
        techincalDetailsVerification = false;
      } else if (check_cookie_name("blaze")) {
        setErrCodeAndMsg(
          36,
          "Respondant cookie indicated they had taken a survey"
        );
        techincalDetailsVerification = false;
      } else if (
        survey?.country.toLowerCase() !== countryID.toLocaleLowerCase()
      ) {
        setErrCodeAndMsg(37, "Respondent is not in the country of the survey");
        techincalDetailsVerification = false;
      } else {
        techincalDetailsVerification = true;
      }
    });
    techincalDetailsVerification && verifyBlockedData();
  };

  //  verfiy all the blocked data
  const verifyBlockedData = async () => {
    console.log("verifying blocked data");
    const survey = await getSurvey(surveyID);
    if ("blocked_ips" in survey) {
      if (survey?.blocked_ips?.includes(ip)) {
        setErrCodeAndMsg(
          133,
          "Respondent attempted to enter on an IP blocked from the survey"
        );
      }
    } else if ("blocked_pids" in survey) {
      if (survey?.blocked_pids.includes(projectID))
        setErrCodeAndMsg(
          132,
          "Respondent attempted to enter on a PID blocked from the survey"
        );
    } else if ("blocked_countries" in survey) {
      if (survey?.blocked_countries.includes("Thiland"))
        setErrCodeAndMsg(
          234,
          "Respondent's IP address coming from a country subject to US economic sactions "
        );
    } else {
      verifySurveyGroupData();
    }
  };

  //  verify the data according to survey group
  const verifySurveyGroupData = async () => {
    console.log("verifying data according to survey grp number");

    const survey = await getSurvey(surveyID);
    const allSurveys = await getAllSurveys();

    allSurveys?.forEach(async (doc) => {
      //  condition to find the survey with same group
      if (
        doc.data()?.survey_group == survey?.survey_group &&
        doc.data().survey_id !== parseInt(surveyID)
      ) {
        //  Get the all the sessions for that particular survey to matched ip and all other things
        const allSessions = await getAllSessions(String(doc.data()?.survey_id));

        // traverse over all the sessions of that survey
        allSessions.forEach(async (session) => {
          if (session.data()?.geo_data?.ip === ip) {
            setErrCodeAndMsg(
              230,
              "Respondent did not have a unique IP across the survey group"
            );
            setFinalverification(0);
            return;
          } else if (session.data()?.rid === parseInt(rID)) {
            setErrCodeAndMsg(
              139,
              "Respondent did not have a unique PID for that supplier across the survey group"
            );
            setFinalverification(0);
            return;
          } else {
            setFinalverification(1);
          }
        });
      } else {
        setFinalverification(1);
      }
    });
  };

  // when finalVerification is true, add all the bakcground verified details in database
  useEffect(() => {
    if (!errCode && !errMsg && finalVerification) {
      console.log(
        "all the background verification is done and session is inserted in database"
      );
      addSession(surveyID, sessionTechnicalDetails, geoData, srcID, rID)
        .then((res) => {
          setVerificationDone(true);
          setBaseLoading(false);
          history.push(`/blaze/${encryptedID}/gdpr?SRCID=${srcID}&RID=${rID}`);
        })
        .catch((err) => {
          setVerificationDone(false);
          setBaseLoading(true);
          console.log(err);
        });
    }
  }, [finalVerification]);

  const value = {
    errCode,
    errMsg,
    setErrCodeAndMsg,
    baseLoading,
    setBaseLoading,
    sessionTechnicalDetails,
    verificationDone,
    geoData,
    responses,
    setResponses,
  };
  return (
    <BlazeContext.Provider value={value}>{children}</BlazeContext.Provider>
  );
};

export default BlazeContextProvider;
