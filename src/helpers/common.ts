export const formatDate = (dateString: string) => {
  if (dateString === "0001-01-01T00:00:00") {
    return "Not Verified"; // Handle the default placeholder date
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Fallback for unexpected invalid dates
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
