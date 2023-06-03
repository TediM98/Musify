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

  // useEffect(() => {
  //   handlePlay()
  // }, [isPlaying])

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
    <div className='player-container main-layout full'>
      <YouTube videoId="3tD2HJ-TQaM" opts={opts} onReady={handlePlayerReady} />
      <div className='player'>
        {/* <button className='stopBtn' onClick={handleStop}>Stop</button> */}
        <button className='backBtn' onClick={handleBackward}><svg xmlns="http://www.w3.org/2000/svg" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="Svg-sc-ytk21e-0 ldgdZj"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" fill="#b3b3b3"/></svg></button>
        <button className='playBtn' onClick={handlePlay}>{isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="Svg-sc-ytk21e-0 ldgdZj"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="Svg-sc-ytk21e-0 ldgdZj"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/></svg>}</button>
        <button className='fwdBton' onClick={handleForward}><svg xmlns="http://www.w3.org/2000/svg" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="Svg-sc-ytk21e-0 ldgdZj"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" fill="#b3b3b3"/></svg></button>
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
