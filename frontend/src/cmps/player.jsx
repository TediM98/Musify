import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import { utilService } from '../services/util.service'
import { trackService } from '../services/track.service'
import { setCurrentTime, setIsPlaying, setPlayer, setSongDuration } from '../store/player.actions'
import { useSelector } from 'react-redux'
import { svgService } from '../services/svg.service'

export function StationPlayer() {
  const [progressValue, setProgressValue] = useState(0)
  const [volumeValue, setVolumeValue] = useState(25)
  const [isProgressBarHovered, setIsProgressBarHovered] = useState(false);
  const [isVolumeBarHovered, setIsVolumeBarHovered] = useState(false);
  const songDuration = useSelector((storeState) => storeState.playerModule.songDuration)
  const currentTime = useSelector((storeState) => storeState.playerModule.currentTime)
  const player = useSelector((storeState) => storeState.playerModule.player)
  const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
  const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)

  useEffect(() => {
    if (isPlaying) {
      const updatePlayerInfo = () => {
        setCurrentTime(player.getCurrentTime())
        setSongDuration(player.getDuration())
        console.log('current time RAW', player.getCurrentTime())
        console.log('DURATION time RAW', player.getDuration())
      }
      const intervalId = setInterval(updatePlayerInfo, 1000)
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying])
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
      const newTime = currentTime + 10
      player.seekTo(newTime, true)
      setCurrentTime(newTime)
    }
  }
  const handleBackward = () => {
    if (player) {
      const newTime = currentTime - 10
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
    setIsVolumeBarHovered(true);
  }
  const handleVolumeBarMouseLeave = () => {
    setIsVolumeBarHovered(false);
  }
  const volumeBarStyle = {
    background: isVolumeBarHovered
      ? `linear-gradient(to right, #1db954 0%, #1db954 ${volumeValue}%, #ffffff ${volumeValue}%, #ffffff 100%)`
      : '#cccccc',
  }

//PROGRESS BAR

  const handleProgressChange = (event) => {
    const targetTime = (event.target.value / 100) * songDuration
    player.seekTo(targetTime, true)
    setCurrentTime(targetTime)
    setProgressValue(event.target.value)
  }

  const handleProgressBarMouseEnter = () => {
    setIsProgressBarHovered(true);
  }
  const handleProgressBarMouseLeave = () => {
    setIsProgressBarHovered(false);
  }
  const progressBarStyle = {
    background: isProgressBarHovered
      ? `linear-gradient(to right, #1db954 0%, #1db954 ${progressValue}%, #ffffff ${progressValue}%, #ffffff 100%)`
      : '#cccccc',
  }
  return (
    <div className="main-player-section full">
      <div className="player-container flex">
        <YouTube videoId={songPlaying} opts={opts} onReady={handlePlayerReady} />
        <div className="left-controls">left elements</div>
        <div className="center-controls">
          <div className="top-center-controls">
            <button className="backBtn" onClick={handleBackward}>
              {svgService.goBackIcon}
            </button>
            <button className="playBtn" onClick={handlePlay}>
              {isPlaying ? svgService.playerPauseTrackIcon : svgService.playerPlayTrackIcon}
            </button>
            <button className="fwdBtn" onClick={handleForward}>
              {svgService.playerFwdTrackIcon}
            </button>
          </div>
          <div className="bottom-center-controls flex">
            <div className="progress-bar flex">
              <div className="time-stamp start">{utilService.convertTime(currentTime) || '-:--'}</div>
              <input
                className="progress-bar-element"
                name='progressControl'
                type="range"
                min="0"
                max="100"
                value={progressValue || 0}
                onMouseEnter={handleProgressBarMouseEnter}
                onMouseLeave={handleProgressBarMouseLeave}
                onChange={handleProgressChange}
                style={progressBarStyle}
              />

              <div className="time-stamp end">{utilService.convertTime(songDuration) || '--:--'}</div>
            </div>
          </div>
        </div>
        <div className="right-controls">
          <button className='muteBtn' onClick={handleMute}>
            {svgService.playerMuteIcon}
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
            style={volumeBarStyle} />
          right elements
        </div>
      </div>
    </div>
  )
}
