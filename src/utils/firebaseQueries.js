import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
} from "firebase/firestore"
import { db } from "../firebase"

const fetchIP = async () => {
	let url = "https://get.geojs.io/v1/ip.json"
	const response = await fetch(url)
	return response.json()
}

export const getSession = async (surveyID, setSessionID) => {
	const sessions = await getDocs(
		collection(db, "mirats", "surveys", "survey", surveyID, "Sessions")
	)
	sessions.forEach(session => {
		fetchIP().then(data => {
			if (session.data()?.geo_data.ip === data.ip) {
				setSessionID(session.id)
				return
			}
		})
	})
}

export const updateSession = async (surveyID, sessionID, body) => {
	return await updateDoc(
		doc(db, "mirats", "surveys", "survey", surveyID, "Sessions", sessionID),
		{
			...body,
		}
	)
}

export const addSession = async (
	surveyID,
	sessionTechnicalDetails,
	geoData,
	srcID,
	rID
) => {
	return await addDoc(
		collection(db, "mirats", "surveys", "survey", surveyID, "Sessions"),
		{
			session_techincal_details: sessionTechnicalDetails,
			geo_data: geoData,
			srcid: srcID,
			rid: rID,
		}
	)
}

export const getSurvey = async surveyID => {
	const survey = await getDoc(
		doc(db, "mirats", "surveys", "survey", surveyID)
	)
	return survey.data()
}

export const getAllSurveys = async () => {
	return await getDocs(collection(db, "mirats", "surveys", "survey"))
}

export const getAllSessions = async surveyID => {
	console.log(surveyID)
	return await getDocs(
		collection(
			db,
			"mirats",
			"surveys",
			"survey",
			String(surveyID),
			"Sessions"
		)
	)
}

export const addQualificationResponse = async (surveyID, sessionID, body) => {
	return await updateDoc(
		doc(
			db,
			"mirats",
			"surveys",
			"survey",
			String(surveyID),
			"Sessions",
			String(sessionID)
		),
		body
	)
}
