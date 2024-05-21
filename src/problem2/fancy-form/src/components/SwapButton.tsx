import { Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { useAppDispatch, swapCurrencies } from '../utils';

export const SwapButton = () => {
    const dispatch = useAppDispatch();

    const swapOnClick = () => {
        dispatch(swapCurrencies());
    }

    return (
        <div className='input-swap'>
            <Button icon={<SwapOutlined />} type='text' onClick={swapOnClick} />
        </div>
    )
}