import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { getAllSessions } from "../../utils/firebaseQueries";
import XLSX from "xlsx";
import styles from "./Reconciliations.module.css";
import { ReconciliationTable } from "./Reconciliations";
import { v4 as uuid } from "uuid";

const statusData = [
  {
    name: "all",
    label: "All",
    default_checked: true,
  },
  {
    name: "completed",
    label: "Completed",
  },
  {
    name: "over-quota",
    label: "Over Quota",
  },
  {
    name: "terminated",
    label: "Terminated",
  },
  {
    name: "in-client-survey",
    label: "In Client Survey",
  },
];

const DataAnalysis = () => {
  const [sessions, setSessions] = useState([]);
  const [sessionsCopy, setSessionsCopy] = useState([]);
  const [filterByStatus, setFilterByStatus] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [endDate, setEndDate] = useState();
  const [checkedStatus, setCheckedStatus] = useState(["all"]);
  const [msg, setMsg] = useState("");
  const { projectId } = useParams();

  let default_from_date, default_end_date;
  // fetching all the sessions of the project
  useEffect(() => {
    var dt = new Date();
    dt.setDate(dt.getDate() + 29);
    setFromDate(new Date().toISOString().substring(0, 10));
    setFromDate(new Date().toISOString().substring(0, 10));
    setEndDate(dt.toISOString().substring(0, 10));

    setEndDate(dt.toISOString().substring(0, 10));

    const func = async () => {
      const surveyRef = collection(db, "mirats", "surveys", "survey");
      const q = await getDocs(
        query(surveyRef, where("project_id", "==", parseInt(projectId)))
      );
      q.forEach(async (doc) => {
        const sid = doc.data().survey_id;
        try {
          const allSessions = await getAllSessions(sid);
          allSessions.forEach((session) => {
            setSessions((oldData) => [...oldData, session.data()]);
            setSessionsCopy((oldData) => [...oldData, session.data()]);
          });
        } catch (err) {
          console.log(err);
        }
      });
    };
    func();
  }, []);

  // handles status change function
  const handleFilterChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    // setCheckedStatus(prevState => prevState.set(item, isChecked)])
    // setStatus(e.target.value)
    console.log(e.target.name);
    if (e.target.checked) {
      setCheckedStatus([...checkedStatus, e.target.name]);
      // setFilterByStatus([...filterByStatus, e.target.value])
    } else {
      setCheckedStatus(
        checkedStatus.filter((filter) => filter != e.target.name)
      );
    }
  };
  console.log(checkedStatus);

  // handles show table btn
  const handleShowTable = () => {
    setSessionsCopy([]);

    let from_d = new Date(fromDate);
    let end_d = new Date(endDate);
    // console.log(from_d, end_d)
    if (from_d != "Invalid Date" && end_d != "Invalid Date") setMsg("");
    else {
      setMsg("Select field date to filter");
      setShowTable(false);
      return;
    }
    setSessionsCopy(() => {
      let temp = [];
      sessions.map((session) => {
        if (
          new Date(session?.date?.toDate()).valueOf() >= from_d.valueOf() &&
          new Date(session?.date?.toDate()).valueOf() <= end_d.valueOf()
        ) {
          setShowTable(true);
          if (checkedStatus.includes("all")) {
            temp.push(session);
          } else if (!checkedStatus.length) temp.push(session);
          else if (checkedStatus.includes(session?.client_status))
            temp.push(session);
        }
      });
      return temp;
    });
  };

  // handles Download To Excel btn
  const DownloadToExcel = (filename) => {
    console.log("download excel function called");
    var elt = document.getElementById("table-to-xls");
    var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
    return XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    // <></>
    <>
      <div className={styles.data_analysis_section}>
        <div className={styles.filter_by_field_Date}>
          <span>Field Dates (mm/dd/yyyy)</span>
          <span>From</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <span>To</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.filter_by_status}>
          {statusData?.map((st) => {
            const id = uuid();
            return (
              <div key={id}>
                <input
                  type="checkbox"
                  id={st?.name}
                  name={st.name}
                  checked={checkedStatus.includes(st?.name)}
                  onChange={handleFilterChange}
                />
                <lable htmlFor={st?.name}>{st?.label}</lable>
              </div>
            );
          })}
        </div>
        {msg.length ? (
          <p
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            {msg}
          </p>
        ) : null}
        <div className={styles.export_to_excel_btn}>
          <button type="button" onClick={DownloadToExcel}>
            Export To Excel
          </button>
          &nbsp;
          {<button onClick={handleShowTable}>Show Table</button>}
        </div>
      </div>
      <br />
      <div className={styles.data_analysis_table}>
        <ReconciliationTable
          sessionsCopy={sessionsCopy}
          showTable={showTable}
        />
      </div>
    </>
  );
};
export default DataAnalysis;
