import {AppRootStateType, AppThunkType} from "./store";

let initialState = {
    value: 3,
    startValue: 0,
    maxValue: 0
}
export type InitialStateType = typeof initialState
type IncValueType = {
    type: 'INC_VALUE'
}

type SetValueType = {
    type: 'SET_VALUE'
    value:number
}
type SetStartValueType = {
    type: 'SET_START_VALUE'
    startValue: number
}
type SetMaxValueType = {
    type: 'SET_MAX_VALUE'
    maxValue:number
}

export type CounterActionsType = IncValueType | SetValueType |SetStartValueType | SetMaxValueType;
export const counterReducer = (state:InitialStateType = initialState, action:CounterActionsType):InitialStateType => {
    switch (action.type) {
        case 'INC_VALUE':{
            return {...state, value: state.value + 1}
        }
        case 'SET_VALUE' :{
            return {...state, value: action.value}
        }
        case 'SET_START_VALUE' :{
            return {...state, startValue: action.startValue}
        }
        case 'SET_MAX_VALUE' :{
            return {...state, maxValue: action.maxValue}
        }

        default:
            return state
    }

}

export const incValueAC = (): IncValueType => ({type: 'INC_VALUE'} as const);
export const setValueFromLocalStorageAC = (value:number): SetValueType => ({type: 'SET_VALUE', value} as const);
export const setStartValueFromLocalStorageAC = (startValue:number): SetStartValueType => ({type: 'SET_START_VALUE', startValue} as const);
export const setMaxValueFromLocalStorageAC = (maxValue:number): SetMaxValueType => ({type: 'SET_MAX_VALUE', maxValue} as const);

//thunk

// export const setValueToLSTK = ():AppThunkType=>(dispatch, getState: ()=> AppRootStateType) =>{
//
//     let currentValue = getState().counter.value
//     //setStart LS value
//     localStorage.setItem('startValue', JSON.stringify(currentValue + 1));
//     dispatch(incValueAC())
// }
//
// export const setValueFromLSTK = ():AppThunkType=>(dispatch, getState: ()=> AppRootStateType) =>{
//     let valueAsString = localStorage.getItem('startValue');
//
//     if (valueAsString) {
//         let newValue = JSON.parse(valueAsString)
//         dispatch(setStartValueFromLocalStorageAC(+valueAsString))
//         // setCounterValue(newValue)
//         // setStartValue(newValue)
//         // setValueFromLocalStorageAC(newValue)
//     }
//
//     let valueMaxAsString = localStorage.getItem('maxValue');
//
//     if (valueMaxAsString) {
//         let newMaxValue = JSON.parse(valueMaxAsString)
//         dispatch(setMaxValueFromLocalStorageAC(+newMaxValue))
//         // setMaxValue(newMaxValue)
//     }
//
//
// }
