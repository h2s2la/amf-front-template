// third-party
import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// project import
import menu from './menu';
import user from './user';

// ==============================|| COMBINE REDUCERS ||============================== //
const persistConfig = {
    key: "root",
    // localStorage에 저장합니다.
    storage,
    // user reducer만 localstorage에 저장합니다.
    whitelist: ["user"]
    // blacklist -> 그것만 제외합니다
};

const reducers = combineReducers({ menu, user});

export default persistReducer(persistConfig, reducers);
