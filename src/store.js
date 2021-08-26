import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers/reducer";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducer)
const middleware = [thunk];

const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(...middleware)))
const persistor = persistStore(store)

export { store, persistor };