export const currencyFormatter = (amount) => {
    const formatter = Intl.NumberFormat(
        "pt-BR", {
        currency: "BRL",
        style: "currency"
    });
    return formatter.format(amount)
}

export const dateFormatter = (date) => {
    const formatter = Intl.DateTimeFormat(
        "pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
    return formatter.format(date);
};
