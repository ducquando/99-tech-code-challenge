import { Currency } from "../CurrencyInput";

export const filterCurrency = (currencies: Currency[], filtered: string) => {
    return currencies.filter((currency: Currency) => {
        return currency.currency === filtered;
    })[0];
}