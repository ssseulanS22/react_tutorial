import "./MainView.css";

import { useEffect, useRef, useState } from "react";
import { getDate } from "./DateView.jsx";
import { getSingleDiary, updateDiary } from "../api/diary.js";

function MainView() {
  /** 오늘날짜 */
  const now = new Date();
  const [today, setToday] = useState(() => {
    return getDate(now);
  });
  const formatDate = today.formatDate;
  const md = today.mmdd;
  const ymd = today.yy + md;

  /** 날짜이동 */
  const moveDate = (arrow) => {
    console.log(arrow);
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
      const item = await getSingleDiary(ymd);
      if (item) {
        setContents(item.contents);
      }
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
          <span onClick={moveDate("P")}> &nbsp; ← &nbsp; </span>
          <span>{formatDate}</span>
          <span onClick={moveDate("N")}> &nbsp; → &nbsp; </span>
        </div>
        <div>
          <button
            className="history-btn"
            onClick={() => {
              // HistoryView 화면으로 전환
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
