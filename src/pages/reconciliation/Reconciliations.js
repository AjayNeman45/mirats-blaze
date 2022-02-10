import React, { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import Header from "../../components/header/Header"
import Subheader from "../../components/subheader/Subheader"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import XLSX from "xlsx"
import styles from "./Reconciliations.module.css"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { red } from "@mui/material/colors"
import DataAnalysis from "./DataAnalysis"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	}
}

const Reconciliations = () => {
	const [value, setValue] = React.useState(0)

	// for left tab panel
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	// lokesh code for reconcilationc continue btn
	const handleReconciliationbtn = e => {
		const [file] = e.target.files
		const reader = new FileReader()

		reader.onload = evt => {
			const bstr = evt.target.result
			const wb = XLSX.read(bstr, { type: "binary" })
			const wsname = wb.SheetNames[0]
			const ws = wb.Sheets[wsname]
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })
			console.log(data)
			let splitbynewrow = data.split("\n")
			let actualdata = [] //Excel actual data
			for (let i = 0; i < splitbynewrow.length; i++) {
				actualdata.push(splitbynewrow[i].split(","))
			}
			console.log(actualdata, actualdata.length)
		}
		reader.readAsBinaryString(file)
	}

	return (
		<>
			<Header />
			<Subheader />
			<div>
				<p className={styles.page_title}>Reconciliations</p>
				<div className={styles.security_head}>
					<div>
						<label>Survey</label>
						<Link to='#' className={styles.project_info_link}>
							MIR16789148-Parent Demo survey
						</Link>
					</div>
					<div>
						<label>Client</label>
						<Link to='#' className={styles.project_info_link}>
							Mirats Insights API_Client
						</Link>
					</div>
					<div>
						<label>First Complete Date</label>
						<p> -</p>
					</div>
					<div>
						<label>Last Complete Date</label>
						<p> -</p>
					</div>
					<div>
						<label>Field End Date</label>
						<p> Feb 13 2022 03:47:24 AM CST</p>
					</div>
				</div>
				<div className={styles.main}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						sx={{ borderRight: 1, borderColor: "divider" }}
					>
						<Tab label='Data Analysis' {...a11yProps(0)} />
						<Tab label='Reconciliations' {...a11yProps(1)} />
						<Tab label='Respondant answer' {...a11yProps(2)} />
						<Tab label='Term Details' {...a11yProps(3)} />
					</Tabs>
					<TabPanel value={value} index={0} style={{ width: "80%" }}>
						<DataAnalysis />
					</TabPanel>
					<TabPanel value={value} index={1} style={{ width: "80%" }}>
						<div className={styles.reconciliations_section}>
							<p className={styles.setup_reconciliation}>
								Step 1 of 2: Setup Reconciliation
							</p>
							<p>Instructions</p>
							<div>
								<p>
									(1) &nbsp; The file to be uploaded with the
									ids should be in text (.txt) format
								</p>
								<p>
									(2) &nbsp; Place each ID on one line. Empty
									lines will be ignored{" "}
									<a to='#'>(View Sample format)</a>
								</p>
								<p>
									(3) &nbsp;The maximum size of the file
									should be 1MB or less.
								</p>
							</div>
							<div className={styles.bottom}>
								<div>
									<span>
										Reconciliation Type
										<span style={{ color: "red" }}>*</span>
									</span>
									<div className={styles.input}>
										<select>
											<option>
												Completes and Adjusted
												Termination
											</option>
											<option>
												Post Survey Termination
											</option>
											<option>
												Security Disqualification
											</option>
										</select>
									</div>
								</div>
								<div>
									<span>
										ID Type
										<span style={{ color: "red" }}>*</span>
									</span>
									<div className={styles.input}>
										<select>
											<option>RID</option>
											<option>PID</option>
										</select>
									</div>
								</div>
								<div>
									<span>
										Upload a file
										<span style={{ color: "red" }}>*</span>
									</span>
									<div className={styles.file_input}>
										<input
											type='file'
											onChange={handleReconciliationbtn}
										/>
									</div>
								</div>
								<div className={styles.continue_btn}>
									<button>Continue</button>
								</div>
								<div className={styles.note}>
									<p>
										<span style={{ color: "red" }}>
											Note:
										</span>{" "}
										&nbsp; Please do not reconcile a survey
										until it has been completed. Doing so
										may cause delays in field. If you have
										any questions please contact our support
										team.
									</p>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={2} style={{ width: "80%" }}>
						<div className={styles.data_analysis_section}>
							<div>
								<span>Field Dates (mm/dd/yyyy)</span>
								<span>From</span>
								<input type='date' />
								<span>To</span>
								<input type='date' />
							</div>
							<div>
								<span>Status</span>
								<select>
									<option>All</option>
									<option>Complete</option>
									<option>Over Quota</option>
									<option>Prescreens</option>
									<option>Security Drops</option>
									<option>Terminates</option>
								</select>
							</div>
							<div className={styles.export_to_excel_btn}>
								<button>Export To Excel</button>
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={3} style={{ width: "80%" }}>
						<div className={styles.term_details_section}>
							<div className={styles.section}>
								<span>Supplier</span>
								<select>
									<option>Please Select a supplier</option>
								</select>
							</div>
							<div className={styles.section}>
								<span>Link Type</span>
								<select>
									<option>--All--</option>
									<option>APIDelivered / Standalone</option>
									<option>Offerwall / Standalone</option>
									<option>Passthrough / Standalone</option>
									<option>Targeted / Standalone</option>
									<option>
										Yeild Management / Standalone
									</option>
								</select>
							</div>
							<div className={styles.section}>
								<span>Target Type</span>
								<select>
									<option>--All</option>
									<option>Targeted</option>
									<option>Route</option>
								</select>
							</div>
							<div className={styles.generate_report_btn}>
								<button>Generate Report</button>
							</div>
						</div>
					</TabPanel>
				</div>
			</div>
		</>
	)
}

export const ReconciliationTable = ({ sessionsCopy, showTable }) => {
	console.log(sessionsCopy)
	return (
		<>
			<table
				id='table-to-xls'
				style={{ display: showTable ? "" : "none" }}
			>
				<thead>
					<tr>
						<th>RID</th>
						<th>SRC ID</th>
						<th>Client Status</th>
						<th>IP</th>
						<th>Mirats Code</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{sessionsCopy?.map(session => {
						console.log(Object.keys(session).length)
						if (Object.keys(session).length) {
							console.log("condition macteh")
							return (
								<tr>
									<td>{session?.rid}</td>
									<td>{session?.srcid}</td>
									<td>{session?.client_status}</td>
									<td>{session?.geo_data?.ip}</td>
									<td></td>
									<td>
										{new Date(
											session?.date?.seconds * 1000
										).toLocaleDateString("en-US")}
									</td>
								</tr>
							)
						}
					})}
				</tbody>
			</table>
		</>
	)
}

export default Reconciliations
