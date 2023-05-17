export type InitialStateType = typeof initialState;
type IncValueType = {
    type: 'INC_VALUE',
    value: number
}
type SetStartValueType = {
    type: 'SET_START_VALUE'
    startValue: number
}
type SetMaxValueType = {
    type: 'SET_MAX_VALUE'
    maxValue: number
}
type SetCounterValueType = {
    type: 'SET_COUNTER_VALUE'
    counterValue: number
}
export type CounterActionsType =
    IncValueType
    | SetStartValueType
    | SetMaxValueType
    | SetCounterValueType

let initialState = {
    counterValue: 0,
    startValue: 0,
    maxValue: 1
}

export const counterReducer = (state: InitialStateType = initialState, action: CounterActionsType): InitialStateType => {
    switch (action.type) {
        case 'INC_VALUE': {
            if (state.counterValue >= state.maxValue) {
                return {...state}
            } else {
                return {...state, counterValue: state.counterValue + 1}
            }
        }

        case 'SET_START_VALUE' : {

            if (action.startValue >= 0 && action.startValue < state.maxValue) {
                return {...state, startValue: action.startValue, counterValue: action.startValue}
            } else {
                return {...state}
            }

        }
        case 'SET_MAX_VALUE' : {
            if (action.maxValue > 0 && action.maxValue > state.startValue) {
                return {...state, maxValue: action.maxValue}
            } else {
                return {...state}
            }
        }
        case "SET_COUNTER_VALUE": {
            return {...state, counterValue: action.counterValue}
        }

        default:
            return state
    }

}

export const incValueAC = (value: number): IncValueType => ({type: 'INC_VALUE', value} as const);
export const setStartValueAC = (startValue: number): SetStartValueType => ({
    type: 'SET_START_VALUE',
    startValue
} as const);
export const setMaxValueAC = (maxValue: number): SetMaxValueType => ({
    type: 'SET_MAX_VALUE',
    maxValue
} as const);

export const setCounterValueAC = (counterValue: number): SetCounterValueType => ({
    type: 'SET_COUNTER_VALUE',
    counterValue
} as const);
