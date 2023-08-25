
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
    await storageService.remove(STORAGE_KEY, stationId)
}

async function removeSong(songId, currStation) {
    try {
        currStation.songs = currStation.songs.filter(song => song._id !==
            songId)
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



function getEmptyStation() {
    return {
        _id: "",
        name: "My playlist #1 ",
        description: '',
        tags: [],
        createdBy: {
            _id: utilService.makeId(),
            owner: "admin",
            imgUrl: emptyStationImg
        },
        likedByUsers: [],
        songs: [],
    }
}

const demoStation =
    [
        {
            "name": "Liked Songs",
            "tags": [
                "liked",
            ],
            "createdBy": {
                "owner": "admin",
                "imgUrl": "https://misc.scdn.co/liked-songs/liked-songs-64.png"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "Relaxing Reading",
            "description": "funky music",
            "tags": [
                "Funk",
                "Happy"
            ],
            "createdBy": {
                "owner": "",
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
                    "duration": "03:01"
                },
                {
                    "_id": "mUkfiLjooxs",
                    "title": "The JB's - Pass The Peas",
                    "url": "https://www.youtube.com/watch?v=mUkfiLjooxs",
                    "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                    "addedBy": {},
                    "duration": "03:01"
                },
            ],
        },
        {

            "name": "Viva Latino",
            "tags": [
                "Rock",
                "Rebellion"
            ],
            "createdBy": {
                "owner": "Johnny Rebel",
                "imgUrl": "https://i.scdn.co/image/ab67706f000000021a8c68cdb89a2423510f84de"
            },
            "likedByUsers": [],
            "songs": [
                {
                    "_id": "l482T0yNkeo",
                    "title": "AC/DC - Highway to Hell",
                    "url": "https://www.youtube.com/watch?v=l482T0yNkeo",
                    "imgUrl": "https://i.ytimg.com/vi/l482T0yNkeo/mqdefault.jpg",
                    "addedBy": '{minimal-user}',
                    "addedAt": 162521765263,
                    "duration": "03:28"
                },
                {
                    "_id": "1w7OgIMMRc4",
                    "title": "Guns N' Roses - Sweet Child O' Mine",
                    "url": "https://www.youtube.com/watch?v=1w7OgIMMRc4",
                    "imgUrl": "https://i.ytimg.com/vi/1w7OgIMMRc4/mqdefault.jpg",
                    "addedBy": '{minimal-user}',
                    "addedAt": 162521765264,
                    "duration": "05:03"
                }
            ]
        },
        {
            "name": "Chill Vibes",
            "tags": [
                "Relaxing",
                "Mellow"
            ],
            "createdBy": {
                "owner": "Laid-Back Lou",
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
                    "addedAt": 162521765265,
                    "duration": "03:07"
                },
                {
                    "_id": "jfKfPfyJRdk",
                    "title": "Lofi girl",
                    "url": "https://www.youtube.com/watch?v=jfKfPfyJRdk",
                    "imgUrl": "https://i.ytimg.com/vi/5qap5aO4i9A/mqdefault.jpg",
                    "addedBy": '{minimal-user}',
                    "addedAt": 162521765266,
                    "duration": "53:07"
                }
            ]
        },
        {
            "name": "Mood Booster",
            "tags": ["happy"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706f00000002bd0e19e810bb4b55ab164a95"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "Dark & Stormy",
            "tags": ["rock"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706f0000000286bcb2887768d506cded7cd3"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "You & Me",
            "tags": ["relaxing"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706f000000021aede1ba8a54598a84c1771f"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "Deep Focus",
            "tags": ["happy"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67656300005f1f768ad3132768466717242156"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "Back in Time",
            "tags": ["rock"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67616d00001e025306ed42ae78f317258c51bb"
            },
            "likedByUsers": [],
            "songs": []
        }, {
            "name": "Dance Party",
            "tags": ["happy"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706f00000002310432fef1cad89faa1ccc1b"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "90's Hip Hop",
            "tags": ["rock"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706c0000da84e1c881f2ed189fe0605338cf"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "Pop Mix",
            "tags": ["relaxing"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://seed-mix-image.spotifycdn.com/v6/img/pop/4gzpq5DPGxSnKTe4SA8HAU/en/default"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "להיטים שמחים",
            "tags": ["happy"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706f0000000241391070e485ef137bd246a7"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "להיטים ויראלים",
            "tags": ["rock"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706f000000020452346ecd514ba73b79aa97"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "Rock This",
            "tags": ["rock"],
            "createdBy": {
                "owner": "",
                "imgUrl": "https://i.scdn.co/image/ab67706f000000029b689c254e4831a47f14597e"
            },
            "likedByUsers": [],
            "songs": []
        },
        {
            "name": "This Is JuiceWRLD",
            "tags": ["relaxing"],
            "createdBy": {
                "owner": "",
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
