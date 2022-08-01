export default function getTodaysDate() {
  const today = new Date();
  const day = today.getDay() > 9 ? today.getDay() : "0" + today.getDay();
  const month =
    today.getMonth() + 1 > 9
      ? today.getMonth() + 1
      : "0" + (today.getMonth() + 1);
  const todaysDate = `${today.getFullYear()}-${month}-${day}`;

  return todaysDate;
}
