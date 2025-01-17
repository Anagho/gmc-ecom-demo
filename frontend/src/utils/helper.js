export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

export const serverUrl = "http://localhost:3000/api/v1"
