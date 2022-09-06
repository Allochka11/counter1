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

    const isError = (props.startValue < 0
        || props.counterValue === props.maxValue
        || props.maxValue < props.startValue
        || props.error);
    const isMaxCounter = props.maxValue === props.counterValue;

    const color = isMaxCounter ? 'valueColorMax' : '';

    const onClickIncHandler = () => {
        props.addValueHandler();
    }

    const message = props.error ? props.error : props.message;
    const disabled = props.startValue < 0 || props.startValue > props.maxValue || props.startValue === props.maxValue;

    const disabledInc = disabled ||
        props.counterValue === props.maxValue ||
        !!props.message ||
        props.startValue === props.maxValue;

    console.log(props.message,'message');
    console.log(props.error, 'error');
    const disabledReset = !!props.message || disabled;

    return (
        <div>
            <div className={`scoreboard ` + `${color}`}>{message ? message : props.counterValue}</div>
            <div>{props.error}</div>

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