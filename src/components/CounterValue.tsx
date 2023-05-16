import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {useAppDispatch, useAppSelector} from "../bll/store";
import {setCounterValueAC, setMaxValueAC, setStartValueAC} from "../bll/reducer";


type CounterValueType = {
    message: string | null
    error: string | null
}

export const CounterValue = (props: CounterValueType) => {
    const startValue = useAppSelector(state => state.counter.startValue)
    const maxValue = useAppSelector(state => state.counter.maxValue)


    const [disabledSet, setDisabledSet] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [startTemp, setStartTemp] = useState(startValue);
    const [maxTemp, setMaxTemp] = useState(maxValue);

    const counterValue = useAppSelector(state => state.counter.counterValue)
    // const startValue = useAppSelector(state => state.counter.startValue)
    // const maxValue = useAppSelector(state => state.counter.maxValue)
    const dispatch = useAppDispatch();

    // const addMaxValue = (value: number) => {
    //
    //     setMessage("enter values and press 'set'");
    //     // dispatch(setCounterValueAC(0));
    //
    //     // dispatch(incValueAC(value))
    //     setError(null);
    //
    //     dispatch(setMaxValueAC(value));
    //
    //     if (value <= startValue || startValue < 0) {
    //         setError("Incorrect value");
    //         setMessage(null);
    //     }
    // }

    // const addStartValue = (value: number) => {
    //     setMessage("enter values and press 'set'");
    //     setError(null);
    //     // setTempStartValue(value + 1)
    //     // console.log(tempStartValue)
    //     // dispatch(setStartValueAC(value));
    //     const isError = value < 0 || value >= maxValue;
    //     if (isError) {
    //         setMessage(null);
    //         setError('Incorrect value');
    //     }
    // }


    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let maxValue = e.currentTarget.value;
        if (Number(maxValue) > 1000000) {
            dispatch(setMaxValueAC(Number(maxValue.slice(0, 5))));
        } else {
            // dispatch(setMaxValueAC(Number(maxValue)));
            setMaxTemp(+maxValue)
        }
        setDisabledSet(false);
    }

    const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {

        let startValue = e.currentTarget.value;
        if (Number(startValue) > 1000000) {
            dispatch(setStartValueAC(Number(startValue.slice(0, 5))));
        } else {
            // dispatch(setStartValueAC(+startValue))
            setStartTemp(+startValue)
        }
        setDisabledSet(false);
    }

    const setStartAndMaxValue = () => {
        setDisabledSet(true)
        if (counterValue === maxValue) return;
        if (!error) {
            dispatch(setStartValueAC(startTemp));
            dispatch(setMaxValueAC(maxTemp));
            dispatch(setCounterValueAC(startTemp));

            setMessage(null);
        }
    }

    // const setStartAndMaxValueHandler = () => {
    //     onClickSetStartAndMaxValue();
    //     setDisabledSet(true)
    // }

    const isErrorStart = startValue < 0;

    const isError =
        maxValue === startValue ||
        maxValue < startValue;

    const disabled = startValue < 0 || isErrorStart || isError ||
        disabledSet;

    const errorStart = isErrorStart ? 'error' : '';
    const error1 = isError ? 'error' : '';

    return (
        <div>
            <div className={`scoreboard_value`}>
                <div className={`scoreboard__inside ${error1}`}>
                    <div>max value:</div>
                    <input type="number" value={maxTemp.toString()} onChange={onChangeMaxHandler}/>
                </div>
                <div className={`scoreboard__inside ${errorStart} ${error1}`}>
                    <div>start value:</div>
                    <input type="number" value={startTemp.toString()} onChange={onChangeStartHandler}/>
                </div>
            </div>
            <div className={'buttons'}>
                <Button name={'set'} callback={setStartAndMaxValue} disabled={disabled}/>
            </div>
        </div>
    );
};