import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {CounterValue} from "./components/CounterValue";
import {useAppDispatch, useAppSelector} from "./bll/store";
import {setCounterValueAC, setMaxValueAC, setStartValueAC} from "./bll/reducer";

// import {setValueFromLocalStorageAC, setValueFromLSTK, setValueToLSTK} from "./bll/reducer";

function App() {
    // const [counterValue, setCounterValue] = useState<number>(0);
    // const [startValue, setStartValue] = useState<number>(0);
    // const [maxValue, setMaxValue] = useState<number>(10);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // const value = useAppSelector(state => state.counter.value)
    const counterValue = useAppSelector(state => state.counter.counterValue)
    const startValue = useAppSelector(state => state.counter.startValue)
    const maxValue = useAppSelector(state => state.counter.maxValue)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (counterValue > startValue) {
            dispatch(setCounterValueAC(startValue))
        }
        // if (startValue < 0)
    }, [])

    const addValueHandler = () => {
        if (counterValue >= maxValue) return;
        dispatch(setCounterValueAC(counterValue + 1));
    }

    const resetValueHandler = () => {
        if (startValue < maxValue) {
            dispatch(setCounterValueAC(startValue));
        }
    }

    const addMaxValue = (value: number) => {
        //??
        setMessage("enter values and press 'set'");
        dispatch(setCounterValueAC(0));

        setError(null);
        dispatch(setMaxValueAC(value));

        if (value <= startValue || startValue < 0) {
            setError("Incorrect value");
            setMessage(null);
        }
    }

    const addStartValue = (value: number) => {
        setMessage("enter values and press 'set'");
        setError(null);
        dispatch(setStartValueAC(value));
        const isError = value < 0 || value >= maxValue;
        if (isError) {
            setMessage(null);
            setError('Incorrect value');
        }
    }

    const onClickSetStartAndMaxValue = () => {
        if (counterValue === maxValue) return;
        if (!error) {
            dispatch(setCounterValueAC(startValue));
            setMessage(null);
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

