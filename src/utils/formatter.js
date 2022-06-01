export const formatter = (price, currency) => {
    const format = new Intl.NumberFormat('th-TH', {
        style: "currency",
        currency: currency
    })
    return format.format(price);
}