import "./MainView.css";

function MainView() {
  /** 오늘날짜 */
  const now = new Date();
  const today = {
    year: now.getFullYear(),
    month: ("0" + (now.getMonth() + 1)).slice(-2),
    date: ("0" + now.getDate()).slice(-2),
    sep: "-",
  };
  const fullDate =
    today.year + today.sep + today.month + today.sep + today.date;

  /** 질문 */
  let question = "";
  fetch(
    "https://raw.githubusercontent.com/hackurity01/simple-diary/main/src/questions.json",
  ).then((res) => {
    console.log(res);
  });
  return (
    <>
      <div className="header">
        <div>{fullDate}</div>
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
          onChange={() => {
            console.log("onChange");
          }}
        />
      </div>
    </>
  );
}

export default MainView;
