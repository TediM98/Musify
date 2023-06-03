import { store } from './store.js'
import { useDispatch } from 'react-redux';

import {
    SET_IS_PLAYING,
    SONG_IS_PLAYING
} from './player.reducer.js'

export function setIsPlaying(isPlaying) {
    // store.dispatch({ type: SET_IS_PLAYING, isPlaying: isPlaying })
    store.dispatch({ type: SET_IS_PLAYING, isPlaying: isPlaying });
}

export function setSongPlaying(songPlaying){

    store.dispatch({type: SONG_IS_PLAYING,songPlaying:songPlaying })
}