export function getPastDate(): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date;
}
