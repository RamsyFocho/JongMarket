export function formatCurrency(price: number, currency = "FCFA"): string {
    const exchangeRate = 600 // 1 USD = 600 FCFA (approximate)
    if (currency === "FCFA") {
      return `${Math.round(price * exchangeRate).toLocaleString()} ${currency}`
    }
    return `${currency} ${price.toFixed(2)}`
}
  