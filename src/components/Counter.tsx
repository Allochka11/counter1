import React from "react";
import {Button} from "./Button";
import '../App.css'

type CounterType = {
    count: number
    minCount:number
    maxCount:number
    onClickAddCountHandler: () => void
    onClickResetCountHandler: () => void
}

export const Counter = (props: CounterType) => {

    const color = props.count === props.maxCount && 'soreColorMax';

    return (
        <div>
            <div className={`scoreboard ` + color}>{props.count}</div>
            <div className={'buttons'}>
                <Button name={'inc'} callback={props.onClickAddCountHandler} disabled={props.count === props.maxCount}/>
                <Button name={'reset'} callback={props.onClickResetCountHandler} disabled={props.count === props.minCount}/>
            </div>
        </div>

    );
};