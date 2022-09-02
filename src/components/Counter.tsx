import React from "react";
import {Button} from "./Button";
import '../App.css'

type CounterType = {
    error:string
    value: number
    startValue:number
    maxValue:number
    addValueHandler:()=>void
    resetValueHandler:()=>void

}

export const Counter = (props: CounterType) => {

    // console.log(props.error)


    const color = props.value === props.maxValue && 'soreColorMax';
    const error = props.error !== '' || props.value === props.maxValue  ? 'error' : '';
    const onClickIncHandler = () => {
        props.addValueHandler();
    }

    // const !props.error ? 'enter value and press "set"' : props.error

    return (
        <div>
            <div className={`scoreboard `}>{props.value}</div>
            <div>{props.error}</div>
            <div className={'buttons'}>
                <Button name={'inc'} callback={onClickIncHandler} />
                <Button name={'reset'} callback={props.resetValueHandler} />
            </div>
        </div>

    );
};