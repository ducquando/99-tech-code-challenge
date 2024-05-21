import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ValueIdentifier = 'value1' | 'value2';
export type CurrencyIdentifier = 'currency1' | 'currency2';

interface UpdateValueAction {
    identifier: ValueIdentifier;
    value: number;
    exchangeRate: number;
}

interface UpdateCurrencyAction {
    identifier: CurrencyIdentifier;
    currency: string;
    conversionRate: number;
}

const initialState: Record<ValueIdentifier | CurrencyIdentifier, string> = {
    'currency1': 'USD',
    'value1': '0',
    'currency2': 'LUNA',
    'value2': '0',
};

export const update = createSlice({
    name: 'update',
    initialState,
    reducers: {
        updateValuesTo: (state, action: PayloadAction<UpdateValueAction>) => {
            if (action.payload.identifier === 'value1') {
                state.value1 = action.payload.value.toString();
                state.value2 = (action.payload.value * action.payload.exchangeRate).toString();
            } else {
                state.value1 = (action.payload.value * action.payload.exchangeRate).toString();
                state.value2 = action.payload.value.toString();
            }
        },
        updateCurrenciesTo: (state, action: PayloadAction<UpdateCurrencyAction>) => {
            if (action.payload.identifier === 'currency1') {
                state.currency1 = action.payload.currency;
                state.value1 = (parseFloat(state.value1) * action.payload.conversionRate).toString();
            } else {
                state.currency2 = action.payload.currency;
                state.value2 = (parseFloat(state.value2) * action.payload.conversionRate).toString();
            }
        },
        swapCurrencies: (state) => {
            const exchangeRate = parseFloat(state.value1) / parseFloat(state.value2);
            const temp = state.currency1;
            state.currency1 = state.currency2;
            state.currency2 = temp;
            state.value2 = (parseFloat(state.value1) * exchangeRate).toString();
        }
    },
})

export const { updateValuesTo, updateCurrenciesTo, swapCurrencies } = update.actions
export default update.reducer