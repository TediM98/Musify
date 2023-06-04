
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import emptyStationImg from '../assets/img/empty-station-img.jpg';


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    // addStationMsg
}
window.cs = stationService


async function query(filterBy = { txt: '', }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.name) || regex.test(station.description))
    }
    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        // Later, owner is set by the backend
        // station.owner = userService.getLoggedinUser() MAYBE NEEDED
        savedStation = await storageService.post(STORAGE_KEY, station)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    // Later, this is all done by the backend
    const station = await getById(stationId)
    if (!station.msgs) station.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}

function getEmptyStation() {
    return {
        _id: "",
        name: "My playlist #1 ",
        tags: [],
        createdBy: {
            _id: "u555",
            fullname: "",
            imgUrl: emptyStationImg
        },
        likedByUsers: [],
        songs: [],
        msgs: [],
    }
}

const demoStation = [
    {
        "_id": "5cksxjas89xjsa8xjsa8jxs09",
        "name": "Funky Monks",
        "tags": [
            "Funk",
            "Happy"
        ],
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "id": "mUkfiLjooxs",
                "title": "Cissy Strut - The Meters",
                "url": "https://www.youtube.com/watch?v=mUkfiLjooxs",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765262,
            },
            {
                "id": "mUkfiLjooxs",
                "title": "The JB's - Pass The Peas",
                "url": "https://www.youtube.com/watch?v=mUkfiLjooxs",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "addedBy": {}
            },
        ],
        "msgs": [
            {
                id: 'm101',
                from: '{mini-user}',
                txt: 'Manish?'
            }
        ],
    },
    {
        "_id": "5cksj98as98as9d8a9d8as9d",
        "name": "Rocking Rebels",
        "tags": [
            "Rock",
            "Rebellion"
        ],
        "createdBy": {
            "_id": "u102",
            "fullname": "Johnny Rebel",
            "imgUrl": "https://i.ytimg.com/vi/1w7OgIMMRc4/mqdefault.jpg"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "id": "l482T0yNkeo",
                "title": "AC/DC - Highway to Hell",
                "url": "https://www.youtube.com/watch?v=l482T0yNkeo",
                "imgUrl": "https://i.ytimg.com/vi/l482T0yNkeo/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765263
            },
            {
                "id": "1w7OgIMMRc4",
                "title": "Guns N' Roses - Sweet Child O' Mine",
                "url": "https://www.youtube.com/watch?v=1w7OgIMMRc4",
                "imgUrl": "https://i.ytimg.com/vi/1w7OgIMMRc4/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765264
            }
        ]
    },
    {
        "_id": "5ckssad123jasdjklas123jask",
        "name": "Chill Vibes",
        "tags": [
            "Relaxing",
            "Mellow"
        ],
        "createdBy": {
            "_id": "u103",
            "fullname": "Laid-Back Lou",
            "imgUrl": "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg"
        },
        "likedByUsers": [],
        "songs": [
            {
                "id": "tO4dxvguQDk",
                "title": "Norah Jones - Don't Know Why",
                "url": "https://www.youtube.com/watch?v=tO4dxvguQDk",
                "imgUrl": "https://i.ytimg.com/vi/tO4dxvguQDk/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765265
            },
            {
                "id": "jfKfPfyJRdk",
                "title": "Lofi girl",
                "url": "https://www.youtube.com/watch?v=jfKfPfyJRdk",
                "imgUrl": "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765266
            }
        ]
    },

]

_createStations()
function _createStations() {
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if (!stations || !stations.length) {
        stations = demoStation
        utilService.saveToStorage(STORAGE_KEY, stations)
    }
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
