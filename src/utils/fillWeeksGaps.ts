export type Weeks = Record<string, string[]>;

export default (weeksObject: Weeks): Weeks => {
  const weeks = { ...weeksObject };

  const getWeekStart = (date: Date): Date => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust if the day is Sunday (0)
    const weekStart = new Date(date.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  // Get the start of the first week
  let currentWeekStart = getWeekStart(parseDate(Object.keys(weeks)[0]));

  // Get the start of the current week
  const now = new Date();
  const currentWeek = getWeekStart(now);

  let filledWeeks: Weeks = {};

  // Fill missing weeks until the current week
  for (const key in weeks) {
    const week = weeks[key];
    const weekStart = getWeekStart(parseDate(key));

    // Add empty weeks until we reach the week of the current item
    while (currentWeekStart.getTime() < weekStart.getTime()) {
      filledWeeks = { ...filledWeeks, [formatDate(currentWeekStart)]: [] };
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    // Add the current week from the input
    filledWeeks = { ...filledWeeks, [key]: week };
    currentWeekStart = addDays(currentWeekStart, 7);
  }

  // Fill missing weeks until the current week
  while (currentWeekStart.getTime() <= currentWeek.getTime()) {
    filledWeeks = { ...filledWeeks, [formatDate(currentWeekStart)]: [] };
    currentWeekStart = addDays(currentWeekStart, 7);
  }

  return filledWeeks;
};
