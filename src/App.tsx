import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Button} from "./components/Button";
import {CounterValue} from "./components/CounterValue";

function App() {
    const [counterValue, setCounterValue] = useState<number>(0);
    const [startValue, setStartValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(5);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // по загрузке
    useEffect(() => {
        console.log(1)
        // setMessage(null);
        // setError(null);

        if (startValue) {
            setCounterValue(startValue)
        } else {
            let valueAsString = localStorage.getItem('startValue');
            let valueMaxAsString = localStorage.getItem('maxValue');
            if (valueAsString && valueMaxAsString) {
                let newValue = JSON.parse(valueAsString)
                let newMaxValue = JSON.parse(valueMaxAsString)
                setCounterValue(newValue)
                setMaxValue(newMaxValue)
                setStartValue(newValue)
            }
        }
    }, []);


    const addValueHandler = () => {
        if (counterValue >= maxValue) return;
        setCounterValue(counterValue + 1);
    }

    const resetValueHandler = () => {
        setCounterValue(startValue);
        localStorage.removeItem('maxValue');
    }

    // const validate = () => {
        // setMessage("enter values and press 'set'");
        // setError(null);

        // const isError =
        //     startValue < 0 ||
        //     startValue >= maxValue ||
        //     maxValue <= startValue;
        //
        // if (isError) {
        //     setMessage(null);
        //     setError('Incorrect value');
        // }
    // }

    const addMaxValue = (value: number) => {
        validate();
        setMaxValue(value);


        if(value <= startValue ) {
            setMessage(null);
            setError("Error!!!")
        }

        if(value > startValue) {
            setMessage("enter values and press 'set'");
            setError(null)
        }

        // setMaxValue(value);

        // setMaxValue(value); //добавили стартовое значение
        // validate();
        //
        // // Сделать проверку если валид - добавляем в сторейдж
        // if (value > startValue) {
        //     localStorage.setItem('maxValue', JSON.stringify(value))//string
        // }
    }

    const addStartValue = (value: number) => {
        // validate();
        setStartValue(value)


        if(value === maxValue || value < 0 ) {
            setMessage(null);
            setError('Error');

        }
        if(value >= 0 ) {
           setMessage("enter values and press 'set'");
           setError(null)
        }


        // validate();
        //
        // setValue(value);
        // // Сделать проверку если валид - добавляем в сторейдж
        // if (value < maxValue && value >= 0) {
        //     localStorage.setItem('startValue', JSON.stringify(value));
        // }
    }

    const onClickSetStartAndMaxValue = () => {

        if(counterValue === maxValue) return
        if (!error) {
            setCounterValue(startValue);
            setMessage(null);
            localStorage.setItem('maxValue', JSON.stringify(maxValue));
            localStorage.setItem('startValue', JSON.stringify(startValue));
        }
    }

    const validate = () => {

        setMessage("enter values and press 'set'");
        setError(null);

        const isError = startValue < 0 ||
            maxValue <= startValue||
            startValue >= maxValue||
            error;


        if(isError){

            setMessage(null);
            setError('Incorrect value');
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
