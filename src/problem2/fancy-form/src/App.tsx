import axios from "axios";
import { useState, useEffect } from "react";
import { Space, Typography } from 'antd';
import { Currency, CurrencyInput, ValueInput, SwapButton } from './components';
import './App.css';

const { Title } = Typography;

export const App = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);

    useEffect(() => {
        fetchCurrencies('https://interview.switcheo.com/prices.json')
    }, []);

    const fetchCurrencies = async (url: string) => {
        axios(url)
            .then(response => { 
                const data = response.data;
                const currencies = data.map((currency: {[id: string]: string}) => {
                    return {
                        currency: currency['currency'],
                        price: currency['price'],
                        data: currency['data'],
                    };
                });
                setCurrencies(currencies);
            })
            .catch(error => {console.error(error)});
    };

    return (
        <div className='page-container'>
            <Title>Currency Converter</Title>
            <Space className='input-container'>
                <Space.Compact direction="vertical" className='input-form'>
                    <CurrencyInput 
                        currencies={currencies}
                        identifier='currency1'
                    />
                    <ValueInput
                        currencies={currencies}
                        identifier='value1'
                    />
                </Space.Compact>
                <SwapButton />
                <Space.Compact direction="vertical" className='input-form'>
                    <CurrencyInput 
                        currencies={currencies}
                        identifier='currency2'
                    />
                    <ValueInput 
                        currencies={currencies}
                        identifier='value2'
                    />
                </Space.Compact>
            </Space>
        </div>
    );
}