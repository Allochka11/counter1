import React, {useEffect} from "react";
import {Button} from "./Button";
import '../App.css'
import {useAppDispatch, useAppSelector} from "../bll/store";
import {incValueAC, setCounterValueAC} from "../bll/reducer";

export const Counter = () => {

    const counterValue = useAppSelector(state => state.counter.counterValue)
    const startValue = useAppSelector(state => state.counter.startValue)
    const maxValue = useAppSelector(state => state.counter.maxValue)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (counterValue >= startValue) {
            dispatch(setCounterValueAC(startValue))
        }
    }, [])

    //добавляем в счетчик текущее значение counter
    const addValueHandler = () => {
        if (counterValue >= maxValue) return;
        dispatch(incValueAC(counterValue + 1));
    }

    const resetValueHandler = () => {
        if (startValue < maxValue) {
            dispatch(setCounterValueAC(startValue));
        }
    }
    const isError = (startValue < 0);

    const isMaxCounter = maxValue === counterValue ||
        maxValue < startValue ||
        startValue === maxValue

    const color = isMaxCounter || isError ? 'valueColorMax' : '';

    const disabled = startValue < 0 || startValue > maxValue || startValue === maxValue;

    const disabledInc = disabled ||
        counterValue === maxValue || startValue === maxValue

    const disabledReset = disabled || maxValue !== counterValue;

    return (
        <div>
            <div className={`scoreboard ${color}`}>{counterValue}</div>
            <div className={'buttons'}>
                <Button name={'inc'}
                        callback={addValueHandler}
                        disabled={disabledInc}/>
                <Button name={'reset'}
                        callback={resetValueHandler}
                        disabled={disabledReset}/>
            </div>
        </div>

    );
};