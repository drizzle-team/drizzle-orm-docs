export type Week = {
  date: {
    start: string;
  };
  details: string[];
};

export type WeeksArray = {
  weeks: Week[];
};

export default (weeksArray: WeeksArray): WeeksArray => {
  const weeks = weeksArray.weeks;

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
  let currentWeekStart = getWeekStart(parseDate(weeks[0].date.start));

  // Get the start of the current week
  const now = new Date();
  const currentWeek = getWeekStart(now);

  const filledWeeks: Week[] = [];

  // Fill missing weeks until the current week
  for (let i = 0; i < weeks.length; i++) {
    const week = weeks[i];
    const weekStart = getWeekStart(parseDate(week.date.start));

    // Add empty weeks until we reach the week of the current item
    while (currentWeekStart.getTime() < weekStart.getTime()) {
      filledWeeks.push({
        date: {
          start: formatDate(currentWeekStart),
        },
        details: [],
      });
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    // Add the current week from the input
    filledWeeks.push(week);
    currentWeekStart = addDays(currentWeekStart, 7);
  }

  // Fill missing weeks until the current week
  while (currentWeekStart.getTime() <= currentWeek.getTime()) {
    filledWeeks.push({
      date: {
        start: formatDate(currentWeekStart),
      },
      details: [],
    });
    currentWeekStart = addDays(currentWeekStart, 7);
  }

  return { weeks: filledWeeks };
};
