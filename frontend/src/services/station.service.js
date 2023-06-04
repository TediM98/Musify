
import { httpService } from './http.service.js'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
}
window.cs = stationService // FOR DEBUGGING ONLY


async function query(filterBy = { txt: '', }) {
    try {
        return await httpService.get(STORAGE_KEY, filterBy)
    }
    catch (err) {
        console.log('Could not filter')
        throw err
    }
}

async function getById(stationId) {
    try {
        return httpService.get(`station/${stationId}`)
    }
    catch (err) {
        console.log('Could not get station')
        throw err
    }
}

async function remove(stationId) {
    try {
        return httpService.delete(`station/${stationId}`)
    }
    catch (err) {
        console.log('Could not remove station')
        throw err
    }
}

async function save(station) {
    var savedStation
    try {
        if (station._id) {
            savedStation = await httpService.put(`station/${station._id}`, station)
        } else {
            savedStation = await httpService.post('station', station)
        }
        return savedStation
    }
    catch (err) {
        console.log('Could not save station')
        throw err
    }
}

function getEmptyStation() {
    return {
        name: '',
        artist: '',
    }
}





