import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {CounterActionsType, counterReducer} from "./reducer";
import thunk, {ThunkAction, ThunkDispatch } from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {loadState, saveState} from "../localstorage/localstorage";

let rootReducer = combineReducers({
    counter:counterReducer
});
const persistedState = loadState();
export const store = legacy_createStore(rootReducer, persistedState,applyMiddleware(thunk))


store.subscribe(() => {
    saveState({
        counter: store.getState().counter
    });
});

export type AppRootStateType= ReturnType<typeof rootReducer>
export type AppStoreType = typeof store;

export type AppActionTypes = CounterActionsType;
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionTypes>;

//@ts-ignore
window.store=store
