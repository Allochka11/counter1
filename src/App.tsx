import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {Button} from "./components/Button";

function App() {

    // const maxCount = 5;
    // const minCount = 0;
    //
    // const [count, setCounter] = useState<number>(minCount);
    //
    // const onClickAddCountHandler = () => {
    //     if(count >= maxCount ) return
    //     setCounter(count + 1);
    // }
    //
    // const onClickResetCountHandler = () => {
    //     setCounter(minCount)
    // }

    const [value, setValue] = useState<number>(0)

    useEffect(() => {
        let newValueString = localStorage.getItem('counterValue');
        if (newValueString) {
            let newValue = JSON.parse(newValueString);
            setValue(newValue)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(value));
    }, [value]);

    const incHandler = () => {
        setValue(value + 1);
    }



    return (
        <div className="App">
            <div>
                <h1>{value}</h1>
                <button onClick={incHandler}>inc</button>
            </div>

            {/*<div className={'counter'}>*/}
            {/*    <Counter*/}
            {/*        count={count}*/}
            {/*        onClickAddCountHandler={onClickAddCountHandler}*/}
            {/*        onClickResetCountHandler={onClickResetCountHandler}*/}
            {/*        minCount={minCount}*/}
            {/*        maxCount={maxCount}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
