export const formatIST = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};