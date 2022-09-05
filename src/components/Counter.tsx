import React from "react";
import {Button} from "./Button";
import '../App.css'

type CounterType = {
    error: string | null
    message: string | null
    value: number
    startValue: number
    maxValue: number
    addValueHandler: () => void
    resetValueHandler: () => void
}

export const Counter = (props: CounterType) => {

    const color =
        props.startValue === props.maxValue
    || props.error
    || props.startValue === props.maxValue
    || props.startValue < 0
    ||props.maxValue === props.value ? 'soreColorMax' : '';


    const onClickIncHandler = () => {
        props.addValueHandler();
    }
    const messageVsError = props.message ? props.message : props.error;
    const disabled= props.startValue < 0 || props.startValue > props.maxValue


    return (
        <div>
            <div className={`scoreboard ` + color }>{messageVsError ? messageVsError : props.value}</div>

            <div className={'buttons'}>
                <Button name={'inc'} callback={onClickIncHandler}
                        disabled={props.value === props.maxValue || !!props.message || disabled}/>
                <Button name={'reset'} callback={props.resetValueHandler} disabled={props.value === props.startValue || disabled} />
            </div>
        </div>

    );
};