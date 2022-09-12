import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {CounterValue} from "./components/CounterValue";

function App() {
    const [counterValue, setCounterValue] = useState<number>(0);
    const [startValue, setStartValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(10);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // по загрузке
    useEffect(() => {
        console.log(1)
        let valueAsString = localStorage.getItem('startValue');

        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setCounterValue(newValue)
            setStartValue(newValue)
        }
        let valueMaxAsString = localStorage.getItem('maxValue');

        if (valueMaxAsString) {
            let newMaxValue = JSON.parse(valueMaxAsString)
            setMaxValue(newMaxValue)
        }
    }, []);


    const addValueHandler = () => {
        if (counterValue >= maxValue) return;
        setCounterValue(counterValue + 1);
    }

    const resetValueHandler = () => {
        if (startValue < maxValue) {
            // localStorage.removeItem('maxValue');
            setCounterValue(startValue);
        }
    }

    const addMaxValue = (value: number) => {
        setMessage("enter values and press 'set'");
        setCounterValue(0)
        setError(null);
        setMaxValue(value);

        if (value <= startValue) {
            console.log(value <= startValue, 'value <= startValue')
            setError("Incorrect value")
            setMessage(null);
        }
    }

    const addStartValue = (value: number) => {

        setMessage("enter values and press 'set'");
        setError(null);
        setStartValue(value);
        const isError = value < 0 ||
            value >= maxValue

        if (isError) {
            setMessage(null);
            setError('Incorrect value');

        }
    }

    const onClickSetStartAndMaxValue = () => {
        if (counterValue === maxValue) return;
        if (!error) {
            setCounterValue(startValue);
            setMessage(null);
            localStorage.setItem('maxValue', JSON.stringify(maxValue));
            localStorage.setItem('startValue', JSON.stringify(startValue));
        }
    }

    return (
        <div className="App">
            <div className={'counter'}>
                <CounterValue
                    counterValue={counterValue}
                    addMaxValue={addMaxValue}
                    addStartValue={addStartValue}
                    startValue={startValue}
                    maxValue={maxValue}
                    message={message}
                    error={error}
                    onClickSetStartAndMaxValue={onClickSetStartAndMaxValue}
                />
            </div>
            <div className={'counter'}>
                <Counter
                    counterValue={counterValue}
                    error={error}
                    message={message}
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
