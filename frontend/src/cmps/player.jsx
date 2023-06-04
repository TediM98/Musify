import React, { useState } from 'react'
import YouTube from 'react-youtube'

import { trackService } from '../services/track.service'
import { setIsPlaying } from '../store/player.actions'
import { useSelector } from 'react-redux'
import { svgService } from '../services/svg.service'
//GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=The%20office&key=[YOUR_API_KEY] HTTP/1.1

// console.log(trackService.getVideos('joy division')) //----------------DO NOT ERASE, COMMENTED TO PREVENT YT API BLOCK

export function StationPlayer() {
  const [searchTerm, setSearchTerm] = useState(null)
  const [player, setPlayer] = useState(null)
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const songPlaying = useSelector(
    (storeState) => storeState.playerModule.songPlaying
  )

  let gTop5Vids = []

  const handlePlay = () => {
    if (player) {
      if (!isPlaying) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleStop = () => {
    if (player) {
      player.stopVideo()
      setIsPlaying(false)
    }
  }

  const handleForward = () => {
    if (player) {
      const currentTime = player.getCurrentTime()
      player.seekTo(currentTime + 10, true)
    }
  }
  const handleBackward = () => {
    if (player) {
      const currentTime = player.getCurrentTime()
      player.seekTo(currentTime - 10, true)
    }
  }

  const handlePlayerReady = (event) => {
    setPlayer(event.target)
  }

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  }

  return (
    <div className="main-player-section full">
      <div className="player-container flex">
        <YouTube
          videoId="3tD2HJ-TQaM"
          opts={opts}
          onReady={handlePlayerReady}
        />
        <div className="left-controls">left elements</div>
        <div className="center-controls">
          <div className="top-center-controls">
            <button className="backBtn" onClick={handleBackward}>
              {svgService.goBackIcon}
            </button>
            <button className="playBtn" onClick={handlePlay}>
              {isPlaying
                ? svgService.playerPlayTrackIcon
                : svgService.playerPauseTrackIcon}
            </button>
            <button className="fwdBtn" onClick={handleForward}>
              {svgService.playerFwdTrackIcon}
            </button>
          </div>

          <div className="bottom-center-controls flex">
            <div className="time-stamp start">00:00</div>
            <div className="progress-bar ">
              <input
                className="progress-bar-element"
                type="range"
                min="0"
                max="100"
              ></input>
            </div>
            <div className="time-stamp end">05:00</div>
          </div>
        </div>
        <div className="right-controls">right elements</div>
      </div>
    </div>
  )
}
