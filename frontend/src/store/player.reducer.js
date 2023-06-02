export const SET_IS_PLAYING = 'SET_IS_PLAYING'

const initialState = {
    isPlaying: false,
}

export function playerReducer(state = initialState, action) {

    switch (action.type) {
        case SET_IS_PLAYING:
            return { ...state, isPlaying: action.isPlaying }
        default:
            return state;
    }
}