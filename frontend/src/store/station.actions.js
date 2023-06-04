import { stationService } from "../services/station.service.local.js"
import { store } from './store.js'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UPDATE_STATION } from "./station.reducer.js"

// Action Creators:
export function getActionRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
export function getActionAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
export function getActionUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}

export async function loadStations() {
    try {
        const stations = await stationService.query()
        console.log('Stations from DB:', stations)
        store.dispatch({
            type: SET_STATIONS,
            stations
        })

    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }

}

export async function removeStation(stationId) {
    console.log('stationId', stationId)
    try {
        await stationService.remove(stationId)
        store.dispatch(getActionRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        console.log('Added Station', savedStation)
        store.dispatch(getActionAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station!!!', err)
        throw err
    }
}

// export function updateStation(station) {
//     return stationService.save(station)
//         .then(savedStation => {
//             console.log('Updated Station:', savedStation)
//             store.dispatch(getActionUpdateStation(savedStation))
//             return savedStation
//         })
//         .catch(err => {
//             console.log('Cannot save station', err)
//             throw err
//         })
// }


// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveStationOptimistic(stationId) {
//     store.dispatch({
//         type: REMOVE_STATION,
//         stationId
//     })
//     showSuccessMsg('Station removed')

//     stationService.remove(stationId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove station')
//             console.log('Cannot load stations', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_STATION,
//             })
//         })
// }
