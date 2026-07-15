export function getDate(now) {
  const dayArr = ["일", "월", "화", "수", "목", "금", "토"];
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
