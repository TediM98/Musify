import axios from 'axios'
import {utilService} from './util.service.js'


export const trackService = {
    getVideos 
}
const KEY = 'videosDB'


function getVideos(term) {
    const termVideosMap = utilService.loadFromStorage(KEY) || {}
    if (termVideosMap[term]) return Promise.resolve(termVideosMap[term])

    console.log('Getting from Network')
    
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&maxResults=1&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=${term}`)
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