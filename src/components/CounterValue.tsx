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
        let maxValue = e.currentTarget.value;
        if(Number(maxValue) > 1000000) {
            props.addMaxValue(Number(maxValue.slice(0,5)));
        }else{
            props.addMaxValue(Number(maxValue));
        }
        setDisabledSet(false);
    }

    const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let startValue = e.currentTarget.value;
        if(Number(startValue) > 1000000) {
            props.addStartValue(Number(startValue.slice(0,5)));
        }else{
            props.addStartValue(Number(startValue));
        }
        setDisabledSet(false);
    }

    const setStartAndMaxValueHandler = () => {
        props.onClickSetStartAndMaxValue();
        setDisabledSet(true)
    }

    const isErrorStart = props.startValue < 0;

    const isError =
        props.maxValue === props.startValue ||
        props.maxValue < props.startValue;

    const disabled = props.startValue < 0 || isErrorStart || isError ||
        disabledSet;

    const errorStart = isErrorStart ? 'error' : '';
    const error = isError ? 'error' : '';


    return (
        <div>
            <div className={`scoreboard_value`}>
                <div className={`scoreboard__inside ${error}`}>
                    <div>max value:</div>
                    <input type="number" value={props.maxValue.toString()} onChange={onChangeMaxHandler}/>
                </div>
                <div className={`scoreboard__inside ${errorStart} ${error}`}>
                    <div>start value:</div>
                    <input type="number" value={props.startValue.toString()} onChange={onChangeStartHandler}/>
                </div>
            </div>
            <div className={'buttons'}>
                <Button name={'set'} callback={setStartAndMaxValueHandler} disabled={disabled}/>
            </div>

        </div>
    );
};