import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Button} from "./components/Button";
import {CounterValue} from "./components/CounterValue";

function App() {
    const [value, setValue] = useState<number>(0);
    const [startValue, setStartValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(5);
    const [error, setError] = useState<string>('');

    useEffect(()=>{
        let valueAsString = localStorage.getItem('counterValue');
        if(valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setValue(newValue)
        }
    },[]); // по загрузке
    useEffect(()=>{
       localStorage.setItem('counterValue', JSON.stringify(value))
    },[value]);//при изменении value

    // useEffect(()=>{
    //     let startValueAsString = localStorage.getItem('startValue');
    //     if(startValueAsString) {
    //         let newValue = JSON.parse(startValueAsString)
    //         setStartValue(newValue)//добавили стартовое значение
    //         setValue(startValue)//startValue  присвоили к value
    //     }
    // },[startValue]);// по изменению стартового значения
    // useEffect(()=>{
    //     let maxValueAsString = localStorage.getItem('maxValue');
    //     if(maxValueAsString) {
    //         let newValue = JSON.parse(maxValueAsString)
    //         setMaxValue(newValue)//добавили стартовое значение
    //     }
    // },[maxValue]);// по изменению стартового значения

    const addValueHandler = () => {
        if (value >= maxValue) return
        setValue(value + 1);
    }

    const resetValueHandler = () => {
        setValue(startValue)
    }

    const addMaxValue = (value:number) => {
        localStorage.setItem('maxValue', JSON.stringify(value))//string
        setMaxValue(value)//добавили стартовое значение

    }// по изменению стартового значения

    const addStartValue = (value:number) => {
        localStorage.setItem('startValue', JSON.stringify(value));
        setStartValue(value)//startValue  присвоили к value
        setValue(value) //присвоили знаение value
    }





    const onClickError = (error: string) => {
        // setError(error)
    }


    return (
        <div className="App">
            <div className={'counter'}>
                <CounterValue
                    addMaxValue={addMaxValue}
                    addStartValue={addStartValue}
                    startValue={startValue}
                    maxValue={maxValue}
                    onClickError={onClickError}
                    error={error}
                />
            </div>
            <div className={'counter'}>
                <Counter
                    error={error}
                    value={value}
                    addValueHandler={addValueHandler}
                    resetValueHandler={resetValueHandler}
                    startValue={startValue}
                    maxValue={maxValue}
                />
            </div>
        </div>
    );
}

export default App;
