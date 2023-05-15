import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {counterReducer} from "./reducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    counter:counterReducer
});

export type AppStateType= ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppStoreType = typeof store;


//@ts-ignore
window.store=store
