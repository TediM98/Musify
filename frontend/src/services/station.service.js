
import { httpService } from './http.service.js'
import emptyStationImg from '../assets/img/empty-station-img.jpg';
import { utilService } from './util.service.js'

const STORAGE_KEY = 'station'
const BASE_URL = 'station/'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
}
window.cs = stationService // FOR DEBUGGING ONLY


async function query(filterBy = {}) {
    try {
        return await httpService.get(BASE_URL, filterBy)
    }
    catch (err) {
        console.log('Could not filter')
        throw err
    }
}

async function getById(stationId) {
    try {
        return httpService.get(BASE_URL + stationId)
    }
    catch (err) {
        console.log('Could not get station')
        throw err
    }
}

async function remove(stationId) {
    try {
        return httpService.delete(BASE_URL + stationId)
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
            savedStation = await httpService.put(BASE_URL + station._id, station)
        } else {
            savedStation = await httpService.post(BASE_URL, station)
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
        name: "My playlist #1 ",
        tags: [],
        createdBy: {
            _id: utilService.makeId(),
            fullname: "",
            imgUrl: emptyStationImg
        },
        likedByUsers: [],
        songs: [],
        msgs: [],
    }
}



