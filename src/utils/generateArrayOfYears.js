export default function generateArrayOfYears(startingYear) {
  const years = [];

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (currentMonth >= 10) {
    years.push(currentYear);
  }
  for (let i = currentYear; startingYear < i; i--) {
    years.push(i);
  }

  return years;
}
