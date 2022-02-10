import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"
import { IoArrowBackOutline } from "react-icons/io5"
import { GrLinkNext } from "react-icons/gr"
import Logo from "../../assets/images/insights.png"
import "./SurveyQuestions.css"
import BlazeContextProvider, { useBlazeContext } from "../blaze/BlazeContext"
import Loader from "../../components/loader/Loader"
import ErrorPage from "../../components/error-page/ErrorPage"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { decryptText, encryptText } from "../../utils/enc-dec.utils"
import { db } from "../../firebase"
import {
	addQualificationResponse,
	getSession,
} from "../../utils/firebaseQueries"

const data = [
	{
		id: 2,
		question: "What is your age",
		desc: "Please give your response",
		answerType: "input",
	},
	{
		id: 3,
		question: "Why are You investing",
		desc: "Please give your response",
		answerType: "options",
		options: [
			"Making big purchase",
			"Retirement",
			"Children's education",
			"Building Future house",
		],
	},
	{
		id: 4,
		question: "Why are your gender",
		desc: "Please give your response",
		answerType: "textarea",
	},
	{
		id: 5,
		question: "Why are You investing",
		desc: "Please give your response",
		answerType: "select",
		options: [
			"Making big purchase",
			"Retirement",
			"Children's education",
			"Building Future house",
		],
	},
]

const SurveyQuestions = () => {
	let { encryptedID, questionNumber } = useParams()
	const [questionIDS, setQuestionIDS] = useState([])
	const [question, setQuestion] = useState({})
	const [questionCnt, setQuestionCnt] = useState(0)
	questionNumber = parseInt(questionNumber)
	var sid = decryptText(encryptedID?.split("-")[0])
	const [errCode, setErrCode] = useState(null)
	const [errMsg, setErrMsg] = useState(null)
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState()
	const [multiPunchResp, setMultiPunchRes] = useState([]) // special state for multipunch repsonse
	const [sessionID, setSessionID] = useState()
	const [error, setError] = useState(null)
	const history = useHistory()
	const [nextQNumber, setNextQNumber] = useState()

	// const handleNextBtn = () => {
	// 	console.log("next btn")
	// 	questionIDS.map((QQ, index) => {
	// 		// QQ - Qualification question object
	// 		let terminate = false
	// 		if (QQ?.question_id === String(questionNumber)) {
	// 			switch (question.question_type) {
	// 				case "Single Punch":
	// 					if (QQ?.options.includes(response)) {
	// 						console.log("single punch matched")
	// 						setResponses([...responses, response])
	// 					} else {
	// 						console.log("single punch not matched")
	// 						setErrCode(123)
	// 						setErrMsg("Not Qualified for the survey")
	// 						terminate = true
	// 					}
	// 					break
	// 				case "Multi Punch":
	// 					multiPunch.map(punch => {
	// 						if (QQ.options.includes(punch)) {
	// 							console.log("punch matched ", punch)
	// 							setResponses([...responses, response])
	// 						} else {
	// 							console.log("punched not mached ", punch)
	// 							setErrCode(123)
	// 							setErrMsg("Not Qualified for the survey")
	// 							terminate = true
	// 						}
	// 					})
	// 					break

	// 				case "Numeric - Open-end":
	// 					const x = parseInt(response)
	// 					let flag = false
	// 					QQ?.options.map(opt => {
	// 						if (opt.includes("-")) {
	// 							if (
	// 								parseInt(opt.split("-")[0]) <= x &&
	// 								parseInt(opt.split("-")[1]) >= x
	// 							) {
	// 								flag = true
	// 								return
	// 							}
	// 						} else {
	// 							if (parseInt(opt) === x) {
	// 								flag = true
	// 								return
	// 							}
	// 						}
	// 					})
	// 					if (flag) {
	// 						console.log("pincode exist")
	// 					} else {
	// 						terminate = true
	// 						setErrCode(123)
	// 						setErrMsg("Not Qualified for the survey")
	// 					}
	// 					setResponses([...responses, response])
	// 					break
	// 				default:
	// 					return
	// 			}

	// 			console.log(questionIDS[index + 1].question_id)
	// 			setQuestionCnt(index + 1)
	// 			// if respondent attended question correctly then move to the next question
	// 			if (!terminate)
	// 				history.push(
	// 					`/blaze/${encryptedID}/questions/${
	// 						questionIDS[index + 1].question_id
	// 					}`
	// 				)
	// 			return
	// 		}
	// 	})

	// 	setResponse("")
	// }

	const handleSinglePunch = () => {
		if (question?.valid_options.includes(response)) {
			setError("")
		} else {
			setError("Choosed option is not the correct one")
		}
	}

	const handleMultiPunch = () => {
		let count = 0
		let wanted_cnt = question?.conditions?.to_be_checked?.length
		question?.conditions?.to_be_checked.map(option => {
			if (multiPunchResp.includes(option)) {
				count++
			}
		})
		if (multiPunchResp.length < question?.conditions?.how_many?.min) {
			setError(
				`Select Minimum ${question?.conditions?.how_many?.min} options`
			)
		} else if (multiPunchResp.length > question?.conditions?.how_many.max) {
			console.log("first condition not matched")
			setError(
				`Select maximum ${question?.conditions?.how_many?.max} options`
			)
		} else if (wanted_cnt !== count) {
			console.log("choose valid options")
			setError("Choose valid options")
		} else {
			setError("")
		}
	}

	const handleOpenEnd = () => {
		console.log(response)
	}

	const handleNextBtn = () => {
		switch (question?.question_type) {
			case "Single Punch":
				handleSinglePunch()
				break
			case "Multi Punch":
				handleMultiPunch()
				break
			case "Numeric - Open-end":
				handleOpenEnd()
				break
			default:
				return
		}
		// if (!error) {
		//   history.push(`/blaze/${encryptedID}/questions/${nextQNumber}`);
		// }
	}

	const hanldeAgeNextbtn = () => {
		console.log(question)

		addQualificationResponse(sid, sessionID, { response })
			.then(res => console.log(res))
			.catch(err => console.log(err))

		history.push(`/blaze/${encryptedID}/questions/${question.question_id}`)
	}

	const handleMultiPunchChange = e => {
		if (e.target.checked) {
			setMultiPunchRes([...multiPunchResp, e.target.value])
		} else {
			setMultiPunchRes(
				multiPunchResp.filter(val => val != e.target.value)
			)
		}
	}

	useEffect(() => {
		const func = async () => {
			await getSession(sid, setSessionID)
		}
		func()
	}, [])

	// fetch the question, options and its related data according to question number and set the question state
	useEffect(() => {
		if (questionNumber === 42) {
			setQuestion({
				question_text: "What is Your Age?",
				question_type: "Numeric - Open-end",
				question_id: 61442,
			})
			return
		}
		const func = async () => {
			const question_options = await getDoc(
				doc(db, "mirats", "surveys", "survey", sid)
			)
			question_options
				.data()
				?.qualifications?.questions.map((q, index) => {
					if (q?.question_id === String(questionNumber)) {
						setQuestion(oldData => {
							return { ...oldData, ...q }
						})
						console.log(
							question_options.data()?.qualifications?.questions[
								index + 1
							]?.question_id
						)
						setNextQNumber(
							question_options.data()?.qualifications?.questions[
								index + 1
							]?.question_id
						)
					}
				})
			const q = await getDoc(
				doc(
					db,
					"mirats",
					"Qualifications",
					"QuestionLibrary",
					String(questionNumber)
				)
			)
			setQuestion(oldData => {
				return {
					...oldData,
					...q.data().lang["ENG-IN"],
					question_type: q.data().question_type,
				}
			})
			// setQuestion({
			// 	...q.data().lang["ENG-IN"],
			// 	question_type: q.data().question_type,
			// })
		}
		func()
	}, [questionNumber])

	console.log(question)

	return (
		<>
			{loading && !errCode && !errMsg && <Loader />}
			{!loading && errCode && errMsg && (
				<ErrorPage errCode={errCode} errMsg={errMsg} />
			)}
			{!loading && !errMsg && !errCode && (
				<div className='survey_page'>
					<div className='line_design'></div>
					<div className='survey_page_question_options'>
						<p className='survey_page_question'>
							{question?.question_text}
						</p>
						<div className='survey_question_response_section'>
							{(() => {
								switch (question.question_type) {
									case "Single Punch":
										return (
											<div>
												{error && (
													<span
														style={{ color: "red" }}
													>
														{error}
													</span>
												)}
												{question?.display_options.map(
													(option, index) => (
														<div
															className='survey_question_option'
															key={index}
														>
															<input
																type='radio'
																id={option}
																name='option'
																value={
																	index + 1
																}
																onChange={e =>
																	setResponse(
																		e.target
																			.value
																	)
																}
															/>
															<label
																htmlFor={option}
															>
																{
																	question
																		?.options[
																		option
																	]
																}
															</label>
														</div>
													)
												)}
											</div>
										)
									case "Multi Punch":
										return (
											<div className='multi_punch'>
												{error && (
													<span
														style={{ color: "red" }}
													>
														{error}
													</span>
												)}
												{question?.display_options.map(
													(option, index) => (
														<div className='inputGroup'>
															<input
																id={index}
																name='option'
																type='checkbox'
																value={
																	index + 1
																}
																onChange={
																	handleMultiPunchChange
																}
															/>
															<label
																htmlFor={index}
															>
																{
																	question
																		?.options[
																		option
																	]
																}
															</label>
														</div>
													)
												)}
											</div>
										)
									case "Numeric - Open-end":
										return (
											<div>
												<input
													type='text'
													className='survey_page_input'
													placeholder='Your response'
													value={response}
													onChange={e => {
														setResponse(
															e.target.value
														)
													}}
												/>
											</div>
										)
									case "Text - Open-end":
										return (
											<div>
												<input
													type='text'
													className='survey_page_input'
													placeholder='Your response'
													value={response}
													onChange={e => {
														setResponse(
															e.target.value
														)
														console.log(
															e.target.value
														)
													}}
												/>
											</div>
										)
									case "textarea":
										return (
											<div>
												<textarea
													className='survey_page_textarea'
													placeholder='Your answer'
													value={response}
													onChange={e =>
														setResponse(
															e.target.value
														)
													}
												/>
											</div>
										)
									case "select":
										return (
											<div>
												<select
													className='survey_page_select'
													onChange={e =>
														setResponse(
															e.target.value
														)
													}
												>
													{data[
														questionNumber - 1
													].options.map(
														(option, index) => (
															<option key={index}>
																{option}
															</option>
														)
													)}
												</select>
											</div>
										)
									default:
										return
								}
							})()}
						</div>
						<div className='survey_page_btns'>
							<div className='survey_page_next_btn'>
								{questionCnt + 1 === questionIDS.length ? (
									<Link to='#' className='finish_btn'>
										Finish
									</Link>
								) : (
									<button
										onClick={() =>
											questionNumber === 42
												? hanldeAgeNextbtn()
												: handleNextBtn()
										}
										className='next_btn'
									>
										Next
									</button>
								)}
							</div>
						</div>
					</div>
					{/* <div className="powered_by_text">
            <span>
              Powered by <span>Mirats Insights</span>
            </span>
            <div className="privacy_terms">
              <span>
                <a href="#">Privacy Policy</a> | <a href="#">General Terms</a>
              </span>
            </div>
          </div> */}
				</div>
			)}
		</>
	)
}

export default SurveyQuestions
