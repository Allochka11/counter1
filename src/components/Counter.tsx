import React from "react";
import {Button} from "./Button";
import '../App.css'

type CounterType = {
    counterValue: number
    error: string | null
    message: string | null
    startValue: number
    maxValue: number
    addValueHandler: () => void
    resetValueHandler: () => void
}

export const Counter = (props: CounterType) => {

    const isError = (props.startValue < 0);

    const isMaxCounter = props.maxValue === props.counterValue ||
        props.maxValue < props.startValue ||
        props.startValue === props.maxValue
    ;

    const color = isMaxCounter || isError ? 'valueColorMax' : '';

    const onClickIncHandler = () => {
        props.addValueHandler();
        console.log('+1')
    }

    const message = props.error ? props.error : props.message;
    const disabled = props.startValue < 0 || props.startValue > props.maxValue || props.startValue === props.maxValue;

    const disabledInc = disabled ||
        props.counterValue === props.maxValue ||
        !!props.message ||
        props.startValue === props.maxValue;

    const disabledReset = !!props.message || disabled || props.maxValue !== props.counterValue;

    return (
        <div>
            <div className={`scoreboard ${color}`}>{message ? message : props.counterValue}</div>
            <div className={'buttons'}>
                <Button name={'inc'}
                        callback={onClickIncHandler}
                        disabled={disabledInc}/>
                <Button name={'reset'}
                        callback={props.resetValueHandler}
                        disabled={disabledReset}/>
            </div>
        </div>

    );
};