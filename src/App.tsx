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
        console.log('use1')
        if (startValue) {
            setValue(startValue)
        } else {
            console.log('use2')

            let valueAsString = localStorage.getItem('counterValue');
            if (valueAsString) {
                let newValue = JSON.parse(valueAsString)
                setValue(newValue)
            }
        }

    }, []); // по загрузке
    useEffect(() => {
        console.log('use3')
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
            setError('Incorrect value0')
        }
    }

    const addStartValue = (value: number) => {
        localStorage.setItem('startValue', JSON.stringify(value));
        setStartValue(value)
        setMessage("enter values and press 'set2'")
        setValue(value)
    }
    useEffect(() => {
        console.log('use4')
        if (startValue < 0) {
            setMessage(null)
            setError('Incorrect value1')
        } else if (startValue >= maxValue) {
            setMessage(null)
            setError('Incorrect value2')
        } else if (maxValue <= startValue) {
            setMessage(null)
            setError('Incorrect value3')
        } else {
            setError(null)
            // setMessage("enter values and press 'set1'")
            // setMessage(null)
        }
        // setMessage(null)
    }, [startValue, maxValue])

    const onClickSetStartAndMaxValue = () => {
        setValue(startValue)
        setMessage(null)
    }
    //
    // useEffect(()=> {
    //     console.log('use5')
    //
    //     setMessage("enter values and press 'set1'")
    // },[])



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
