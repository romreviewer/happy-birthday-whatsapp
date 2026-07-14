import { Friend } from '../types.js';

function getMonthAndDay(date: Date, timeZone?: string): { month: number; day: number } {
  if (!timeZone) {
    return { month: date.getMonth() + 1, day: date.getDate() };
  }

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);

  const month = Number(parts.find((part) => part.type === 'month')?.value);
  const day = Number(parts.find((part) => part.type === 'day')?.value);

  if (!Number.isInteger(month) || !Number.isInteger(day)) {
    throw new Error(`Unable to determine the date for timezone ${timeZone}`);
  }

  return { month, day };
}

export function getBirthdayMatches(friends: Friend[], date: Date, timeZone?: string): Friend[] {
  const { month, day } = getMonthAndDay(date, timeZone);

  return friends.filter((friend) => {
    return friend.active === 1 && friend.birth_month === month && friend.birth_day === day;
  });
}
