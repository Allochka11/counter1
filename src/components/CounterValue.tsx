import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";


type CounterValueType = {
    addMaxValue: (value: number) => void
    addStartValue: (value: number) => void
    startValue: number
    maxValue: number
    message: string | null
    error: string | null
    counterValue: number
    onClickSetStartAndMaxValue: () => void
}

export const CounterValue = (props: CounterValueType) => {
    const [disabledSet, setDisabledSet] = useState(true)

    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.addMaxValue(Number(e.currentTarget.value));
        setDisabledSet(false);
    }

    const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.addStartValue(Number(e.currentTarget.value));
        setDisabledSet(false);
    }

    const setStartAndMaxValueHandler = () => {
        props.onClickSetStartAndMaxValue();
        setDisabledSet(true)
    }

    const isError = props.startValue < 0 ||
        props.maxValue === props.startValue ||
        props.maxValue < props.startValue
        ? `error` : '';

    const disabled = props.startValue < 0 ||
        !!isError ||
        disabledSet;


    return (
        <div>
            <div className={`scoreboard_value`}>
                <div className={`scoreboard__inside `}>
                    <div>max value:</div>
                    <input type="number" value={props.maxValue} onChange={onChangeMaxHandler}/>
                </div>
                <div className={`scoreboard__inside`}>
                    <div>start value:</div>
                    <input type="number" value={props.startValue} onChange={onChangeStartHandler}/>
                </div>
            </div>
            <div className={'buttons'}>
                <Button name={'set'} callback={setStartAndMaxValueHandler} disabled={disabled}/>
            </div>

        </div>
    );
};