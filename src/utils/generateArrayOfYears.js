export default function generateArrayOfYears(startingYear) {
  const years = [];
  const today = new Date();

  const currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  if (currentMonth >= 10) {
    years.push(currentYear);
  }
  currentYear--;

  for (currentYear; startingYear <= currentYear; currentYear--) {
    years.push(currentYear);
  }

  return years;
}
