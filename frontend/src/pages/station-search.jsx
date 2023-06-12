import React, { useState, useEffect } from 'react'
import { AppHeader } from '../cmps/app-header'
import { svgService } from '../services/svg.service'
import { trackService } from "../services/track.service"
import { setIsPlaying, setSongPlaying } from '../store/player.actions'
import { useSelector } from 'react-redux'
import { setCurrStation } from '../store/station.actions'
import { utilService } from "../services/util.service"
import { GenresCards } from '../cmps/genres';

export function StationSearch() {
  const [newSearch, setNewSearch] = useState('')
  const [searchRes, setSearchRes] = useState([])
  const [isOpen, setIsOpen] = useState(null)
  const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying)
  const songPlaying = useSelector((storeState) => storeState.playerModule.songPlaying)
  const player = useSelector((storeState) => storeState.playerModule.player)
  const currStation = useSelector((storeState) => storeState.stationModule.currStation)

  useEffect(() => {
    const delayedSearch = utilService.debounce(async () => {
      const { value } = newSearch
      try {
        const songs = await trackService.getVideos(value)
        setSearchRes(songs)
      } catch (error) {
        console.error(error)
      }
    }, 7500)

    delayedSearch()

    return () => {
      clearTimeout(delayedSearch)
    }
  }, [newSearch])

  function handleChange({ target }) {
    const value = target.value || ''
    setNewSearch((prevSearch) => ({ ...prevSearch, value }))
  }

  function onPlaySong(songId, songIdx) {
    console.log('in the playsong function', songId, songIdx)
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
  }

  function toggleOptions(songId, songIdx) {
    if (isOpen === songId) {
      setIsOpen(null) // Close the dropdown if it's already open
    } else {
      setIsOpen(songId) // Open the dropdown for the clicked song
    }
  }
  console.log(searchRes)
  return (
    <section>
      <div
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className={`options-close-search ${isOpen ? 'active' : 'inactive'}`}
      >

      </div>
      <div className='search-bar-searchComp-container'>
        <div className='search-icon-magGlass'>
          {svgService.searchMagGlassIcon}
        </div>

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
        <div className="song-list-header flex">
          <div></div>
          <span className="list-song-idx">#</span>
          <div className="list-song-title">Title</div>
          <div></div>
          <small className='duration-icon'>{svgService.durationIcon}</small>
        </div>
        {/* <div className='.search-card-category'>

</div> */}
{/* <div><GenresCards /></div> */}
       
{!searchRes.length && <div ><GenresCards /></div>}
        {searchRes && (
          <ul>
        



            {/* {!searchRes.length && <div className='no-search-results'>Enter search terms to show results</div>} */}
            {searchRes.map((song, idx) => (
              <li className='search-result-song' key={song._id}>
                <div className='song-index'>{idx + 1}</div>
                <div
                  className="handle-song-icon-container"
                  onClick={() => onPlaySong(song._id, idx)}
                >
                  {isPlaying ? svgService.playerPauseTrackIcon : svgService.playerPlayTrackIcon}
                </div>
                <div className='song-img-container' onClick={() => onPlaySong(song._id, idx)}>
                  <img src={song.imgUrl} alt="" />
                </div>
                <div className='song-title'>{song.title}</div>
                <div>{song.duration}</div>
                <div className='options-container'>
                  <button onClick={() => toggleOptions(song._id, idx)} className="btn-options-close">
                    {svgService.optionsIcon}
                  </button>
                  <div className='search-song-options'>
                    {isOpen === song._id && (
                      <div className="dropdown-container">
                        <div className={`dropdown-menu ${isOpen ? 'active' : 'inactive'}`}>
                          <ul className="clean-list">
                            <li>
                              <article className="dropdown-item play-song" onClick={() => onPlaySong(song._id, 0)}>Play song</article>
                            </li>
                            <li className="dropdown-item">
                              <article>Add to queue</article>
                            </li>
                            <li className="dropdown-item">
                              {!song.title ? (
                                <article>Delete playlist</article>
                              ) : (
                                <article>Delete song</article>
                              )}
                            </li>
                            <li className="dropdown-item">
                              <article>Add to playlist</article>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
