export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const SONG_PLAYING = 'SONG_IS_PLAYING'
const initialState = {
    isPlaying: false,
    songPlaying: {}
}

export function playerReducer(state = initialState, action) {

    switch (action.type) {
        case SET_IS_PLAYING:
            return { ...state, isPlaying: action.isPlaying }
        case SONG_PLAYING:
            return { ...state, songPlaying: action.songPlaying }
        default:
            return state
    }
}