import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {CounterValue} from "./components/CounterValue";
import {useAppDispatch, useAppSelector} from "./bll/store";
import {setCounterValueAC} from "./bll/reducer";

// import {setValueFromLocalStorageAC, setValueFromLSTK, setValueToLSTK} from "./bll/reducer";

function App() {

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


    return (
        <div className="App">
            <div className={'counter'}>
                <CounterValue
                    message={message}
                    error={error}

                />
            </div>
            <div className={'counter'}>
                <Counter
                    error={error}
                    message={message}
                />
            </div>
        </div>
    );
}

export default App;

