import { Menu, MenuItem, Select } from "@mui/material"
import React, { useState } from "react"
import { FaInfoCircle } from "react-icons/fa"
import Header from "../../components/header/Header"
import Subheader from "../../components/subheader/Subheader"
import styles from "./Allocations.module.css"
import { GrDown } from "react-icons/gr"
import ProjectInfo from "../../components/project-info/ProjectInfo"

const Allocations = () => {
	return (
		<>
			<Header />
			<Subheader />
			<div>
				<ProjectInfo />
				<div className={styles.allocations_info}>
					<div className={styles.allocations_info_left}>
						<div className={styles.allocations_info_section}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<label>calculation type</label> &nbsp;
								<FaInfoCircle color='gray' />
							</div>
							<div>
								<span>Completes</span> &nbsp;
								<span style={{ color: "blue" }}>edit</span>
							</div>
						</div>
						<div className={styles.allocations_info_section}>
							<label>quota</label> &nbsp;
							<span>99</span>
						</div>
						<div className={styles.allocations_info_section}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<label>field end date</label>&nbsp;
								<FaInfoCircle color='gray' />
							</div>
							<span>-</span>
						</div>
						<div className={styles.allocations_info_section}>
							<label>completes</label>&nbsp;
							<span>0</span>
						</div>
						<div className={styles.allocations_info_section}>
							<label>conversion</label>&nbsp;
							<span>0%</span>
						</div>
						<div className={styles.allocations_info_section}>
							<label>survey cpi</label>&nbsp;
							<span>$ 0.50</span>
						</div>
					</div>
				</div>
				<div className={styles.marketplace_suppliers}>
					<p className={styles.title}>Marketplace suppliers</p>
					<div className={styles.btns_filters}>
						<div className={styles.left}>
							<button>Import Template</button>
							<button>Import Template</button>
						</div>
						<div className={styles.right}>
							<select>
								<option>All supplier types</option>
								<option>Loylty panels</option>
								<option>Non-panels</option>
								<option>Survey panels</option>
							</select>
							<input type='text' placeholder='Search Suppliers' />
						</div>
					</div>
					<h6 className={styles.instruction}>
						Select one or more suppliers to Add to Group, Ungroup or
						Block.
					</h6>
					<div className={styles.suppliers_table}>
						<table>
							<thead>
								<tr>
									<th>
										<input type='checkbox' />
									</th>
									<th>Name</th>
									<th>Allocation</th>
									<th>Prescreens</th>
									<th>Completes</th>
									<th>Conversion</th>
									<th>Allocation Remaining</th>
									<th>Total Remaining</th>
									<th>Avg CPI</th>
									<th>CPI</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<input type='checkbox' />
									</td>
									<td>
										<GrDown /> &nbsp; Top Suppliers Group(3)
									</td>
									<td>0 %</td>
									<td>0</td>
									<td>0</td>
									<td>-</td>
									<td>0</td>
									<td>99</td>
									<td>$0.00</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className={styles.external_supply_sources}>
					<p className={styles.title}>External Supply Sources</p>
					<button className={styles.add_supplier_btn}>
						Add Supplier
					</button>
					<h6 className={styles.instruction}>
						There are no External Supply Sources registered yet
					</h6>
				</div>
			</div>
		</>
	)
}

export default Allocations
