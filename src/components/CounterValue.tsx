import React, {ChangeEvent, MouseEventHandler, useEffect} from "react";
import {Button} from "./Button";


type CounterValueType = {
    addMaxValue:(value:number)=>void
    addStartValue:(value:number)=>void
    startValue:number
    maxValue:number





    error:string
    onClickError: (error: string)=>void
}

export const CounterValue = (props: CounterValueType) => {

    const onChangeMaxHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.addMaxValue( Number(e.currentTarget.value))
    }
    const onChangeStartHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.addStartValue(Number(e.currentTarget.value))
    }

    console.log(props.startValue)
    console.log(props.maxValue)



    const error = props.error !== '' && 'error_scoreboard'
    return(
        <div>
            <div className={`scoreboard_value`}>
                <div className={`scoreboard__inside ` + error}>
                    <div>max value: </div>
                    <input type="number" value={props.maxValue}  onChange={onChangeMaxHandler}/>
                </div>
                <div className={`scoreboard__inside ` + error}>
                    <div>start value: </div>
                    <input type="number" value={props.startValue}  onChange={onChangeStartHandler}/>
                </div>
            </div>
            <div className={ 'buttons' }>
                <Button name={'set'} callback={()=>{}}/>
            </div>
        
        </div>
    );
};