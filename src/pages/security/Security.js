import React, { useState } from "react"
import Header from "../../components/header/Header"
import Subheader from "../../components/subheader/Subheader"
import styles from "./Security.module.css"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { AiFillInfoCircle } from "react-icons/ai"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

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

const screenerSide = [
	{
		name: "completes",
		not_allowed: true,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "terminates",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "security failures",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "overquota",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "in screener/ drops",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "pre client survey processes",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "financial terms",
		not_allowed: false,
		single_survey: "allow",
		survey_grp: "allow",
	},
]

const clientSide = [
	{
		name: "completes",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "terminates",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "security failures",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
	{
		name: "overquota",
		not_allowed: false,
		single_survey: "block",
		survey_grp: "block",
	},
]

const Security = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<>
			<Header />
			<Subheader />
			<div className={styles.security_page}>
				<p className={styles.page_title}>Survey Security settings</p>
				<div className={styles.security_head}>
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
				<div className={styles.main}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						sx={{ borderRight: 1, borderColor: "divider" }}
					>
						<Tab label='Security Settings' {...a11yProps(0)} />
						<Tab label='Re-Entry Configuration' {...a11yProps(1)} />
						<Tab label='IP Address Exclusion' {...a11yProps(2)} />
						<Tab label='PID Exclusion' {...a11yProps(3)} />
					</Tabs>
					<TabPanel value={value} index={0} style={{ width: "80%" }}>
						<div className={styles.security_settings}>
							<div className={styles.validation_setting_header}>
								<p
									className={
										styles.security_settings_instruction
									}
								>
									<AiFillInfoCircle
										size={23}
										color='#a7a70a'
										style={{ marginRight: "10px" }}
									/>
									Please note that security settings are
									defaulted at the Account level. You can
									update settings for each survey as needed.
								</p>
								<button className={styles.save_btn}>
									Save
								</button>
							</div>
							<div class={styles.validation_settings_content}>
								<h1 class={styles.validation_settings_legend}>
									Survey Validation
								</h1>

								<ul class={styles.validation_settings_list}>
									<li class={styles.validation_settings_item}>
										<label
											class={
												styles.validation_settings_label
											}
										>
											<input type='checkbox' />
											Verify CallBack
										</label>
									</li>
									<li class={styles.validation_settings_item}>
										<label
											class={
												styles.validation_settings_label
											}
										>
											<input type='checkbox' />
											Unique IP Address
										</label>
									</li>
									<li class={styles.validation_settings_item}>
										<label
											class={
												styles.validation_settings_label
											}
										>
											<input type='checkbox' />
											Unique PID
										</label>
									</li>
								</ul>
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={1} style={{ width: "80%" }}>
						<div className={styles.re_entry_config}>
							<p className={styles.tab_title}>Screener/Client</p>

							<div className={styles.screener_side_section}>
								<p className={styles.table_head}>
									Screener Side
								</p>
								{screenerSide.map((side, index) => (
									<div
										className={styles.screener_side}
										key={index}
									>
										<div>
											<div className={styles.left}>
												<p className={styles.left_name}>
													{side.name}
												</p>
												<div>
													{index == 0 && (
														<label>
															single survey
														</label>
													)}

													<select
														disabled={
															side.not_allowed
														}
														className={
															styles.single_survey_select_field
														}
													>
														<option>Block</option>
														<option>Allow</option>
													</select>
												</div>
											</div>

											<div className={styles.right}>
												{index == 0 && (
													<label>survey group</label>
												)}

												<select
													disabled={side.not_allowed}
													className={
														styles.single_survey_select_field
													}
												>
													<option>Block</option>
													<option>Allow</option>
												</select>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className={styles.client_side_section}>
								<p className={styles.table_head}>Client Side</p>
								<label>single survey</label>
								<label>survey group</label>
								{clientSide.map((side, index) => (
									<div className={styles.client_side}>
										<div>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "flex-end",
												}}
											>
												<p
													style={{
														width: "10rem",
														textAlign: "end",
													}}
												>
													{side.name}
												</p>

												<select
													disabled={side.not_allowed}
													className={
														styles.single_survey_select_field
													}
												>
													<option>Block</option>
													<option>Allow</option>
												</select>
											</div>

											<select
												disabled={side.not_allowed}
												className={
													styles.survey_grp_select_field
												}
											>
												<option>Block</option>
												<option>Allow</option>
											</select>
										</div>
									</div>
								))}
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={2} style={{ width: "80%" }}>
						<div className={styles.ip_address_exclusion}>
							<h2>IP Adress Exclusion</h2>
							<h3>Instructions:</h3>
							<div className={styles.ip_data}>
								<p>Ensure file in .txt format</p>
								<p>
									Seperate each IP Adress inone time{" "}
									<a href='#'>(View Sample Code)</a>
								</p>
								<p>
									A blank line will be considered an invalid
									entry
								</p>
								<p>Maximum number of IPs 4DK</p>
								<div className={styles.file_input}>
									<label>FILENAME</label>
									<input
										type='file'
										className={styles.input}
									/>
								</div>
							</div>
						</div>
						<div className={styles.ip_data_btns}>
							<button>Save</button>
							<button>Delete All Records</button>
						</div>
					</TabPanel>
					<TabPanel value={value} index={3} style={{ width: "80%" }}>
						<div className={styles.ip_address_exclusion}>
							<h2>PID Exclusion</h2>
							<h3>Instructions:</h3>
							<div className={styles.ip_data}>
								<p>Ensure file in .txt format</p>
								<p>
									Seperate each IP Adress inone time{" "}
									<a href='#'>(View Sample Code)</a>
								</p>
								<p>
									A blank line will be considered an invalid
									entry
								</p>
								<p>Maximum number of IPs 4DK</p>

								<div className={styles.file_input}>
									<label>Supplier</label>
									<select>
										<option>--Select Supplier--</option>
									</select>
									<input type='file' />
								</div>
							</div>
						</div>
						<div className={styles.ip_data_btns}>
							<button>Save</button>
							<button>Delete All Records</button>
						</div>
					</TabPanel>
				</div>
			</div>
		</>
	)
}

export default Security
