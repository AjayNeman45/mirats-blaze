import React from "react"
import styles from "./Documents.module.css"
import Header from "../../components/header/Header"
import Subheader from "../../components/subheader/Subheader"

const Documents = () => {
	return (
		<>
			<Header />
			<Subheader />
			<div className={styles.documents_page}>
				<p className={styles.page_title}>Add Client Doc</p>
				<div className={styles.survey_client_info}>
					<div>
						<label>Survey</label>
						<p>MIR16789148-Parent Demo survey</p>
					</div>
					<div>
						<label>Client</label>
						<p>Mirats Insights API_Client</p>
					</div>
					<div>
						<label>Field End Date</label>
						<p> Feb 13 2022 03:47:24 AM CST</p>
					</div>
				</div>
				<div className={styles.required_err}>
					<span style={{ color: "red" }}>*</span>&nbsp; indicates
					required field
				</div>
				<div className={styles.instructions}>
					<p>Instructions:</p>
					<ul>
						<li>Ensure file is in .txt format</li>
						<li>
							Separate each Client Code in one line &nbsp;
							<a href='#'>(View Sample Code)</a>
						</li>
						<li>
							Blank lines will be considered as a invalid entry
						</li>
						<li>
							Maximum Upload Size: 5,000 Client Codes or 1,536 KB
						</li>
					</ul>
				</div>
				<div className={styles.select_file_section}>
					<label>
						Select Text File &nbsp;{" "}
						<span style={{ color: "red" }}>*</span>
					</label>
					<br />
					<input type='file' id='upload-file' />
				</div>
				<div className={styles.survey_documents}>
					<p className={styles.legend}>
						Survey Attachments & Documents
					</p>
					<div
						className={styles.select_file_section}
						style={{ marginTop: "30px" }}
					>
						<input type='file' id='upload-file' />
					</div>
				</div>
				<div className={styles.recontacts}>
					<p className={styles.legend}>recontacts</p>
					<div className={styles.content}>
						<p>
							Marketplace Interface's Recontact Solution makes it
							easy for you to reach the respondents you need by
							seamlessly integrating Lucid Marketplace in the
							process.
						</p>
						<a href='#'>Learn More</a>
						<h5>Upload IDs</h5>
						<span>
							Upload a list of the IDs you need to recontact. You
							can use the RID and original Survey Number to upload
							your file or you can use the PID and Supplier ID.
						</span>
						<br />
						<a href='#'>Example File</a> <br />
						<br />
						<span>One of the two is required:</span>
						<br />
						<ol>
							<li>RID and original Survey Number</li>
							<li>PID and Supplier ID</li>
						</ol>
						<p>
							If you are recontacting respondents from more than
							three months ago, you will need to include the
							Supplier ID and PID.
						</p>
						<div className={styles.select_file_section}>
							<input type='file' id='upload-file' />
							<button>Upload</button> &nbsp; <span>or</span>{" "}
							&nbsp;
							<button>Cancel</button>
						</div>
						<p>
							For more information on additional recontact
							options, including how to pass PID-specific
							variables, visit the
							<a href='#'>Knowledge Hub</a>.
						</p>
						<p>
							Once you launch your survey, suppliers will be able
							to target the specific IDs you have uploaded.
						</p>
						<h5>Download Details</h5>
						<p>
							Recontact details include RID, PID, Supplier ID,
							Supplier Name, and Additional Parameters.
						</p>
						<button className={styles.download_details_btn}>
							Download Detials
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Documents
