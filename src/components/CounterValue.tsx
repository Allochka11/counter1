import React, {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {useAppDispatch, useAppSelector} from "../bll/store";
import {setCounterValueAC, setMaxValueAC, setStartValueAC} from "../bll/reducer";

export const CounterValue = () => {
    const startValue = useAppSelector(state => state.counter.startValue);
    const maxValue = useAppSelector(state => state.counter.maxValue);
    const counterValue = useAppSelector(state => state.counter.counterValue);
    const dispatch = useAppDispatch();

    const [disabledSet, setDisabledSet] = useState(true);
    const [startTemp, setStartTemp] = useState(startValue);
    const [maxTemp, setMaxTemp] = useState(maxValue);

    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let maxValue = e.currentTarget.value;
        if (Number(maxValue) > 1000000) {
            dispatch(setMaxValueAC(Number(maxValue.slice(0, 5))));
        } else {
            setMaxTemp(+maxValue)
        }
        setDisabledSet(false);
    }

    const onChangeStartHandler = (e: ChangeEvent<HTMLInputElement>) => {

        let startValue = e.currentTarget.value;
        if (Number(startValue) > 1000000) {
            dispatch(setStartValueAC(Number(startValue.slice(0, 5))));
        } else {
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
        }
    }
//обработка ошибок
    const isErrorStart = startTemp < 0;

    const isError =
        maxTemp === startTemp ||
        maxTemp < startTemp;

    const disabled = startTemp < 0 || isErrorStart || isError ||
        disabledSet;

    const errorStart = isErrorStart ? 'error' : '';
    const error = isError ? 'error' : '';

    return (
        <div>
            <div className={`scoreboard_value`}>
                <div className={`scoreboard__inside ${error}`}>
                    <div>max value:</div>
                    <input type="number" value={maxTemp.toString()} onChange={onChangeMaxHandler}/>
                </div>
                <div className={`scoreboard__inside ${errorStart} ${error}`}>
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