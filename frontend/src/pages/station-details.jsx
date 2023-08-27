import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { stationService } from '../services/station.service'
import logo from '../assets/img/musify-logo.jpg'
import play from '../assets/img/play-station.svg'
import { bgcService } from '../services/bgc.service'
import { useDispatch, useSelector } from 'react-redux'
import { DropDownItem } from '../cmps/dropdown-item'
import { svgService } from '../services/svg.service'
import { setIsPlaying, setSongPlaying } from '../store/player.actions'
import { loaderService } from '../services/loader-service'
import {
  removeStation,
  setCurrStation,
  removeSong,
  updateStation,
  loadStations,
} from '../store/station.actions'
import { AddSong } from '../cmps/add-song'
import { Modal } from '../cmps/edit-modal' 
import {
  SOCKET_EVENT_UPDATE_STATION,
  socketService,
} from '../services/socket.service'
import { trackService } from '../services/track.service'

export function StationDetails() {
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [bgc, setBgc] = useState('rgb(223, 101, 223)')
  const [isOpen, setIsOpen] = useState(false)
  const currStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const songPlaying = useSelector(
    (storeState) => storeState.playerModule.songPlaying
  )
  const player = useSelector((storeState) => storeState.playerModule.player)
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const { stationId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const totalLikedSongs = currStation?.songs.filter(
    (song) => song.isLiked
  ).length

  getBgc()
  useEffect(() => {
    if (stationId) {
      loadStation()
    }
  }, [stationId])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_UPDATE_STATION, (station) => {
      setCurrStation(station)
    })
    return () => {
      socketService.off(SOCKET_EVENT_UPDATE_STATION, (station) => {
      })
    }
  }, [])

  async function saveModalData(inputValue, descValue) {
    toggleEditModal()
    try {
      const updatedStation = {
        ...currStation,
        name: inputValue,
        description: descValue,
      }

      dispatch(updateStation(updatedStation))
    } catch (err) {
      console.error('Error could not edit playlist name')
    }
  }

  function toggleEditModal() {
    setEditModalOpen(!isEditModalOpen)
  }

  function onRemoveSong(songId) {
    removeSong(songId, currStation)
    setIsOpen(false)
  }

  function toggleModal(buttonName) {
    setIsOpen(buttonName === isOpen ? null : buttonName)
  }

  function changePrimaryClr(color = 'gray') {
    let r = document.querySelector(':root')
    r.style.setProperty('--primary-color', color)
  }

  async function getBgc() {
    try {
      const color = await bgcService.getColorFromUrl(
        currStation.createdBy.imgUrl
      )
      changePrimaryClr(color)
      setBgc(color)
    } catch (err) {
      console.error('Could not load color', err)
    }
  }

  async function loadStation() {
    try {
      const station = await stationService.getById(stationId)
      setCurrStation(station)
      return currStation
    } catch (err) {
      console.error('Cannot load station', err)
      navigate('/')
    }
  }

  function addToStation(track, stationToUpdate = currStation) {
    const updatedStation = { ...stationToUpdate }
    updatedStation.songs.push(track)
    updateStation(updatedStation)
  }

  function onChangePlayerStatus() {
    if (!songPlaying) onChangeSongPlaying(currStation.songs[0]._id, 0)
    if (!isPlaying) {
      player.playVideo()
      setIsPlaying(true)
    } else {
      player.pauseVideo()
      setIsPlaying(false)
    }
  }

  function onChangeSongPlaying(songId = '', songIdx) {
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
    }
  }

  async function onRemoveStation(stationId) {
    try {
      await removeStation(stationId)
      navigate('/')
    } catch (err) {
      console.error('Could not remove station')
    }
  }

  async function onLikeSong(likedSong) {
    const updatedSongs = currStation.songs.map((song) =>
      song._id === likedSong._id ? { ...song, isLiked: !song.isLiked } : song
    )
    const updatedStation = { ...currStation, songs: updatedSongs }
    await updateStation(updatedStation)
    const likedSongsStation = stations.find(
      (station) => station.name === 'Liked Songs'
    )
    if (!likedSong.isLiked) {
      await stationService.addToLikedSongsStation(likedSong, likedSongsStation)
    } else {
      await stationService.removeFromLikedSongsStation(
        likedSong,
        likedSongsStation
      )
    }
    loadStations()
  }

  if (!currStation) return loaderService.threeDots
  return (
    <section className="details-layout-container">
      <div
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className={`options-close ${isOpen ? 'active' : 'inactive'}`}
      ></div>
      <section className="details-container details-layout">
        <div className="station-details-container full">
          <div className="station-img">
            <img
              className="img"
              src={currStation?.createdBy?.imgUrl}
              alt="station-img"
              onClick={toggleEditModal}
            ></img>
          </div>

          {isEditModalOpen && (
            <Modal
              currStation={currStation}
              saveModalData={saveModalData}
              closeModal={toggleEditModal}
            />
          )}

          <div className="station-content flex">
            <span>Playlist</span>
            <h1>{currStation.name}</h1>
            <span className="station-desc">{currStation.description}</span>
            <div className="song-details-container">
              <div className="app-icon flex">
                <img src={logo} alt="icon"></img>
              </div>
              <span>Musify</span>
              <span className="song-detail">
                {totalLikedSongs === 0
                  ? '0 likes'
                  : `${totalLikedSongs} ${
                      totalLikedSongs === 1 ? 'like' : 'likes'
                    }`}
              </span>
              <span className="song-detail">
                {currStation.songs.length} songs
              </span>
            </div>
          </div>
        </div>

        <section className="station-actions flex">
          <div className="action-container flex">
            <div className="btn-play-container">
              <button className="btn-play">
                <span onClick={onChangePlayerStatus}>
                  {!isPlaying ? (
                    <img
                      src={play}
                      alt="play-button"
                      className="play-icon"
                    ></img>
                  ) : (
                    svgService.pauseIcon
                  )}
                </span>
              </button>
            </div>
            <div className="options-container">
              <button
                onClick={() => toggleModal(stationId)}
                className="btn-options-close"
              >
                {svgService.optionsIcon}
              </button>

              <div className="dropdown-container">
                <div
                  className={`dropdown-menu ${
                    isOpen === stationId ? 'active' : 'inactive'
                  }`}
                >
                  <ul className=" clean-list">
                    <DropDownItem
                      onRemoveStation={onRemoveStation}
                      stationId={stationId}
                      stations={stations}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="song-list">
          <div className="song-list-header flex">
            <div></div>
            <span className="list-song-idx">#</span>
            <div className="list-song-title">Title</div>
            <div></div>
            <div className="list-song-date">Date Added</div>
            <small>{svgService.durationIcon}</small>
          </div>
          <ul className="clean-list">
            {currStation.songs.map((song, idx) => {
              return (
                <div className="song-list-container" key={song._id}>
                  <li
                    className={`song-wrapper ${
                      isOpen === song._id ? 'active' : 'inactive'
                    }`}
                  >
                    <div></div>
                    <div className="song-idx-container flex">
                      <span className="song-idx">{idx + 1}</span>
                    </div>
                    <div
                      className="handle-song-icon-container"
                      onClick={() => onChangeSongPlaying(song._id, idx)}
                    >
                      {songPlaying?.songId === song._id && isPlaying
                        ? svgService.playerPauseTrackIcon
                        : svgService.playerPlayTrackIcon}
                    </div>
                    <div className="artist-details flex">
                      <div className="song-img-container">
                        <img
                          onClick={() => onChangeSongPlaying(song._id, idx)}
                          src={song.imgUrl}
                          alt="song-img"
                          className="song-img"
                        ></img>
                      </div>
                      <div className="song-title">
                        <span
                          onClick={() => onChangeSongPlaying(song._id, idx)}
                          className={`song-name ${
                            songPlaying?.songId === song._id
                              ? 'active'
                              : 'inactive'
                          }`}
                        >
                          {trackService.getCleanTitle(song.title)}
                        </span>
                      </div>
                    </div>
                    <div className="song-created-at">
                      {new Date(song.addedAt).toLocaleDateString()}
                    </div>
                    <div className="list-options flex">
                      <button
                        className="btn-like-song"
                        onClick={() => onLikeSong(song)}
                      >
                        {song.isLiked
                          ? svgService.likedSongIcon
                          : svgService.heartIcon}
                      </button>
                      <div className="song-duration">{song.duration}</div>

                      <div className="list-options-container">
                        <button
                          onClick={() => toggleModal(song._id)}
                          className="btn-list-options"
                        >
                          {svgService.optionsIcon}
                        </button>

                        <div className="dropdown-container">
                          <div
                            className={`dropdown-menu ${
                              isOpen === song._id
                                ? 'active ' + 'list-options'
                                : 'inactive'
                            }`}
                          >
                            <ul className=" clean-list">
                              <DropDownItem
                                onRemoveSong={onRemoveSong}
                                songId={song._id}
                                stations={stations}
                                currStation={currStation}
                                addToStation={addToStation}
                              />
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              )
            })}
          </ul>
          <AddSong station={currStation} onAddSong={addToStation} />
        </section>
      </section>
    </section>
  )
}
