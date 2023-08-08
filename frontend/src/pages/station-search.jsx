import React, { useState } from "react"
import { svgService } from "../services/svg.service"
import { setIsPlaying, setSongPlaying } from "../store/player.actions"
import { useSelector } from "react-redux"
import { GenreList } from "../cmps/genre-list"

export function StationSearch() {
  const [isOpen, setIsOpen] = useState(null)
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

  function onPlaySong(songId = "", songIdx) {
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

  console.log(searchRes)
  return (
    <section>
      <div
        onClick={() => handleToggleOptions()}
        className={`options-close-search ${isOpen ? "active" : "inactive"}`}
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
                    <div className="song-title ">{song.title}</div>
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
                              isOpen ? "active" : "inactive"
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
