import { createStore, combineReducers } from "redux"

import { stationReducer } from "./station.reducer.js"
import { playerReducer } from "./player.reducer.js"

const rootReducer = combineReducers({
  stationModule: stationReducer,
  playerModule: playerReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)