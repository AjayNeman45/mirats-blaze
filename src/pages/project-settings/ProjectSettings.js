import Header from "../../components/header/Header";
import Subheader from "../../components/subheader/Subheader";
import ToggleSwitch from "../../components/toogleSwitch/ToggleSwitch";
import { GoSettings } from "react-icons/go";
import "./ProjectSettings.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import { ProjectSettingContext } from "./ProjectSettingContext";

const ProjectSettings = () => {
  const { projectName } = useParams();
  const {} = useContext(ProjectSettingContext);

  return (
    <>
      <Header />
      <Subheader />
      <div className="project_name_input_field">
        <input type="text" value={projectName} />
      </div>

      <div className="project_settings_page">
        <div className="card">
          <p className="title">Setup Requirements</p>
          <div>
            <label>Study Type</label>
            <select>
              <option></option>
              <option></option>
              <option></option>
            </select>
            <small>
              Study Type specifies what kind of survey you are running, which
              helps suppliers send the right respondents
            </small>
          </div>
          <div>
            <label>Buisiness unit</label>
            <select>
              <option></option>
              <option></option>
              <option></option>
            </select>
            <small>
              Buisiness unit determines the currency and group within your
              organization that will be billed for this study
            </small>
          </div>
          <div>
            <label>Industry</label>
            <select>
              <option></option>
              <option></option>
              <option></option>
            </select>
            <small>
              Industry specifies the genre of survey, which helps suppliers send
              the right respodents.
            </small>
          </div>
          <div>
            <label>Country - Language</label>
            <select>
              <option></option>
              <option></option>
              <option></option>
            </select>
            <small>
              This tells Suppliers where your sample should come from and in
              what language
            </small>
          </div>

          <div>
            <label>
              Does your survey collect personal information that can be used to
              identify am individual?
            </label>
            <div className="radio_btns">
              <div>
                <input type="radio" id="yes" name="fav_language" value="Yes" />
                <label for="yes">Yes</label>
              </div>
              <div>
                <input type="radio" id="no" name="fav_language" value="No" />
                <label for="no">No</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <p className="title">URL Setup & Costs</p>
          <div>
            <label>Live URL</label>
            <textarea rows={4}></textarea>
            <small>
              We use this link to direct respondents to your survey after they
              complete a prescreener, when applicable. Please enter a valid url,
              e.g. https://www.now.mirats.in
            </small>
          </div>
          <div>
            <label>Test URL</label>
            <textarea rows={4}></textarea>
            <small>We Use this link when testing your survey.</small>
          </div>
          <button className="build_url_btn">
            <GoSettings /> &nbsp; Build Your URL
          </button>
          <div>
            <label>Client CPI</label>
            <input placeholder="$USD input in integers" />
            <small>Notes the price a client is paying for completes</small>
          </div>
          <div>
            <label>Average Supply CPI</label>
            <input placeholder="$USD " />
            <small>
              Tracks the price for completes. This is average supply costs
            </small>
          </div>
        </div>
        <div className="card">
          <p className="title">Expected Metrics & Data</p>
          <div>
            <label>Number of completes</label>
            <input type="text" />
            <small>
              Notes the number of survey completely required by the client on
              this project. Suppliers use this to reference initial estimates
              for total completes required for a survey
            </small>
          </div>
          <div>
            <label>Expected incidence Rate</label>
            <input type="text" placeholder="Excpected LOI" />
            <small>
              Suppliers use this to determine how to best send to your survey
              before the in-field incidence Rate is calculated
            </small>
          </div>
          <div>
            <label>Expected Completion LOI</label>
            <input type="text" placeholder="Excpected LOI" />
            <small>
              Suppliers use this for initial expenctation of time to complete a
              survey before the in-field data is available.
            </small>
          </div>
        </div>
        <div className="card">
          <p className="title">Survey Basics</p>
          <div>
            <div className="switch-toggle">
              <ToggleSwitch label="Suitable for mobile" />
              <ToggleSwitch label="Suitable for tablet" />
              <ToggleSwitch label="Suitable for desktops/laptops" />
              <ToggleSwitch label="Suitable for tv" />
              <ToggleSwitch label="Requires Webcam" />
            </div>
          </div>
          <div>
            <label>Survey Current status</label>
            <select>
              <option></option>
            </select>
            <small>This determines the current state of the survey</small>
          </div>
          <div>
            <label>In-field Date</label>
            <input
              placeholder="Start Date"
              class="textbox-n"
              type="text"
              onfocus="(this.type='date')"
              id="date"
            />
            <small>This determines the current state of the survey</small>
          </div>
          <div>
            <label>Expected End Date</label>
            <input
              placeholder="out-field Date"
              class="textbox-n"
              type="text"
              onfocus="(this.type='date')"
              id="date"
            />
            <small>The date this project launched in-field</small>
          </div>
        </div>
        <div className="card2">
          <p className="title">People's & Refs'</p>
          <div>
            <div>
              <label>Account Executive / Sales Coordinator</label>
              <select>
                <option></option>
              </select>
              <small>
                Manages owenership of the survey for reporting and communication
              </small>
            </div>
            <div>
              <label>Lead Project Manager</label>
              <select>
                <option></option>
              </select>
              <small>
                Manages the field of the survey for reporting and communication
              </small>
            </div>
            <div>
              <label>Alternative Project Manager</label>
              <select>
                <option></option>
              </select>
              <small>
                Manages the field of the survey for reporting and communication
              </small>
            </div>
          </div>
          <div>
            <div>
              <label>Created by</label>
              <input type="text" placeholder="Created by" />
              <small>The person who created the survey in this project</small>
            </div>
            <div>
              <label>Contact Email</label>
              <input type="email" placeholder="Contact Email" />
              <small>The person who created the survey in this project</small>
            </div>
            <div>
              <label>PO Number</label>
              <input type="text" placeholder="PO Number" />
              <small>The date this project launched in-field</small>
            </div>
          </div>
        </div>
        <div className="card2">
          <p className="title">Project Settings</p>
          <div>
            <div>
              <label>External Name</label>
              <input type="text" placeholder="Other name of Project" />
            </div>
            <div>
              <label>Project ID</label>
              <input type="text" placeholder="Project ID" />
            </div>
            <div>
              <label>Survey Group</label>
              <input type="text" placeholder="Group Number" />
            </div>
            <div>
              <label>Client PM Email</label>
              <input type="text" placeholder="Client's PM email" />
            </div>
            <div>
              <label>Client Project Manager</label>
              <input type="text" placeholder="Client's Project Manager" />
            </div>
          </div>
          <div>
            <button className="edit_project_details_btn">
              <GoSettings size={17} /> &nbsp; Edit Project Details
            </button>
          </div>
        </div>

        <div className="change_log">
          <p className="title">Change log</p>
          <p className="instructions">
            Review Changes to your survey configurations. See who made changes
            and when
          </p>
          <div style={{ overflowX: "auto" }}>
            <table className="change_log_table">
              <tr>
                <th>Time @ Date</th>
                <th>Profile Name</th>
                <th>Profile Email</th>
                <th>Changed Elements/Fields</th>
                <th>Removed</th>
                <th>Changed to</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSettings;
