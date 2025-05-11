// export const formatDate = (dateString: string) => {
//   if (dateString === "0001-01-01T00:00:00") {
//     return "Not Verified"; // Handle the default placeholder date
//   }

//   const date = new Date(dateString);

//   if (isNaN(date.getTime())) {
//     return "Invalid Date"; // Fallback for unexpected invalid dates
//   }

//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };
export const formatDate = (dateString: string) => {
  if (dateString === "0001-01-01T00:00:00" || dateString === null) {
    return "Not Verified"; // Handle the default placeholder date
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "--"; // Fallback for unexpected invalid dates
  }

  // Format the date to "23 Jan 2023 12:12pm"
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Short month name (Jan, Feb, etc.)
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? " PM" : " AM";

  hours = hours % 12 || 12; // Convert to 12-hour format, ensuring 0 becomes 12

  return `${day} ${month} ${year} ${hours}:${minutes}${period}`;
};
