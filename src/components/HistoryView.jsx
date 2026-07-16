import "./HistoryView.css";
import { selectMultiDiaries, deleteDiary } from "../api/diary.js";
import { useEffect, useState } from "react";
import { getTextDate } from "./DateView.jsx";
function HistoryView(props) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getDiaries() {
      const item = await selectMultiDiaries();
      setHistory(item);
    }
    getDiaries();
  }, []);

  const delDiary = async (ymd) => {
    await deleteDiary(ymd);
    setHistory((prev) => prev.filter((diary) => diary.diary_date != ymd));
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="back-btn"
          onClick={() => {
            props.setView("main");
          }}
        >
          &lt;
        </button>
        <h4>다이어리 기록</h4>
      </div>
      {history &&
        history.map((diary) => {
          const today = getTextDate(diary.diary_date);
          const formatDate = today.formatDate;
          return (
            <div className="diary-item" key={diary.diary_date}>
              <span>
                <div className="diary-date">{formatDate}</div>
                <div>
                  <h4>Q. {diary.topic}</h4>
                </div>
                <div>A. {diary.contents}</div>
              </span>
              <span>
                <button onClick={() => delDiary(diary.diary_date)}>X</button>
              </span>
            </div>
          );
        })}
    </>
  );
}
export default HistoryView;
