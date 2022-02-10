import { NavLink, useParams } from "react-router-dom";
import Documents from "../../pages/documents/Documents";
import "./subheader.css";
const Subheader = () => {
  return (
    <div className="subheader">
      <div className="subheader_links">
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/analytics"
        >
          Analytics
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/sources"
        >
          Sources
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/reports"
        >
          Reports
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/settings"
        >
          Project Settings
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/questions"
        >
          Qualifications
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/quotas"
        >
          Quotas
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/allocations"
        >
          Allocations
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/documents"
        >
          Documents
        </NavLink>
        <NavLink
          activeClassName="subheader_active_link"
          className="subheader_link"
          to="/project/security"
        >
          Security
        </NavLink>
        <NavLink
          activeClassName="header_active_link"
          className="subheader_link"
          to={`/project/reconciliations`}
        >
          Reconciliations
        </NavLink>
      </div>
    </div>
  );
};

export default Subheader;
