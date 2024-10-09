export default (startDate: string): string => {
  const start = new Date(startDate);
  const now = new Date();

  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const inputMonthStart = new Date(start.getFullYear(), start.getMonth(), 1);

  const diffTime = currentMonthStart.getTime() - inputMonthStart.getTime();
  const diffMonths = Math.floor(diffTime / (30 * 24 * 60 * 60 * 1000));

  if (diffMonths === 0) {
    return "this month";
  } else {
    if (start.getFullYear() !== now.getFullYear()) {
      return inputMonthStart.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else {
      return inputMonthStart.toLocaleString("en-US", {
        month: "long",
      });
    }
  }
};
