import { stationService } from "./station.service.local"
import { utilService } from './util.service.js'
import { httpService } from "./http.service.js"
import axios from "axios"


export const trackService = {
  getVideos
}
const KEY = 'videosDB'
const apiKey = 'AIzaSyBXoADElJGhZqCARcEFd--MD-fZCaCZZLg'

function getVideos(term, amount = 5) {
  const termVideosMap = utilService.loadFromStorage(KEY) || {}
  if (termVideosMap[term]) return Promise.resolve(termVideosMap[term])

  console.log('Getting from Network')
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${amount}&q=${term}&key=${apiKey}`
    )
    .then((res) => res.data.items)
    .then((ytVideos) =>
      Promise.all(
        ytVideos.map((ytVideo) => {
          const videoId = ytVideo.id.videoId
          const videoPromise = axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
          )
          return videoPromise.then((res) => {
            if (res.data.items && res.data.items.length > 0) {
              return res.data.items[0].contentDetails.duration
            } else {
              return ''
            }
          })
        })
      )
        .then((durations) => {
          ytVideos = ytVideos.map((ytVideo, index) => {
            const duration = durations[index] ?
              convertDuration(durations[index]) : 'Unknown'
            return {
              _id: ytVideo.id.videoId,
              title: ytVideo.snippet.title,
              imgUrl: ytVideo.snippet.thumbnails.default.url,
              addedAt: ytVideo.snippet.publishedAt,
              duration: duration,
            }
          })

          termVideosMap[term] = ytVideos
          utilService.saveToStorage(KEY, termVideosMap)
          return ytVideos
        })
    )
}


function convertDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

  const hours = parseInt(match[1]) || 0
  const minutes = parseInt(match[2]) || 0
  const seconds = parseInt(match[3]) || 0

  let formattedDuration = ''

  if (hours > 0) {
    formattedDuration += `${padZero(hours)}:`
  }

  formattedDuration += `${padZero(minutes)}:${padZero(seconds)}`

  return formattedDuration
}


function padZero(num) {
  return num.toString().padStart(2, '0')
}