export const SET_STATIONS = 'SET_STATIONS'
export const SET_CURRENT_STATION = 'SET_CURRENT_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const REMOVE_SONG = 'REMOVE_SONG'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const SET_SEARCHRES = 'SET_SEARCHRES'

const initialState = {
    stations: [],
    currStation: null,
    searchRes:null,
}

export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    // var currStation = state.currStation
    // var updatedSongs

    switch (action.type) {
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        
        case SET_CURRENT_STATION:
            // console.log(action.currStation)
            newState = { ...state, currStation: action.currStation }
            break
        case REMOVE_STATION:
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations }
            break
        case REMOVE_SONG:
            // updatedSongs = state.currStation.songs.filter(song => song.id !== action.songId)
            newState = { ...state, currStation: action.currStation }
            // newState = { ...state, currStation: { ...currStation, songs: updatedSongs } }
            break
        case ADD_STATION:
            newState = {
                ...state, stations: [...state.stations, action.station]
            }
            break
        case UPDATE_STATION:
            stations = state.stations.map(station => (station._id ===
                action.station._id) ? action.station : station)
            newState = { ...state, stations, currStation: action.station }
            break

            case SET_SEARCHRES:
            newState = { ...state, searchRes: action.searchRes }
            break
        default:
    }
    return newState
}
