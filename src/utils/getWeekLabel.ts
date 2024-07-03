export default (startDate: string): string => {
  const start = new Date(startDate);
  const now = new Date();

  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(now.getDate() - now.getDay() + 1);
  currentWeekStart.setHours(0, 0, 0, 0);

  const inputWeekStart = new Date(start);
  inputWeekStart.setDate(start.getDate() - start.getDay() + 1);
  inputWeekStart.setHours(0, 0, 0, 0);

  const diffTime = currentWeekStart.getTime() - inputWeekStart.getTime();

  const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));

  if (diffWeeks === 0) {
    return "this week";
  } else if (diffWeeks === 1) {
    return "last week";
  } else {
    return `${diffWeeks}w ago`;
  }
};
