import React, { createContext, useContext, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  query,
  Timestamp,
  doc,
  deleteDoc,
  listDocuments,
  onSnapshot,
  getDocs,
  orderBy,
  limit,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useBaseContext } from "./BaseContext";
import { encryptText, decryptText } from "../utils/enc-dec.utils";

const CreateNewProjectContext = createContext();
export const useCreateNewProject = () => {
  return useContext(CreateNewProjectContext);
};

const CreateNewProjectProvider = ({ children }) => {
  const [surveyData, setSurveyData] = useState({});
  const [error, setError] = useState(null);
  const history = useHistory();
  const { encryptedID } = useParams();

  var DOC = db.collection("mirats").doc("surveys").collection("survey");

  const insertBasicData = () => {
    getDocs(query(collection(db, "mirats", "surveys", "survey"))).then(
      (querySnapshot) => {
        console.log(querySnapshot.size);
        if (querySnapshot.size != 0) {
          //If Size is not 0 then increment previous id with 1
          console.log("Survey Size is not equal to zero");
          db.collection("mirats")
            .doc("surveys")
            .collection("survey")
            .orderBy("survey_id", "desc")
            .limit(1)
            .get()
            .then((MaxSurveyIdSnapshot) => {
              MaxSurveyIdSnapshot.docs.map((data) => {
                var survey_id = data.data()["survey_id"];
                var new_generated_survey_id = survey_id + 1; //Generate new Survey ID

                if (surveyData.existing_project_checked == "Yes") {
                  console.log("yes checked");
                  let project_id = 0; //Project ID declarartion
                  let docsize = 0;
                  getDocs(
                    query(
                      collection(db, "mirats", "surveys", "survey"),
                      where("project", "==", surveyData.project)
                    )
                  )
                    .then((doc) => {
                      docsize = doc.size;
                      doc.forEach((data) => {
                        project_id = data.data()["project_id"]; //Storing project id in line no=41
                      });
                    })
                    .then(() => {
                      if (docsize != 0) {
                        var sid = encryptText(String(new_generated_survey_id));
                        var pid = encryptText(String(project_id));
                        var cid = encryptText(surveyData.country);
                        const encryptedText = `${sid}-${pid}-${cid}`;
                        setDoc(
                          doc(
                            db,
                            "mirats",
                            "surveys",
                            "survey",
                            String(new_generated_survey_id)
                          ),
                          {
                            survey_id: new_generated_survey_id,
                            survey_name: surveyData?.survey_name,
                            country_language: surveyData?.country_language,
                            no_of_completes: parseInt(
                              surveyData?.no_of_completes
                            ),
                            project: surveyData?.project,
                            project_id: project_id,
                            country: surveyData.country,
                            encrypt: {
                              sid,
                              pid,
                              cid,
                            },
                          }
                        ).then(() => {
                          console.log(
                            "Survey Created in existing Project ",
                            surveyData.project
                          );

                          history.push(
                            `/create-new-project/setup-requirements/${encryptedText}`
                          );
                        });
                      } else {
                        //You have to create New project
                        setError(
                          "No Project found ! You have to create New Project"
                        );
                      }
                    })
                    .catch((er) => {
                      console.log("Error in existing Project", er);
                    });
                } else {
                  console.log("no cheked");
                  //Creating New Project
                  var project_id = 0;
                  //Checking if project Exists or not
                  getDocs(
                    query(
                      collection(db, "mirats", "surveys", "survey"),
                      where("project", "==", surveyData.project)
                    )
                  ).then((docu) => {
                    if (docu.size == 0) {
                      setError("");
                      console.log("Creating New project");

                      getDocs(
                        query(
                          collection(db, "mirats", "surveys", "survey"),
                          orderBy("project_id", "desc"),
                          limit(1)
                        )
                      )
                        .then((project_idSnapshot) => {
                          project_idSnapshot.docs.map((doc) => {
                            project_id = doc.data()["project_id"] + 1;
                          });
                        })
                        .then(() => {
                          var sid = encryptText(
                            String(new_generated_survey_id)
                          );
                          var pid = encryptText(String(project_id));
                          var cid = encryptText(surveyData.country);
                          const encryptedText = `${sid}-${pid}-${cid}`;
                          setDoc(
                            doc(
                              db,
                              "mirats",
                              "surveys",
                              "survey",
                              String(new_generated_survey_id)
                            ),
                            {
                              survey_id: new_generated_survey_id,
                              survey_name: surveyData?.survey_name,
                              country_language: surveyData?.country_language,
                              no_of_completes: parseInt(
                                surveyData?.no_of_completes
                              ),
                              project: surveyData?.project,
                              project_id: project_id,
                              country: surveyData?.country,
                              encrypt: {
                                pid,
                                sid,
                                cid,
                              },
                            }
                          )
                            .then(() => {
                              console.log(
                                "Data saved successfully after pre existing survey"
                              );
                              history.push(
                                `/create-new-project/setup-requirements/${encryptedText}`
                              );
                            })
                            .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));
                    } else {
                      setError("Project already exist");
                    }
                  });
                }
              });
            });
        } else {
          //Size is 0
          var survey_id = 10000001; //If docs are 0 in firebase then set id = 1000001
          setDoc(doc(db, "mirats", "surveys", "survey", String(survey_id)), {
            survey_id: survey_id,
            survey_name: surveyData.survey_name,
            country_language: surveyData.country_language,
            no_of_completes: surveyData.no_of_completes,
            project_id: 10000001,
            country: surveyData?.country,
            project: surveyData?.project,
          }).then(() => {
            console.log("Data saved successfully in new survey");
            // window.location.href = `http://127.0.0.1:5500/setuprequirements.html?survey_id=${survey_id}`
            // reqmsg.style.color = "blue"
            // reqmsg.innerHTML =
            // 	"Redirecting to Setup Requirements"
            // setTimeout(() => {
            // 	window.location.href = `http://127.0.0.1:5500/setuprequirements.html?survey_id=${survey_id}&project_id=${new_project.value}`
            // }, 5000)
          });
        }
      }
    );
  };

  const insertSetupRequirementData = () => {
    const survey_id = decryptText(encryptedID.split("-")[0]);
    const project_id = decryptText(encryptedID.split("-")[1]);
    const country_id = decryptText(encryptedID.split("-")[2]);
    console.log("country", country_id);

    var docker = DOC.where("project_id", "==", parseInt(project_id))
      .where("survey_id", "==", parseInt(survey_id))
      .get();
    docker.then((doc) => {
      doc.docs.forEach((data) => {
        console.log(data.data());
        data.ref
          .set(
            {
              study_type: surveyData.study_type,
              business_unit: surveyData.business_unit,
              industry: surveyData.industry,
              collect_user_data: surveyData.collect_user_data,
            },
            { merge: true }
          )
          .then(() => {
            console.log("moving to metrics data");
            history.push(
              `/create-new-project/metrics-and-surveyData/${encryptedID}`
            );
          })
          .catch((er) => {
            console.log("Error in saving Setup Requirements", er);
          });
      });
    });
  };

  const metricsData = () => {
    console.log("in metrics....", surveyData);
    const survey_id = decryptText(encryptedID.split("-")[0]);
    const project_id = decryptText(encryptedID.split("-")[1]);
    const country_id = decryptText(encryptedID.split("-")[2]);
    var docker = DOC.where("project_id", "==", parseInt(project_id))
      .where("survey_id", "==", parseInt(survey_id))
      .get();
    docker.then((doc) => {
      doc.docs.forEach((data) => {
        console.log(data.data());
        data.ref
          .set(
            {
              expected_incidence_rate: parseFloat(
                surveyData.expected_incidence_rate
              ),
              expected_completion_loi: parseFloat(
                surveyData.expected_completion_loi
              ),
              status: "bidding",
              internal_status: surveyData.internal_status,
            },
            { merge: true }
          )
          .then(() => {
            console.log("moving to peoples");
            history.push(`/create-new-project/peoples/${encryptedID}`);
          })
          .catch((er) => {
            console.log("Error in saving Metrics Data", er);
          });
      });
    });
  };

  const insertPeoplesData = () => {
    const survey_id = decryptText(encryptedID.split("-")[0]);
    const project_id = decryptText(encryptedID.split("-")[1]);
    var docker = DOC.where("project_id", "==", parseInt(project_id))
      .where("survey_id", "==", parseInt(survey_id))
      .get();
    docker.then((doc) => {
      doc.docs.forEach((data) => {
        console.log(data.data());
        data.ref
          .set(
            {
              project_manager: surveyData.project_manager,
              account_executive: surveyData.account_executive,
              alternate_project_manager: surveyData.alternate_project_manager,
              status: "bidding",
              changes: [],
            },
            { merge: true }
          )
          .then(() => {
            console.log("moving to settings");
            history.push(`/project/settings/${encryptedID}`);
          })
          .catch((er) => {
            console.log("Error in saving Metrics Data", er);
          });
      });
    });
  };

  // const insertProjectData = () => {}
  const value = {
    surveyData,
    setSurveyData,
    insertBasicData,
    insertSetupRequirementData,
    metricsData,
    insertPeoplesData,
    error,
  };
  return (
    <CreateNewProjectContext.Provider value={value}>
      {children}
    </CreateNewProjectContext.Provider>
  );
};

export default CreateNewProjectProvider;
