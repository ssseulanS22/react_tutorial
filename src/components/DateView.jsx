export function getTextDate(param) {
  const dayArr = ["일", "월", "화", "수", "목", "금", "토"];
  let now = new Date();
  if (typeof param === "string" && param.length === 8) {
    const textDate = [
      Number(param.slice(0, 4)),
      Number(param.slice(4, 6)) - 1,
      Number(param.slice(6, 8)),
    ];
    now = new Date(textDate[0], textDate[1], textDate[2]);
  } else {
    now = param;
  }

  const date = {
    year: now.getFullYear(),
    month: ("0" + (now.getMonth() + 1)).slice(-2),
    date: ("0" + now.getDate()).slice(-2),
    day: dayArr[now.getDay()],
    sep: "-",
  };
  const formatDate =
    date.year +
    date.sep +
    date.month +
    date.sep +
    date.date +
    " (" +
    date.day +
    ")";

  return {
    formatDate: formatDate,
    yy: date.year,
    mmdd: date.month + date.date,
  };
}
