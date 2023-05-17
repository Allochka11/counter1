import React from 'react';
import './App.css';
import {Counter} from "./components/Counter";
import {CounterValue} from "./components/CounterValue";

function App() {

    return (
        <div className="App">
            <div className={'counter'}>
                <CounterValue/>
            </div>
            <div className={'counter'}>
                <Counter/>
            </div>
        </div>
    );
}

export default App;

