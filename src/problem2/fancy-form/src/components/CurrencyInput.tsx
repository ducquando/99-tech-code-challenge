import { Select } from 'antd';
import { filterCurrency } from '.';
import { CurrencyIdentifier, useAppDispatch, useAppSelector, updateCurrenciesTo } from '../utils';
import './index.css';

export interface Currency {
    currency: string;
    price: number;
    data: string;
}

export interface CurrencyOption {
    value: number;
    label: string;
}

export interface CurrencyInputProps {
    identifier: CurrencyIdentifier;
    currencies: Currency[];
}

export const CurrencyInput = (props: CurrencyInputProps) => {
    const dispatch = useAppDispatch();
    const storedCurrency = useAppSelector((e) => e.states[props.identifier]);
    
    const currencyOpts: CurrencyOption[] = props.currencies.map((currency: Currency, index: number) => {
        return { 
            value: index,
            label: currency['currency'],
        }
    });

    const sortedCurrencyOpts = currencyOpts.sort((lhs: CurrencyOption, rhs: CurrencyOption) => {
        const lhsLabel = (lhs.label ?? '').toLowerCase();
        const rhsLabel = (rhs.label ?? '').toLowerCase();
        return lhsLabel < rhsLabel ? -1 : 1;
    });

    const filterOption = (input: string, option?: { label: any; value: number }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const changeCurrency = (value: string) => {
        const currencyIndex = parseInt(value);
        const oldPrice = filterCurrency(props.currencies, storedCurrency).price;
        const newPrice = props.currencies[currencyIndex].price;

        dispatch(updateCurrenciesTo({ 
            identifier: props.identifier,
            currency: props.currencies[currencyIndex].currency,
            conversionRate: newPrice / oldPrice,
        }));
    };

    return (
        <Select
            showSearch
            value={storedCurrency}
            variant="filled"
            onChange={changeCurrency}
            filterOption={filterOption}
            options={sortedCurrencyOpts}
            className="input-currency"
        />
    );
}