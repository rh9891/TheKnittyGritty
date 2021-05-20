export const dateFix = (date) => {
  const yearMonthDay = date.substring(0, 10).split("-");

  const formattedDate = `${yearMonthDay[1]}-${yearMonthDay[2]}-${yearMonthDay[0]}`;

  return formattedDate;
};
