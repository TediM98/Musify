import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { stationService } from '../services/station.service.local'
import logo from '../assets/img/musify-logo.jpg'
import play from '../assets/img/play-station.svg'
import { bgcService } from '../services/bgc.service'
import { useSelector } from 'react-redux'
import { DropDownItem } from '../cmps/dropdown-item'
import { svgService } from '../services/svg.service'
import { setIsPlaying, setSongPlaying } from '../store/player.actions'
import {
  removeStation,
  setCurrStation,
  removeSong,
} from '../store/station.actions'

export function StationDetails() {
  // const [station, setStation] = useState(null)
  const [bgc, setBgc] = useState('black')
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

  useEffect(() => {
    if (stationId) loadStation().then(getBgc())
  }, [])

  // useEffect(() => {
  //   if (!songPlaying || songPlaying.length < 2) {
  //     console.log('currStation.songs[0].id', )
  //     console.log('songPlaying', songPlaying)
  //   }
  // }, [])

  function onRemoveSong(songId) {
    removeSong(songId, currStation)
    setIsOpen(false)
  }

  function toggleModal(buttonName) {
    setIsOpen(buttonName === isOpen ? null : buttonName)
  }

  async function getBgc() {
    try {
      const color = await bgcService.getColorFromUrl(
        currStation.createdBy.imgUrl
      )
      setBgc(color)
    } catch (err) {
      console.log('Could not load color', err)
    }
  }

  async function loadStation() {
    try {
      const station = await stationService.getById(stationId)
      // setCurrStation(station)
      setCurrStation(station)
      return currStation
    } catch (err) {
      console.error('Cannot load station', err)
      navigate('/')
    }
  }

  function onChangePlayerStatus() {
    // handlePlay()
    if (!songPlaying?.length < 2) setSongPlaying(currStation.songs[0]._id)
    if (player) {
      if (!isPlaying) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  function onChangeSongPlaying(songId) {
    setSongPlaying(songId)
    onChangePlayerStatus()
  }

  async function onRemoveStation(stationId) {
    try {
      await removeStation(stationId)
      navigate('/')
    } catch (err) {
      console.error('Could not remove station')
    }
  }

  if (!currStation) return <div>Loading...</div>
  return (
    <section className="details-layout-container">
      <div
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        className={`options-close ${isOpen ? 'active' : 'inactive'}`}
      ></div>
      <section className="details-container details-layout">
        <div
          className="station-details-container full"
        // style={{ backgroundColor: bgc }}
        >
          <div className="station-img">
            <img
              // crossOrigin="anonymous"
              className="img"
              src={currStation.createdBy.imgUrl}
              alt="station-img"
            ></img>
          </div>
          <div className="station-content flex">
            <span>Playlist</span>
            <h1>{currStation.name}</h1>
            <span className="station-desc">desc........</span>
            <div className="song-details-container">
              <div className="app-icon flex">
                <img src={logo} alt="icon"></img>
              </div>
              <span>Musify</span>
              <span className="song-detail">
                {currStation.likedByUsers.length} likes
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
            <button className="like-station-icon">
              {svgService.heartIcon}
            </button>
            <div className="options-container">
              <button
                onClick={() => toggleModal(stationId)}
                className="btn-options-close"
              >
                {svgService.optionsIcon}
              </button>
              <div className="dropdown-container">
                <div
                  className={`dropdown-menu ${isOpen === stationId ? 'active' : 'inactive'
                    }`}
                >
                  <ul className=" clean-list">
                    <DropDownItem
                      onRemoveStation={onRemoveStation}
                      stationId={stationId}
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
                  <li className="song-wrapper">
                    <span></span>
                    <div className="song-idx-container flex">
                      <span className="song-idx">{idx + 1}</span>
                    </div>
                    <div
                      className="handle-song-icon-container"
                      onClick={() => onChangeSongPlaying(song._id)}
                    >
                      {isPlaying
                        ? svgService.playerPauseTrackIcon
                        : svgService.playerPlayTrackIcon}
                    </div>
                    <div className="song-img-container">
                      <img
                        src={song.imgUrl}
                        alt="song-img"
                        className="song-img"
                      ></img>
                    </div>
                    <div className="song-title">
                      <span className="song-name">{song.title}</span>
                    </div>
                    <div className="song-created-at">
                      {new Date(song.addedAt).toLocaleDateString()}
                    </div>
                    <div className="list-options flex">
                      <button className="btn-like-song">
                        {svgService.heartIcon}
                      </button>
                      <div className="list-options-container">
                        <button
                          onClick={() => toggleModal(song._id)}
                          className="btn-list-options"
                        >
                          {svgService.optionsIcon}
                        </button>
                        <div className="dropdown-container">
                          <div
                            className={`dropdown-menu ${isOpen === song._id ? 'active' : 'inactive'
                              }`}
                          >
                            <ul className=" clean-list">
                              <DropDownItem
                                onRemoveSong={onRemoveSong}
                                songId={song._id}
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
        </section>
      </section>
    </section>
  )
}
