import React, {ChangeEvent, useEffect} from "react";
import {Button} from "./Button";


type CounterValueType = {
    addMaxValue: (value: number) => void
    addStartValue: (value: number) => void
    startValue: number
    maxValue: number
    message:string|null
    error: string | null
    value: number
    onClickSetStartAndMaxValue: () => void
}

export const CounterValue = (props: CounterValueType) => {

    useEffect(() => {
        let startValueAsString = localStorage.getItem('startValue');
        if (startValueAsString) {
            let newValue = JSON.parse(startValueAsString)
            props.addStartValue(newValue)//добавили стартовое значение
        }

        let maxValueAsString = localStorage.getItem('maxValue');
        if (maxValueAsString) {
            let newValue = JSON.parse(maxValueAsString)
            props.addMaxValue(newValue)//добавили стартовое значение
        }
    }, []);


    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.addMaxValue(Number(e.currentTarget.value))
    }
    const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.addStartValue(Number(e.currentTarget.value))
    }

    const setStartAndMaxValueHandler = () => {
        props.onClickSetStartAndMaxValue();
    }

    const startRed = props.startValue < 0 && `error`;
    const red = props.maxValue === props.startValue
    || props.maxValue < props.startValue ? `error` : null

    const disabled = props.maxValue === props.value || !props.message

    return (
        <div>
            <div className={`scoreboard_value`}>
                <div className={`scoreboard__inside ` + red}>
                    <div>max value:</div>
                    <input type="number" value={props.maxValue} onChange={onChangeMaxHandler}/>
                </div>
                <div className={`scoreboard__inside ${red ? red : startRed}`}>
                    <div>start value:</div>
                    <input type="number" value={props.startValue} onChange={onChangeStartHandler}/>
                </div>
            </div>
            <div className={'buttons'}>
                <Button name={'set'} callback={setStartAndMaxValueHandler} disabled={!!red || !!startRed || disabled}/>
            </div>

        </div>
    );
};