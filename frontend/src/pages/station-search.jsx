import { useState, useEffect } from 'react';
import { AppHeader } from '../cmps/app-header'
import { svgService } from '../services/svg.service'
import { trackService } from "../services/track.service";
import { setIsPlaying, setSongPlaying } from '../store/player.actions';
import { useSelector } from 'react-redux';

export function StationSearch() {
  const [newSearch, setNewSearch] = useState('')
  const [searchRes, setSearchRes] = useState([])

  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const songPlaying = useSelector(
    (storeState) => storeState.playerModule.songPlaying
  )

  const player = useSelector(
    (storeState) => storeState.playerModule.player)

  useEffect(() => {
    console.log(searchRes);
  }, [searchRes]);

  async function handleChange({ target }) {
    const value = target.value || ''
    setNewSearch((prevSearch) => ({ prevSearch, value }))

    try {
      const songs = await trackService.getVideos(value)
      setSearchRes(songs)
    } catch (error) {
      console.error(error)
    }
  }

  function onPlaySong(songId,songIdx){
    console.log('songIDDDDDDDDD',songId)
    if (songPlaying && songId === songPlaying.songId) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
      setIsPlaying(!isPlaying)
    } else {
      setSongPlaying({ songId, songIdx })
      setIsPlaying(true)
      player.playVideo()
    }
    console.log('songPlaying',songPlaying)
  }

  //ONCLICK ----> send to store player IS PLAYING
  //onclick -----> add to playlist


  return (
    <section>
      <h1>Hi from the Search component</h1>
      <div>
        {svgService.searchMagGlassIcon}
        <input
          className='station-search-input'
          onChange={handleChange}
          name="txt"
          id="txt"
          type="text"
          placeholder="What do you want to listen to?"
        />
      </div>
      <div>
        <ul>
          {searchRes.map((song,idx) => (
            <div className='search-result-song' key={song._id}>
              <div className='song-index'>
                {idx+1}
                </div>
              <div className='song-img-container' onClick={()=>onPlaySong(song._id,idx)}>
                <img src={song.img.url} alt="" />
              </div>
              <div className='song-title'>
                {song.title}
              </div>
              <div className='song-preview-actions'>
                {song._id}
              </div>



            </div>
          ))}
        </ul>
      </div>
    </section>
  )
}



