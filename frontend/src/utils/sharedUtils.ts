export const formatDate = (dateInput?: string | number | Date): string => {
  if (!dateInput) return "Invalid date";

  const date = new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
};
