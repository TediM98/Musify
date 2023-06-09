import React, { useEffect, useState } from 'react'
import { trackService } from "../services/track.service"
import { utilService } from '../services/util.service'
import { updateStation } from '../store/station.actions'
import { svgService } from '../services/svg.service'

// Mac miller,Beyonce,Shakira

export function AddSong({ station, onAddSong }) {

  const [searchTerm, setSearchTerm] = useState('')
  const [tracks, setTracks] = useState([])


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData()
    }, 450)
    return () => {
      clearTimeout(delayDebounceFn)
    }
  }, [searchTerm])

  async function fetchData() {
    if (!searchTerm) return
    try {
      const response = await trackService.getVideos(searchTerm, 10)
      setTracks(response)
    } catch (error) {
      console.error('Error fetching tracks:', error)
    }
  }

  function addToStation(track) {
    onAddSong(track)
  }

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
  }

  return <React.Fragment>
    <section className={`station-song-search flex ${station.songs.length === 0 ? 'no-border' : ''}`}>
      <div className='search-input'>
        <h1>Let's find something for your playlist</h1>
        {/* <label htmlFor="songName"></label> */}
        <input
          className='add-song-input'
          type="search"
          id="songName"
          placeholder='Search for songs or episodes'
          onChange={handleInputChange}
          value={searchTerm}
        />
        {svgService.searchHomePageIcon}
      </div>
      <div className='flex align-center'>
        <button className='close-songs-list'>
          {svgService.exitIcon}
        </button>
      </div>
    </section>
    <div className='station-search-list'>
      <ul className='clean-list'>
        {tracks.map((track, index) => (
          <li key={track._id} className='station-search-preview'>
            <div className='song-img-conatiner'>
              <div className='song-img'>
                <img src={track.imgUrl} alt={track.title} />
              </div>
              <div className='btn-play-pause'>
                {/* svg play pause */}
              </div>
            </div>
            <div className='song-title'>
              <span className='artist-name'>{track.title}</span>
            </div>
            <button className="btn-add-song" onClick={() => addToStation(track)}>Add</button>
          </li>
        ))}
      </ul>

    </div>
  </React.Fragment>
}
