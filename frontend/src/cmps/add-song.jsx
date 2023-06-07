import React, { useState } from 'react'
import { trackService } from "../services/track.service"

export function AddSong({ stationId }) {
  const [songName, setSongName] = useState('')
  const [songs, setSongs] = useState([
    { name: 'Song 1', artist: 'Artist 1', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 2', artist: 'Artist 2', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 3', artist: 'Artist 3', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 4', artist: 'Artist 4', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 5', artist: 'Artist 5', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 6', artist: 'Artist 6', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 7', artist: 'Artist 7', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 8', artist: 'Artist 8', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 9', artist: 'Artist 9', image: 'https://via.placeholder.com/40x40.png?text=No+Image' },
    { name: 'Song 10', artist: 'Artist 10', image: 'https://via.placeholder.com/40x40.png?text=No+Image' }
  ]);


  const handleSongNameChange = (event) => {
    setSongName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(songName)
    // setSongName('')
    // setArtist('')
  }
  // trackService.getVideos('metallica',10)

  return (
    <section className="add-song-container">
      <h3>Let's find something for your playlist</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="songName">
          </label>
          <input
            className='add-song-input'
            type="text"
            id="songName"
            placeholder='Search for songs or episodes'
            value={songName}
            onChange={handleSongNameChange}
          />
        </div>
      </form>
      <ul className='clean-list'>
        {songs.map((song, index) => (
          <li key={index}>
            <div>
              <img src={song.image} alt={song.name} />
            </div>
            <div>
              <span>{song.name}</span>
              <span>{song.artist}</span>
            </div>
            {/* <button onClick={() => addToPlaylist(index)}>Add to Playlist</button> */}
          </li>
        ))}
      </ul>


    </section>
  )
}
