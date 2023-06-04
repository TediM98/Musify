import { store } from './store.js'

import {
    SET_PLAYER,
    SET_IS_PLAYING,
    SONG_PLAYING
} from './player.reducer.js'
export function setPlayer(player) {
    store.dispatch({ type: SET_PLAYER, player: player });
}

export function setIsPlaying(isPlaying) {
    store.dispatch({ type: SET_IS_PLAYING, isPlaying: isPlaying });
}

export function setSongPlaying(songPlaying) {
    store.dispatch({ type: SONG_PLAYING, songPlaying: songPlaying })
}