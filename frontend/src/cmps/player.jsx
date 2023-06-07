import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import { utilService } from '../services/util.service'
import { trackService } from '../services/track.service'
import {
  setCurrentTime,
  setIsPlaying,
  setPlayer,
  setSongDuration,
  setSongPlaying,
} from '../store/player.actions'
import { useSelector } from 'react-redux'
import { svgService } from '../services/svg.service'
import { loadStations, setCurrStation } from '../store/station.actions'

export function StationPlayer() {
  const [progressValue, setProgressValue] = useState(0)
  const [volumeValue, setVolumeValue] = useState(25)
  const [isMuted, setIsMuted] = useState(false)
  const [isProgressBarHovered, setIsProgressBarHovered] = useState(false)
  const [isVolumeBarHovered, setIsVolumeBarHovered] = useState(false)
  const songDuration = useSelector(
    (storeState) => storeState.playerModule.songDuration
  )
  const currentTime = useSelector(
    (storeState) => storeState.playerModule.currentTime
  )
  const player = useSelector((storeState) => storeState.playerModule.player)
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const songPlaying = useSelector(
    (storeState) => storeState.playerModule.songPlaying
  )
  const currStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  useEffect(() => {
    console.log('songPlaying', songPlaying)
    console.log('stations', stations)
    if (isPlaying) {
      const updatePlayerInfo = () => {
        setCurrentTime(player.getCurrentTime())
        setSongDuration(player.getDuration())
      }
      const intervalId = setInterval(updatePlayerInfo, 1000)
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying, songPlaying])

  useEffect(() => {
    setProgressValue((currentTime / songDuration) * 100)
  }, [currentTime, songDuration])

  const handlePlay = () => {
    if (player) {
      !isPlaying ? player.playVideo() : player.pauseVideo()
      setIsPlaying(!isPlaying)
    }
  }

  //PLAYER CONTROLS

  const handleForward = () => {
    if (player) {
      const newTime = currentTime + 15
      player.seekTo(newTime, true)
      setCurrentTime(newTime)
    }
  }

  const handleBackward = () => {
    if (player) {
      const newTime = currentTime - 15
      player.seekTo(newTime, true)
      setCurrentTime(newTime)
    }
  }

  const handleMute = () => {
    if (player.isMuted()) {
      player.unMute()
    } else {
      player.mute()
    }
    setIsMuted(!isMuted)
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
  //VOLUME BAR
  const handleVolumeChange = (event) => {
    player.setVolume(event.target.value)
    setVolumeValue(event.target.value)
  }

  const handleVolumeBarMouseEnter = () => {
    setIsVolumeBarHovered(true)
  }
  const getVolumeIcon = () => {
    if (volumeValue < 0.01) {
      return svgService.volumeIcon0
    } else if (volumeValue <= 33) {
      return svgService.volumeIcon33
    } else if (volumeValue <= 66) {
      return svgService.volumeIcon66
    } else {
      return svgService.volumeIcon100
    }
  }

  const handleVolumeBarMouseLeave = () => {
    setIsVolumeBarHovered(false)
  }

  let volumeBarStyle = {
    background: isVolumeBarHovered
      ? `linear-gradient(to right, #1db954 0%, #1db954 ${volumeValue}%, hsla(0,0%,100%,.3) ${volumeValue}%, hsla(0,0%,100%,.3) 100%)`
      : `linear-gradient(to right, #fff 0%, #fff ${volumeValue}%, hsla(0,0%,100%,.3) ${volumeValue}%, hsla(0,0%,100%,.3) 100%)`,
  }

  //PROGRESS BAR

  const handleProgressChange = (event) => {
    const targetTime = (event.target.value / 100) * songDuration
    player.seekTo(targetTime, true)
    setCurrentTime(targetTime)
    setProgressValue(event.target.value)
  }

  const handleProgressBarMouseEnter = () => {
    setIsProgressBarHovered(true)
  }

  const handleProgressBarMouseLeave = () => {
    setIsProgressBarHovered(false)
  }

  const progressBarStyle = {
    background: isProgressBarHovered
      ? `linear-gradient(to right, #1db954 0%, #1db954 ${progressValue}%, hsla(0,0%,100%,.3) ${progressValue}%, hsla(0,0%,100%,.3) 100%)`
      : `linear-gradient(to right, #fff 0%, #fff ${progressValue}%, hsla(0,0%,100%,.3) ${progressValue}%, hsla(0,0%,100%,.3) 100%)`,
  }

  // if (!songIdx) return
  // const nextSong = currStation.songs[songIdx + 1]
  // const prevSong = currStation.songs[songIdx - 1]

  // const songsToPlay = {
  //   prevSong: prevSong || currStation.songs[0]._id,
  //   currSong: songId,
  //   nextSong: nextSong || currStation.songs[0]._id,
  // }

  function onChangeSong(reqSong) {
    console.log('currStation', currStation)
    setSongPlaying({
      songId: reqSong
        ? currStation.songs[songPlaying.songIdx + 1]._id
        : currStation.songs[songPlaying.songIdx - 1]._id,
      songIdx: songPlaying.songIdx,
    })
  }
  // {songId: setCurrStation.songs[songPlaying.songIdx + 1]._id , songIdx: songPlaying.songIdx + 1 }
  return (
    <div className="main-player-section full">
      <div className="player-container flex">
        <YouTube
          videoId={songPlaying.songId || stations[0].songs[0]._id}
          opts={opts}
          onReady={handlePlayerReady}
        />
        {currStation && (
          <div className="left-controls">
            <div className="station-img">
              <img src={currStation.createdBy.imgUrl} alt="station-img" />
            </div>
            <div className="song-name">
              <span></span>
            </div>
          </div>
        )}
        <div className="center-controls">
          <div className="top-center-controls">
            <button className="backBtn" onClick={() => onChangeSong(1)}>
              {svgService.goBackIcon}
            </button>
            <button className="playBtn" onClick={handlePlay}>
              {isPlaying
                ? svgService.playerPauseTrackIcon
                : svgService.playerPlayTrackIcon}
            </button>
            <button className="fwdBtn" onClick={() => onChangeSong(-1)}>
              {svgService.playerFwdTrackIcon}
            </button>
          </div>
          <div className="bottom-center-controls flex">
            <div className="progress-bar flex">
              <div className="time-stamp start">
                {utilService.convertTime(currentTime) || '-:--'}
              </div>
              <input
                className="progress-bar-element"
                name="progressControl"
                type="range"
                min="0"
                max="100"
                value={progressValue || 0}
                onMouseEnter={handleProgressBarMouseEnter}
                onMouseLeave={handleProgressBarMouseLeave}
                onChange={handleProgressChange}
                style={progressBarStyle}
              />

              <div className="time-stamp end">
                {utilService.convertTime(songDuration) || '--:--'}
              </div>
            </div>
          </div>
        </div>

        <div className="right-controls flex">
          <div className="volume-container">
            <button className="btn-mute" onClick={handleMute}>
              {getVolumeIcon()}
              {/* <div className="volume-bar-icon" style={{ backgroundImage: getVolumeBarIcon() }}></div> */}
            </button>
            <input
              className="volume-bar-element"
              type="range"
              name="volumeControl"
              min="0"
              max="100"
              value={volumeValue}
              onMouseEnter={handleVolumeBarMouseEnter}
              onMouseLeave={handleVolumeBarMouseLeave}
              onChange={handleVolumeChange}
              style={volumeBarStyle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
