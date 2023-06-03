import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'

import { trackService } from '../services/track.service'
import { playerService } from '../services/player.service'
import { setIsPlaying } from '../store/player.actions'
import { useSelector } from 'react-redux'
import { SET_IS_PLAYING } from '../store/player.reducer'
import { store } from '../store/store'
//GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=The%20office&key=[YOUR_API_KEY] HTTP/1.1

// console.log(trackService.getVideos('joy division')) //----------------DO NOT ERASE, COMMENTED TO PREVENT YT API BLOCK

export function StationPlayer() {
  const [searchTerm, setSearchTerm] = useState(null)
  const [player, setPlayer] = useState(null)
  // const [isPlaying, setIsPlaying] = useState(false)
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )

  useEffect(() => {
    playerService.getTop5Vids(searchTerm).then((res) => console.log('res', res))
  }, [searchTerm])

  const urlTop5res =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCnIU7BggBEDwYjvfLXe8uRRHSIVbyXZg8&q={value}'

  let gTop5Vids = []

  const handlePlay = () => {
    if (player) {
      if (!isPlaying) {
        player.playVideo()
        // setIsPlaying(true)
      } else {
        player.pauseVideo()
        // setIsPlaying(false)
      }
      setIsPlaying(!isPlaying)

      // store.dispatch({ type: SET_IS_PLAYING, isPlaying: !isPlaying })
    }
  }

  const handleStop = () => {
    if (player) {
      player.stopVideo()
      setIsPlaying(false)
      // store.dispatch({ type: SET_IS_PLAYING, isPlaying: false })
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
    <div>
      <YouTube videoId="3tD2HJ-TQaM" opts={opts} onReady={handlePlayerReady} />
      <div>
        <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleBackward}>Backward</button>
        <button onClick={handleForward}>Forward</button>
      </div>
    </div>
  )
}

// import React, { useState } from 'react';
// import YouTube from 'react-youtube';

// export function StationPlayer() {
//   const [player, setPlayer] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlay = () => {
//     if (player) {
//       if (!isPlaying) {
//         player.playVideo();
//         setIsPlaying(true);
//       } else {
//         player.pauseVideo();
//         setIsPlaying(false);
//       }
//     }
//   };

//   const handleStop = () => {
//     if (player) {
//       player.stopVideo();
//       setIsPlaying(false);
//     }
//   };

//   const handleForward = () => {
//     if (player) {
//       const currentTime = player.getCurrentTime();
//       player.seekTo(currentTime + 10, true);
//     }
//   };

//   const handleBackward = () => {
//     if (player) {
//       const currentTime = player.getCurrentTime();
//       player.seekTo(currentTime - 10, true);
//     }
//   };

//   const handlePlayerReady = (event) => {
//     setPlayer(event.target);
//   };

//   const opts = {
//     height: '0',
//       width: '0',
//     playerVars: {
//       autoplay: 0,
//       controls: 0,
//     },
//   };

//   return (
//     <div>
//       <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={handlePlayerReady} />

//       <div>
//         <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
//         <button onClick={handleStop}>Stop</button>
//         <button onClick={handleBackward}>Backward</button>
//         <button onClick={handleForward}>Forward</button>
//       </div>
//     </div>
//   );
// }
