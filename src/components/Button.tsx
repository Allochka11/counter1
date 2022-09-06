import React from "react";
import '../App.css'

type ButtonType = {
    name: string
    callback: () => void
    disabled?: true|false
}

export const Button = (props: ButtonType) => {

    function onClickButton() {
        props.callback();
    }

    return (
        <button onClick={onClickButton}
                className={props.disabled ? 'disabledButton' : 'button'}
                disabled={props.disabled}
        >{props.name}</button>
    );
};