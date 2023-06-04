import { stationService } from "./station.service.local"
import { utilService } from './util.service.js'
import { httpService } from "./http.service.js"
import axios from "axios"


export const trackService = {
    getVideos
}
const KEY = 'videosDB'
const apiKey = 'AIzaSyB7HGhEzWj5biXGaa4zaAeKyGvcjzoiH3g'


const debouncedGetVideos = utilService.debounce(getVideos)
// console.log(debouncedGetVideos('roxy music')) ////debounced getvideos
console.log(getVideos('roxy music'))

function getVideos(term) {
    const termVideosMap = utilService.loadFromStorage(KEY) || {}
    if (termVideosMap[term]) return Promise.resolve(termVideosMap[term])

    console.log('Getting from Network')
    return httpService.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${term}&key=${apiKey}`)
        .then(res => res.data.items)
        .then(ytVideos => ytVideos.map(ytVideo => ({
            id: ytVideo.id.videoId,
            title: ytVideo.snippet.title,
            img: {
                url: ytVideo.snippet.thumbnails.default.url,
                width: ytVideo.snippet.thumbnails.default.width,
                height: ytVideo.snippet.thumbnails.default.height,
            }
        })))
        .then(videos => {
            termVideosMap[term] = videos
            utilService.saveToStorage(KEY, termVideosMap)
            return videos
        })

}
// const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(term)}&key=${apiKey}`;

// AIzaSyB7HGhEzWj5biXGaa4zaAeKyGvcjzoiH3g

// OG STRING GET:   https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&maxResults=1&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=${term}