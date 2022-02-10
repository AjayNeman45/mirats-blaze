import { Route, Switch } from "react-router-dom"
import Projects from "./pages/projects/Projects"
import Dashboard from "./pages/dashboard/Dashboard"
import Accounts from "./pages/accounts/Accounts"
import Contacts from "./pages/contacts/Contacts"
import Leads from "./pages/leads/Leads"
import CreateNewProject from "./pages/create-new-project/CreateNewProject"
import Loader from "./components/loader/Loader"
import ProjectSettings from "./pages/project-settings/ProjectSettings"
import Qualifications from "./pages/qualifications/Qualifications"
import Quotas from "./pages/quotas/Quotas"
import Allocations from "./pages/allocations/Allocations"
import Reports from "./pages/reports/Reports"
import Documents from "./pages/documents/Documents"
import Security from "./pages/security/Security"
import Reconciliations from "./pages/reconciliation/Reconciliations"
import Blaze from "./pages/blaze/Blaze"
import BaseContextProvider from "./context/BaseContext"
import CreateNewProjectProvider from "./context/CreateNewProjectContext"
import ProjectContextProvider from "./pages/projects/ProjectContext"
import ProejctSettingProvider from "./pages/project-settings/ProjectSettingContext"
import BlazeContextProvider from "./pages/blaze/BlazeContext"
import SurveyQuestions from "./pages/survey-questions/SurveyQuestions"
import GdprConsent from "./pages/blaze/gdpr-consent/GdprConsent"
import GdprCotextProvider from "./pages/blaze/gdpr-consent/GdprConsentContext"
import ReconciliationContextProvider from "./pages/reconciliation/ReconciliationContext"

function App() {
	return (
		<>
			<Switch>
				<BaseContextProvider>
					<Route path='/dashboard' exact>
						<Dashboard />
					</Route>
					<ProjectContextProvider>
						<Route path='/projects' exact>
							<Projects />
						</Route>
					</ProjectContextProvider>

					<Route path='/accounts'>
						<Accounts />
					</Route>
					<Route path='/contacts'>
						<Contacts />
					</Route>
					<Route path='/leads'>
						<Leads />
					</Route>
					<Route path='/create-new-project/:edit_option' exact>
						<CreateNewProjectProvider>
							<CreateNewProject />
						</CreateNewProjectProvider>
					</Route>

					<Route
						path='/create-new-project/:edit_option/:encryptedID'
						exact
					>
						<CreateNewProjectProvider>
							<CreateNewProject />
						</CreateNewProjectProvider>
					</Route>

					{/* blaze  */}
					<Route
						path={[
							"/blaze/:encryptedID/lightningStart",
							"/blaze/lightningStart",
							"/blaze/:encryptedID",
							"/blaze",
						]}
						exact
					>
						<BlazeContextProvider>
							<Blaze />
						</BlazeContextProvider>
					</Route>

					<Route
						path='/blaze/:encryptedID/questions/:questionNumber'
						exact
					>
						<SurveyQuestions />
					</Route>
					<Route path='/blaze/:encryptedID/gdpr' exact>
						<GdprCotextProvider>
							<GdprConsent />
						</GdprCotextProvider>
					</Route>

					{/* blaze end */}

					<Route path='/project/settings' exact>
						<ProjectSettings />
					</Route>
					<Route path='/project/settings/:encryptedID' exact>
						<ProejctSettingProvider>
							<ProjectSettings />
						</ProejctSettingProvider>
					</Route>

					<Route path='/project/questions'>
						<Qualifications />
					</Route>
					<Route path='/project/quotas'>
						<Quotas />
					</Route>
					<Route path='/project/dc'>
						<Quotas />
					</Route>
					<Route path='/project/allocations'>
						<Allocations />
					</Route>
					<Route path='/project/reports'>
						<Reports />
					</Route>
					<Route path='/project/documents'>
						<Documents />
					</Route>
					<Route path='/project/security'>
						<Security />
					</Route>
					<Route path='/project/reconciliation/:projectId' exact>
						<ReconciliationContextProvider>
							<Reconciliations />
						</ReconciliationContextProvider>
					</Route>
					<Route path='/error'>
						<Blaze />
					</Route>
				</BaseContextProvider>
			</Switch>
		</>
	)
}

export default App
