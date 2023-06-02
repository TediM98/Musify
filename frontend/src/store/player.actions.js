import { store } from './store.js'

import {
    SET_IS_PLAYING
} from './player.reducer.js'

export function setIsPlaying(isPlaying) {
    console.log('isPlaying from actions', isPlaying)
    store.dispatch({ type: SET_IS_PLAYING, isPlaying })
}