import { InputNumber, InputNumberProps } from "antd";
import { filterCurrency, Currency } from '.';
import { ValueIdentifier, useAppDispatch, useAppSelector, updateValuesTo } from '../utils';
import './index.css';

export interface ValueInputProps {
    identifier: ValueIdentifier;
    currencies: Currency[];
}

export const ValueInput = (props: ValueInputProps) => {
    const dispatch = useAppDispatch();
    const storedCurrency1 = useAppSelector((state) => state.states['currency1']);
    const storedCurrency2 = useAppSelector((state) => state.states['currency2']);
    const storedValue = useAppSelector((state) => state.states[props.identifier]);

    const exchangeRate = () => {
        const price1 = filterCurrency(props.currencies, storedCurrency1).price;
        const price2 = filterCurrency(props.currencies, storedCurrency2).price;

        if (!price1 || !price2 || price1 === 0 || price2 === 0) return (0);
        
        return (price1.toString() === storedValue) ? (price1 / price2) : (price2 / price1);
    }

    const onChange: InputNumberProps['onChange'] = (value) => {
        if (!value) return;
        dispatch(updateValuesTo({
            identifier: props.identifier,
            value: value as number,
            exchangeRate: exchangeRate(),
        }));
    };

    return (
        <>
            <InputNumber<string>
                className="input-value"
                controls={false}
                value={storedValue?.toString()}
                min="0"
                step="0.01"
                variant="borderless"
                onChange={onChange}
            />
        </>
    )
}