export default function getTodaysDate() {
  const today = new Date();

  const isDayDoubleDigit = today.getDay() > 9;
  const day = isDayDoubleDigit ? today.getDay() : "0" + today.getDay();

  const isMonthDoubleDigit = today.getMonth() + 1 > 9;
  const month = isMonthDoubleDigit ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);

  return `${today.getFullYear()}-${month}-${day}`;
}
