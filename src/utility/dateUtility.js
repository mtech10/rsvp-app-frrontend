export const formatDateParts = (value) => {
  if (!value) return { month: "TBD", day: "?", time: "TBD" };
  const date = new Date(value);
  return {
    month: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
    day: new Intl.DateTimeFormat("en", { day: "numeric" }).format(date),
    weekday: new Intl.DateTimeFormat("en", { weekday: "long" }).format(date),
    time: new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
  };
};
