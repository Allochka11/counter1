import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Button} from "./components/Button";
import {CounterValue} from "./components/CounterValue";

function App() {
    const [value, setValue] = useState<number>(0);
    const [startValue, setStartValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null)


    useEffect(() => {
        if (startValue) {
            setValue(startValue)
        } else {
            let valueAsString = localStorage.getItem('counterValue');
            if (valueAsString) {
                let newValue = JSON.parse(valueAsString)
                setValue(newValue)
            }
        }
    }, []); // по загрузке
    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(startValue))

    }, [value]);//при изменении value

    const addValueHandler = () => {
        if (value >= maxValue) return
        setValue(value + 1);
    }

    const resetValueHandler = () => {
        setValue(startValue)
    }

    const addMaxValue = (value: number) => {
        setMessage(null)
        if (value >= startValue) {
            localStorage.setItem('maxValue', JSON.stringify(value))//string
            setMessage("enter values and press 'set3'")
            setMaxValue(value)//добавили стартовое значение
            setError(null)
        } else {
            setError('Incorrect value')
        }
    }

    const addStartValue = (value: number) => {
        if(value <= maxValue) {
            localStorage.setItem('startValue', JSON.stringify(value));
            setStartValue(value)
            setMessage("enter values and press 'set'")
            setValue(value)
        }

    }
    useEffect(() => {
        if (startValue < 0) {
            setMessage(null)
            setError('Incorrect value')
        } else if (startValue >= maxValue) {
            setMessage(null)
            setError('Incorrect value')
        } else if (maxValue <= startValue) {
            setMessage(null)
            setError('Incorrect value')
        } else {
            setError(null)
        }

    }, [startValue, maxValue])

    const onClickSetStartAndMaxValue = () => {
        if(!error) {
            setValue(startValue)
            setMessage(null)
        }
    }



    return (
        <div className="App">
            <div className={'counter'}>
                <CounterValue
                    addMaxValue={addMaxValue}
                    addStartValue={addStartValue}
                    startValue={startValue}
                    maxValue={maxValue}
                    message={message}
                    error={error}
                    value={value}
                    onClickSetStartAndMaxValue={onClickSetStartAndMaxValue}
                />
            </div>
            <div className={'counter'}>
                <Counter
                    error={error}
                    message={message}
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
