
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import emptyStationImg from '../assets/img/empty-station-img.jpg';

const STORAGE_KEY = 'station'
let playlistNumber = 1;

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    removeSong,
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

async function removeSong(songId, currStation) {
    try {
        currStation.songs = currStation.songs.filter(song => song._id !== songId)
        await storageService.put(STORAGE_KEY, currStation)
    }
    catch (err) {
        console.log('Could not remove song', err)
    }
}

async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
    } else {
        // station.owner = userService.getLoggedinUser() MAYBE NEEDED
        savedStation = await storageService.post(STORAGE_KEY, station)
    }
    return savedStation
}

async function addStationMsg(stationId, txt) {
    const station = await getById(stationId)
    if (!station.msgs) station.msgs = []

    const msg = {
        _id: utilService.makeId(),
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
            _id: utilService.makeId(),
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
        "_id": "5ckssadd23jasdvklas111jask",
        "name": "Liked Songs",
        "tags": [
            "liked",
        ],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://misc.scdn.co/liked-songs/liked-songs-64.png"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "5cksxjas89xjsa8xjsa8jxs09",
        "name": "Relaxing Reading",
        "tags": [
            "Funk",
            "Happy"
        ],
        "createdBy": {
            "_id": "u101",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f00000002ba1149f135035bc23c4a7f25"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "_id": "xUVfiajoVxs",
                "title": "Cissy Strut - The Meters",
                "url": "https://www.youtube.com/watch?v=mUkfiLjooxs",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765262,
            },
            {
                "_id": "mUkfiLjooxs",
                "title": "The JB's - Pass The Peas",
                "url": "https://www.youtube.com/watch?v=mUkfiLjooxs",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "addedBy": {}
            },
        ],
        "msgs": [
            {
                _id: 'm101',
                from: '{mini-user}',
                txt: 'Manish?'
            }
        ],
    },
    {
        "_id": "5cksj98as98as9d8a9d8as9d",
        "name": "Viva Latino",
        "tags": [
            "Rock",
            "Rebellion"
        ],
        "createdBy": {
            "_id": "u102",
            "fullname": "Johnny Rebel",
            "imgUrl": "https://i.scdn.co/image/ab67706f000000021a8c68cdb89a2423510f84de"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "_id": "l482T0yNkeo",
                "title": "AC/DC - Highway to Hell",
                "url": "https://www.youtube.com/watch?v=l482T0yNkeo",
                "imgUrl": "https://i.ytimg.com/vi/l482T0yNkeo/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765263
            },
            {
                "_id": "1w7OgIMMRc4",
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
            "imgUrl": "https://i.scdn.co/image/ab67706c0000da84672ab214077d7446c6dcd0ed"
        },
        "likedByUsers": [],
        "songs": [
            {
                "_id": "tO4dxvguQDk",
                "title": "Norah Jones - Don't Know Why",
                "url": "https://www.youtube.com/watch?v=tO4dxvguQDk",
                "imgUrl": "https://i.ytimg.com/vi/tO4dxvguQDk/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765265
            },
            {
                "_id": "jfKfPfyJRdk",
                "title": "Lofi girl",
                "url": "https://www.youtube.com/watch?v=jfKfPfyJRdk",
                "imgUrl": "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765266
            }
        ]
    },
    {
        "_id": "5ckssadd23jasdvklas111jask",
        "name": "Mood Booster",
        "tags": ["happy"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f00000002bd0e19e810bb4b55ab164a95"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "54jklasdd3ssdvklas111jsda",
        "name": "Dark & Stormy",
        "tags": ["rock"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f0000000286bcb2887768d506cded7cd3"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "2jklskaweqwertasdfasfaw34",
        "name": "You & Me",
        "tags": ["relaxing"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f000000021aede1ba8a54598a84c1771f"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "7sdjklasdd3323mkldas4sdd",
        "name": "Deep Focus",
        "tags": ["happy"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67656300005f1f768ad3132768466717242156"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "poijdjklasdd1w2i3oikjlksd",
        "name": "Back in Time",
        "tags": ["rock"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67616d00001e025306ed42ae78f317258c51bb"
        },
        "likedByUsers": [],
        "songs": []
    }, {
        "_id": "as3i4kjklas2lj5klasdlf23",
        "name": "Dance Party",
        "tags": ["happy"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f00000002310432fef1cad89faa1ccc1b"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "wqe2jklasddsfasd32kl4lkj",
        "name": "90's Hip Hop",
        "tags": ["rock"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706c0000da84e1c881f2ed189fe0605338cf"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "9ij3klasdd34234lkj234klj",
        "name": "Pop Mix",
        "tags": ["relaxing"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://seed-mix-image.spotifycdn.com/v6/img/pop/4gzpq5DPGxSnKTe4SA8HAU/en/default"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "23poi2jklasdlkj23kljsdak",
        "name": "להיטים שמחים",
        "tags": ["happy"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f0000000241391070e485ef137bd246a7"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "09jkas9poijklewdopewrjlkj",
        "name": "להיטים ויראלים",
        "tags": ["rock"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f000000020452346ecd514ba73b79aa97"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "zxmz9oi3ujklasdsaddzxvlk",
        "name": "Rock This",
        "tags": ["rock"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f000000029b689c254e4831a47f14597e"
        },
        "likedByUsers": [],
        "songs": []
    },
    {
        "_id": "90u98sakljasd9o8i2qwdhkl",
        "name": "This Is JuiceWRLD",
        "tags": ["relaxing"],
        "createdBy": {
            "_id": "",
            "fullname": "",
            "imgUrl": "https://i.scdn.co/image/ab67706f0000000262a2b2b0d95d902b307837d2"
        },
        "likedByUsers": [],
        "songs": []
    }
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
