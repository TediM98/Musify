import { store } from "./store.js"

import {
  SET_PLAYER,
  SET_IS_PLAYING,
  SONG_PLAYING,
  CURRENT_TIME,
  SONG_DURATION,
} from "./player.reducer.js"
export function setPlayer(player) {
  store.dispatch({ type: SET_PLAYER, player })
}

export function setIsPlaying(isPlaying) {
  store.dispatch({ type: SET_IS_PLAYING, isPlaying })
}

export function setSongPlaying(songPlaying) {
  store.dispatch({ type: SONG_PLAYING, songPlaying })
}

export function setCurrentTime(currentTime) {
  store.dispatch({ type: CURRENT_TIME, currentTime })
}

export function setSongDuration(songDuration) {
  store.dispatch({ type: SONG_DURATION, songDuration })
}
