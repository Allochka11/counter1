import {Dispatch} from "redux";

let initialState = {
    value: 100
}
export type InitialStateType = typeof initialState
type IncValueType = {
    type: 'INC_VALUE'
}

type SetValueType = {
    type: 'SET_VALUE'
    value:number
}

type ActionsType = IncValueType | SetValueType;
export const counterReducer = (state:InitialStateType = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'INC_VALUE':{
            return {...state, value: state.value + 1}
        }
        case 'SET_VALUE' :{
            return {...state, value: action.value}
        }
        default:
            return state
    }

}

export const IncValueAC = (): IncValueType => ({type: 'INC_VALUE'} as const);
export const SetValueFromLocalStorageAC = (value:number): SetValueType => ({type: 'SET_VALUE', value} as const);

//thunk

export const IncValueTK = ()=>(dispatch:Dispatch) =>{

}
