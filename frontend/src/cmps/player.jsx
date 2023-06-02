import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { Howl, Howler } from 'howler'
import { trackService } from '../services/track.service'
import { playerService } from '../services/player.service'
import { storageService } from '../services/async-storage.service'

//GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=The%20office&key=[YOUR_API_KEY] HTTP/1.1

//console.log(trackService.getVideos('joy division')) ----------------DO NOT ERASE, COMMENTED TO PREVENT YT API BLOCK

export function StationPlayer() {
  const [searchTerm, setSearchTerm] = useState(null)

  useEffect(() => {
    playerService.getTop5Vids(searchTerm).then((res) => console.log('res', res))
  }, [searchTerm])

  const urlTop5res =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCnIU7BggBEDwYjvfLXe8uRRHSIVbyXZg8&q={value}'

  let gTop5Vids = []

  return (
    <section className="player-container">
      <div>
        <iframe
          width="420"
          height="315"
          src="https://www.youtube.com/embed/2EwViQxSJJQ"
        ></iframe>
      </div>
    </section>
  )
}
