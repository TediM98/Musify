import React, { useState } from 'react'
import { svgService } from '../services/svg.service'
import { setIsPlaying, setSongPlaying } from '../store/player.actions'
import { useSelector } from 'react-redux'
import { GenreList } from '../cmps/genre-list'
import { trackService } from '../services/track.service'
import { stationService } from '../services/station.service'
import { updateStation } from '../store/station.actions'
import { useNavigate } from 'react-router-dom'

export function StationSearch() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(null)
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const currStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const [songPlayingOnList, setSongPlayingOnList] = useState(null)
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const songPlaying = useSelector(
    (storeState) => storeState.playerModule.songPlaying
  )
  const player = useSelector((storeState) => storeState.playerModule.player)
  const searchRes = useSelector(
    (storeState) => storeState.stationModule.searchRes
  )
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  function handleAddToPlaylistClick() {
    setShowPlaylistModal(true)
  }

  async function handlePlaylistSelect(reqId, song) {
    try {
      const stationToUpdate = await stationService.getById(reqId)
      addToStation(song, stationToUpdate)
    } catch (err) {
      console.error(err)
    }
    setShowPlaylistModal(false)
    navigate(`/station/${reqId}`)
  }

  function addToStation(track, stationToUpdate = currStation) {
    const updatedStation = { ...stationToUpdate }
    updatedStation.songs.push(track)
    updateStation(updatedStation)
  }

  function onPlaySong(songId = '', songIdx) {
    setSongPlayingOnList(songId)
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

  function handleToggleOptions() {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  function toggleOptions(songId, songIdx) {
    if (isOpen === songId) {
      setIsOpen(null)
    } else {
      setIsOpen(songId)
    }
  }

  return (
    <section>
      <div
        onClick={() => handleToggleOptions()}
        className={`options-close-search ${isOpen ? 'active' : 'inactive'}`}
      ></div>
      <div>
        {searchRes ? (
          <>
            {searchRes.length > 0 && (
              <div className="song-list-header flex">
                <div></div>
                <span className="list-song-idx">#</span>
                <div className="list-song-title">Title</div>
                <div></div>
                <small className="duration-icon">
                  {svgService.durationIcon}
                </small>
              </div>
            )}
            {searchRes.length === 0 && (
              <div className="no-search-results">
                Enter search terms to show results
              </div>
            )}
            <ul>
              {searchRes.map((song, idx) => (
                <li className="search-result-song" key={song._id}>
                  <div className="song-idx-container flex">
                    <span className="song-idx">{idx + 1}</span>
                    <div
                      className="handle-song-icon-container"
                      onClick={() => onPlaySong(song._id, idx)}
                    >
                      {isPlaying && songPlaying.songId === song._id
                        ? svgService.playerPauseTrackIcon
                        : svgService.playerPlayTrackIcon}
                    </div>
                  </div>
                  <div className="artist-details flex">
                    <div
                      className="song-img-container"
                      onClick={() => onPlaySong(song._id, idx)}
                    >
                      <img src={song.imgUrl} alt="" />
                    </div>
                    <div className="song-title ">
                      <span>{trackService.getCleanTitle(song.title)}</span>
                    </div>
                  </div>
                  <div className="song-duration flex">{song.duration}</div>
                  <div className="options-container">
                    <button
                      onClick={() => toggleOptions(song._id, idx)}
                      className="btn-options-close"
                    >
                      {svgService.optionsIcon}
                    </button>
                    <div className="search-song-options">
                      {isOpen === song._id && (
                        <div className="dropdown-container">
                          <div
                            className={`dropdown-menu ${
                              isOpen ? 'active' : 'inactive'
                            }`}
                          >
                            <ul className="clean-list">
                              <li className="dropdown-item">
                                {!song.title ? (
                                  <article>Delete playlist</article>
                                ) : (
                                  <article>Delete song</article>
                                )}
                              </li>
                              <li
                                className="dropdown-item clean-list"
                                onMouseEnter={handleAddToPlaylistClick}
                                onMouseLeave={() => setShowPlaylistModal(false)}
                              >
                                <article>Add to playlist</article>
                                {showPlaylistModal && (
                                  <div className="playlist-modal">
                                    <ul className="clean-list">
                                      {stations
                                        .filter(
                                          (station) =>
                                            station.createdBy?.owner ===
                                              'admin' &&
                                            station.name !== 'Liked Songs'
                                        )
                                        .map((station) => (
                                          <li
                                            key={station._id}
                                            onClick={() =>
                                              handlePlaylistSelect(
                                                station._id,
                                                song
                                              )
                                            }
                                          >
                                            {station.name}
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                )}
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
          </>
        ) : (
          <div>
            <GenreList />
          </div>
        )}
      </div>
    </section>
  )
}
