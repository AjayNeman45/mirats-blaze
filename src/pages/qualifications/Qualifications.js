import React from "react"
import Header from "../../components/header/Header"
import Subheader from "../../components/subheader/Subheader"
import styles from "./Qualifications.module.css"

const tableData = [
	{
		order: 1,
		qualification_name: "AGE: 18 years old or older",
		conditions: ["18-99"],
		status: "Active",
		functions: ["Edit", "Preview", "Inactive", "Targetable"],
	},
	{
		order: 2,
		qualification_name: "GENDER: All genders",
		conditions: ["Any Condition pass"],
		status: "Active",
		functions: ["Edit", "Preview", "Inactive", "Targetable"],
	},
	{
		order: 3,
		qualification_name: "Number of employees",
		conditions: ["101-500", "501-1000", "1001-5000"],
		status: "Active",
		functions: ["Edit", "Preview", "Inactive", "Targetable"],
	},
]

const Qualifications = () => {
	return (
		<>
			<Header />
			<Subheader />
			<div className={styles.qualification_page}>
				<div className={styles.head_section}>
					<div className={styles.head_section_left}>
						<p className={styles.title}>Survey Qualifications</p>
					</div>
					<div className={styles.head_section_right}>
						<div className={styles.survey_status_search}>
							<select className={styles.select_input_field}>
								<option value='all'>All</option>
								<option value='active'>Active</option>
								<option value='inactive'>Inactive</option>
							</select>
						</div>
						<div className={styles.survay_name_search}>
							<input type='text' />
						</div>
						<div className={styles.head_section_right_btns}>
							<button className={styles.search_btn}>Seach</button>
							<button className={styles.add_qualification_btn}>
								Add Qualification
							</button>
							<button className={styles.manage_logic_btn}>
								Add Logic
							</button>
						</div>
					</div>
				</div>
				<div className={styles.survey_info_section}>
					<div className={styles.survey_name}>
						<label>Survey</label>
						<p>MIR16908590-IRB 2201007 - PH - [MA] - MIRATS5241</p>
					</div>
					<div className={styles.client_name}>
						<label>Client</label>
						<p> Mirats Insights API_Client</p>
					</div>
					<div className={styles.field_end_date}>
						<label>Field End Date</label>
						<p>Feb 18 2022 05:09:12 PM CST</p>
					</div>
				</div>
				<div className={styles.table_section}>
					<table className={styles.qualification_table}>
						<thead>
							<tr>
								<th>Order</th>
								<th>Qualification</th>
								<th>Condition</th>
								<th>Status</th>
								<th>Function</th>
							</tr>
						</thead>
						<tbody>
							{tableData.map((data, index) => {
								return (
									<tr>
										<td>{data.order}</td>
										<td>{data.qualification_name}</td>
										<td>
											{data.conditions.length > 1 && (
												<span
													style={{ fontSize: "10px" }}
												>
													One or More from:{" "}
												</span>
											)}
											{data.conditions.map(
												(condition, index) => (
													<span
														key={index}
														className={
															styles.condition_tag
														}
													>
														{condition}
													</span>
												)
											)}
										</td>
										<td>{data.status}</td>
										<td
											className={
												styles.table_function_col
											}
										>
											{data.functions.map(
												(funct, index) => (
													<span>{funct}</span>
												)
											)}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Qualifications
