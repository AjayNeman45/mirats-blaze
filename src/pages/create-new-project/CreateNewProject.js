import "./CreateNewProject.css";
import Header from "../../components/header/Header";
import { Link, useParams } from "react-router-dom";
import { AiOutlineBulb } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useCreateNewProject } from "../../context/CreateNewProjectContext";

const inputHelperCardData = [
  {
    title: "Number of Completes",
    desc: "Suppliers use this to reference initial estimates for total completes required for a survey.",
  },
  {
    title: "Industry",
    desc: "Industry specifies the genre of your survey, which helps suppliers send the right respondents.",
  },
];

const CreateNewProject = () => {
  const { edit_option } = useParams();
  return (
    <>
      <Header />
      <div className="create_survey_page">
        <div className="create_survey_page_header">
          <p className="title">Create Survey</p>
          <p className="subtitle">
            Create a new survey and then enlist a new project
          </p>
          <hr />
        </div>
        {(() => {
          switch (edit_option) {
            case "basic":
              return <BasicSurveyInfo />;
            case "setup-requirements":
              return <SetUpRequirments />;
            case "metrics-and-surveyData":
              return <MetricsAndData />;
            case "peoples":
              return <Peoples />;
            default:
              return <BasicSurveyInfo />;
          }
        })()}
      </div>
    </>
  );
};

const BasicSurveyInfo = () => {
  const [preexistCheck, setPreexistCheck] = useState("No");
  const { surveyData, setSurveyData, insertBasicData, error } =
    useCreateNewProject();
  useEffect(() => {
    setSurveyData({
      ...surveyData,
      existing_project_checked: preexistCheck,
    });
  }, [preexistCheck]);

  return (
    <div>
      <div className="basic_survey_info">
        <div className="create_survey_left">
          <p className="title">Basic Survey Information</p>
          <p className="subtitle">
            This information will be visible on all across all our console
          </p>
          <InputHelperCard
            title={inputHelperCardData[0].title}
            desc={inputHelperCardData[0].desc}
          />
        </div>
        <div className="create_survey_right">
          <div>
            <label>Survey Name</label>
            <input
              type="text"
              className="text_input"
              value={surveyData?.survey_name}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  survey_name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Country</label>
            <select
              value={surveyData?.country}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  country: e.target.value,
                })
              }
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
              <option value="us">US</option>
              <option value="japan">Japan</option>
              <option value="australia">Australia</option>
              <option value="france">France</option>
              <option value="newzealand">Newzealand</option>
            </select>
          </div>
          <div>
            <label>Country - Language</label>
            <select
              value={surveyData?.country_langauge}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  country_language: e.target.value,
                })
              }
            >
              <option value="_">Select the country and Language</option>
              <option value="hindi">Hindi</option>
              <option value="english">english</option>
              <option value="french">French</option>
              <option value="japanese">Japanese</option>
            </select>
          </div>
          <div>
            <label>Numbe of completes</label>
            <input
              type="text"
              className="text_input"
              value={surveyData?.no_of_completes}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  no_of_completes: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="project_detail_info">
        <div className="create_survey_left">
          <p className="title">Your Project Details</p>
          <p className="subtitle">
            Tell us about your project! is this survey belongs to a pre-existing
            project or it is going to be a new one. Adding surveys to project
            helps our team to organize surveyData.
          </p>
        </div>
        <div className="create_survey_right">
          <div className="radio_input">
            <label>
              Do you want this survey to add in the list of a specific
              pre-existing project? You need to have project ID to do the same
            </label>
            <div className="radio_btns">
              <div className="radio_btn">
                <input
                  type="radio"
                  name="preexist"
                  value="Yes"
                  id="yes"
                  checked={preexistCheck == "Yes"}
                  onChange={(e) => {
                    setPreexistCheck(e.target.value);
                  }}
                />
                <span htmlFor="yes">Yes</span>
              </div>
              <div className="radio_btn">
                <input
                  type="radio"
                  name="preexist"
                  value="No"
                  id="no"
                  checked={preexistCheck == "No"}
                  onChange={(e) => {
                    setPreexistCheck(e.target.value);
                  }}
                />
                <span htmlFor="no">No</span>
              </div>
            </div>
          </div>
          <div className="project_name_input">
            <label>
              {preexistCheck === "No"
                ? "New Project Name"
                : "Existing Project Name"}
            </label>
            <input
              type="text"
              className="text_input"
              value={surveyData?.project}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  project: e.target.value,
                })
              }
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
      <button className="next_btn" onClick={insertBasicData}>
        Next
      </button>
    </div>
  );
};

const SetUpRequirments = () => {
  const [collectUserData, setCollectUserData] = useState("no");
  const { surveyData, setSurveyData, insertSetupRequirementData } =
    useCreateNewProject();
  console.log(surveyData);

  useEffect(() => {
    setSurveyData({
      ...surveyData,
      collect_user_data: collectUserData === "yes" ? true : false,
    });
  }, [collectUserData]);

  return (
    <>
      <div className="setup_requirment_info">
        <div className="create_survey_left">
          <p className="title">Setup Requirments</p>
          <p className="subtitle">
            Complete this information to set your survey live.
          </p>
          <InputHelperCard />
        </div>
        <div className="create_survey_right">
          <div>
            <label>
              Study Type <span>*</span>
            </label>
            <select
              value={surveyData?.study_type}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  study_type: e.target.value,
                })
              }
            >
              <option value="--">--</option>
              <option value="adhoc">Adhoc</option>
            </select>
          </div>
          <div>
            <label>
              Business unit <span>*</span>
            </label>
            <select
              value={surveyData?.business_unit}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  business_unit: e.target.value,
                })
              }
            >
              <option value="--">--</option>
              <option value="mirats-api">MIRATS-API</option>
            </select>
          </div>
          <div>
            <label>
              Industry <span>*</span>
            </label>
            <select
              value={surveyData?.industry}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  industry: e.target.value,
                })
              }
            >
              <option value="--">--</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="create_survey_right">
            <label>
              Does your survey collect personal information that can be used to
              identify an individual?
            </label>
            <div className="radio_btns">
              <div className="radio_btn">
                <input
                  type="radio"
                  name="preexist"
                  value="yes"
                  checked={collectUserData == "yes"}
                  onChange={(e) => setCollectUserData(e.target.value)}
                  id="yes"
                />
                <span for="yes">Yes</span>
              </div>
              <div className="radio_btn">
                <input
                  type="radio"
                  name="preexist"
                  value="no"
                  checked={collectUserData == "no"}
                  onChange={(e) => setCollectUserData(e.target.value)}
                  id="no"
                />
                <span for="no">No</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={insertSetupRequirementData} className="next_btn">
        Next
      </button>
    </>
  );
};

const MetricsAndData = () => {
  const { surveyData, setSurveyData, metricsData } = useCreateNewProject();
  console.log(surveyData);
  return (
    <>
      <div className="metrics_and_data">
        <div className="create_survey_left">
          <p className="title">Expected Metrics & Data</p>
          <p className="desc">
            Fill in to inform suppliers of your survey before receiving traffic.
            Review in-field surveyData when survey is live!
          </p>
        </div>
        <div className="create_survey_right">
          <div>
            <label>
              Expected Incidence Rate <span>*</span>
            </label>
            <input
              type="text"
              className="text_input"
              value={surveyData?.expected_incidence_rate}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  expected_incidence_rate: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>
              Expected Completion LOI <span>*</span>
            </label>
            <input
              type="text"
              className="text_input"
              value={surveyData?.exected_completion_loi}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  expected_completion_loi: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="internal_status">
        <div className="create_survey_left">
          <p className="title">Internal Status</p>
          <p className="desc">
            Fill in to inform suppliers of your survey before receiving traffic.
            Review in-field surveyData when survey is live!
          </p>
        </div>
        <div className="create_survey_right">
          <div>
            <label>Status</label>
            <input
              type="text"
              className="text_input"
              value="Bidding"
              disabled={true}
            />
          </div>
          <div>
            <label>
              Internal Status <span>*</span>
            </label>
            <select
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  internal_status: e.target.value,
                })
              }
            >
              <option value=""> ---- </option>
              <option value="ongoing">ongoing</option>
              <option value="lead">lead</option>
              <option value="won">won</option>
              <option value="lost">lost</option>
            </select>
          </div>
        </div>
      </div>
      <button onClick={metricsData} className="next_btn">
        Next
      </button>
    </>
  );
};

const Peoples = () => {
  const { surveyData, setSurveyData, insertPeoplesData } =
    useCreateNewProject();

  console.log(surveyData);
  return (
    <>
      <div className="peoples_info">
        <div className="create_survey_left">
          <p className="title">People</p>
          <p className="desc">
            Manage ownership of the survey for reporting and communication.
          </p>
        </div>
        <div className="create_survey_right">
          <div>
            <label>Project Manager</label>
            <select
              value={surveyData?.project_manager}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  project_manager: e.target.value,
                })
              }
            >
              <option value="--">--</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
          <div>
            <label>Account Executive</label>
            <select
              value={surveyData?.account_executive}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  account_executive: e.target.value,
                })
              }
            >
              <option value="--">--</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
          <div>
            <label>Alternate Project Manager</label>
            <select
              value={surveyData?.altername_project_manager}
              onChange={(e) =>
                setSurveyData({
                  ...surveyData,
                  alternate_project_manager: e.target.value,
                })
              }
            >
              <option value="--">--</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
        </div>
      </div>
      <button onClick={insertPeoplesData} className="next_btn">
        Create Project
      </button>
    </>
  );
};

const InputHelperCard = ({ title, desc }) => {
  return (
    <div className="input_helper_card">
      <div className="top" style={{ display: "flex" }}>
        <AiOutlineBulb size={30} color="blue" />
        <p className="title" style={{ marginLeft: "10px" }}>
          {title}
        </p>
      </div>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default CreateNewProject;
