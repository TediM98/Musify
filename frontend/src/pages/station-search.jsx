import React, { useState, useEffect } from 'react';
import { AppHeader } from '../cmps/app-header'
import { svgService } from '../services/svg.service'
import { trackService } from "../services/track.service";
import { setIsPlaying, setSongPlaying } from '../store/player.actions';
import { useSelector } from 'react-redux';
import { setCurrStation } from '../store/station.actions';

export function StationSearch() {
  const [newSearch, setNewSearch] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const songPlaying = useSelector(
    (storeState) => storeState.playerModule.songPlaying
  )

  const player = useSelector(
    (storeState) => storeState.playerModule.player)

  const currStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  useEffect(() => {
    console.log(searchRes)
    console.log('currStation', currStation)
  }, [searchRes]);

  async function handleChange({ target }) {
    const value = target.value || ''
    setNewSearch((prevSearch) => ({ prevSearch, value }))

    try {
      const songs = await trackService.getVideos(value)
      // setCurrStation(songs)
      setSearchRes(songs)
    } catch (error) {
      console.error(error)
    }
  }

  function onPlaySong(songId, songIdx) {
    // console.log('songIDDDDDDDDD', songId)
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
    // console.log('songPlaying', songPlaying)
  }

  //ONCLICK ----> send to store player IS PLAYING
  function toggleOptions(buttonName) {
    console.log('modal check', buttonName)
    setIsOpen(buttonName === isOpen ? null : buttonName)
  }

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
        {(!searchRes.length) && <div>Loading...</div>}


        {searchRes && <ul>
          {searchRes.map((song, idx) => (


            (<div className='search-result-song' key={song._id}>
              <div className='song-index'>
                {idx + 1}
              </div>
              <div className='song-img-container' onClick={() => onPlaySong(song._id, idx)}>
                <img src={song.imgUrl} alt="" />
              </div>
              <div className='song-title'>
                {song.title}
              </div>
              {/* <div className='song-preview-actions'>
                  {song._id}
                </div> */}
                <div className='options-container'>
                <button
                onClick={toggleOptions}
                className="btn-options-close"
              >
                {svgService.optionsIcon}
              </button>
              <div className='search-song-options' onClick={() =>toggleOptions(song._id)}>

                </div>
              <div className="dropdown-container">
                <div
                  className={`dropdown-menu ${isOpen  ? 'active' : 'inactive' }`} >
                  <ul className=" clean-list">
                  <React.Fragment>
                  <li className="dropdown-item clean-list">
                    <article>Add to queue</article>
                  </li>
                  <li className="dropdown-item clean-list">
                    {!song.title ? (
                      <article >
                        Delete playlist
                      </article>
                    ) : (
                      <article >Delete song</article>
                    )}
                  </li>
                  <li className="dropdown-item clean-list">
                    <article>Add to playlist</article>
                  </li>
                </React.Fragment>
                  </ul>
                </div>
              </div>
                <button onClick={() => onPlaySong(song._id, idx)}>Play song</button>
                <button>add to playlist</button>
              </div>



            </div>)



          ))}
        </ul>}
      </div>
    </section>
  )
}



