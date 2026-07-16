import "./MainView.css";

import { useEffect, useRef, useState } from "react";
import { getTextDate } from "./DateView.jsx";
import { selectSingleDiary, updateDiary } from "../api/diary.js";

function MainView(props) {
  /** 오늘날짜 */
  const [date, setDate] = useState(new Date());
  const today = getTextDate(date);
  const formatDate = today.formatDate;
  const md = today.mmdd;
  const ymd = today.yy + md;

  /** 날짜이동 */
  const moveDate = (arrow) => {
    setContents("");
    setDate((prev) => {
      if (arrow == "T") {
        return new Date();
      } else {
        const next = new Date(prev);
        next.setDate(next.getDate() + (arrow == "P" ? -1 : +1));

        // 오늘 이후 금지
        const maxDate = new Date();
        next.setHours(0, 0, 0, 0);
        maxDate.setHours(0, 0, 0, 0);

        return next < maxDate ? next : maxDate;
      }
    });
  };

  /** 질문 */
  const [question, setQuestion] = useState("");
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ssseulanS22/react_tutorial/main/public/resources/questions.json",
    )
      .then((res) => {
        return res.json();
      })
      .then((item) => {
        setQuestion(item[md]);
      });
  }, [md]);

  /** 내용 */
  const [contents, setContents] = useState("");
  useEffect(() => {
    async function fetchEntry() {
      const item = await selectSingleDiary(ymd);
      setContents(item ? item.contents : "");
    }
    fetchEntry();
  }, [ymd]);

  /** 등록/수정 */
  const saveTimer = useRef(null);

  const handleContentsChange = (e) => {
    const value = e.target.value;
    setContents(value);

    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      updateDiary(ymd, question, value);
    }, 500);
  };

  /** 리턴 */
  return (
    <>
      <div className="header">
        <div>
          <span onClick={() => moveDate("P")}> &nbsp; ← &nbsp; </span>
          <span>{formatDate}</span>
          <span onClick={() => moveDate("N")}> &nbsp; → &nbsp; </span>
          <span onClick={() => moveDate("T")}> &nbsp; 오늘 &nbsp; </span>
        </div>
        <div>
          <button
            className="history-btn"
            onClick={() => {
              props.setView("history");
            }}
          >
            기록 보기
          </button>
        </div>
      </div>
      <div className="question">{question}</div>
      <div className="content">
        <textarea
          className="contents"
          value={contents}
          onChange={handleContentsChange}
        />
      </div>
    </>
  );
}

export default MainView;
