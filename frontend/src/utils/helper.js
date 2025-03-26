export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

export const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://gmc-ecom-demo.onrender.com/api/v1"
    : "http://localhost:3000/api/v1";

export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
