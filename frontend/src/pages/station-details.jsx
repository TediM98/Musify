import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { stationService } from '../services/station.service.local'
import logo from '../assets/img/musify-logo.jpg'
import play from '../assets/img/play-station.svg'
import { bgcService } from '../services/bgc.service'
import { useSelector } from 'react-redux'
import { StationPlayer } from '../cmps/player'
import { DropDownItem } from '../cmps/dropdown-item'
import { svgService } from '../services/svg.service'

export function StationDetails() {
  const [station, setStation] = useState(null)
  const [bgc, setBgc] = useState('black')
  const [open, setOpen] = useState(null)
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const { stationId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (stationId) loadStation().then(getBgc())
  }, [stationId])

  function toggleModal(buttonName) {
    console.log('station.id', station.id)
    console.log('open', open)
    setOpen(buttonName === open ? null : buttonName)
  }

  async function getBgc() {
    try {
      const color = await bgcService.getColorFromUrl(station.createdBy.imgUrl)
      setBgc(color)
    } catch (err) {
      console.log('Could not load color', err)
    }
  }

  async function loadStation() {
    try {
      const station = await stationService.getById(stationId)
      setStation(station)
      return station
    } catch (err) {
      console.log('Had issues in station details', err)
      console.log('Cannot load station')
      navigate('/')
    }
  }
  function onChangePlayerStatus() {
    // handlePlay()
    console.log('Playing from details')
  }

  if (!station) return <div>Loading...</div>
  return (
    <section className="main-layout">
      <div
        onClick={() => {
          setOpen(!open)
        }}
        className={`options-close ${open ? 'active' : 'inactive'}`}
      ></div>
      <section className="details-container detail-layout">
        <div
          className="station-details-container full"
          style={{ backgroundColor: bgc }}
        >
          <div className="station-img">
            <img
              // crossOrigin="anonymous"
              className="img"
              src={station.createdBy.imgUrl}
              alt="station-img"
            ></img>
          </div>
          <div className="station-content flex">
            <span>Playlist</span>
            <h1>Daily Mix 1</h1>
            <span className="station-desc">desc........</span>
            <div className="song-details-container">
              <div className="app-icon flex">
                <img src={logo} alt="icon"></img>
              </div>
              <span>Musify</span>
              <span className="song-detail">
                {station.likedByUsers.length} likes
              </span>
              <span className="song-detail">{station.songs.length} songs</span>
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
                onClick={() => toggleModal(stationId)} // Pass the button name as an argument
                className="btn-options-close"
              >
                {svgService.optionsIcon}
              </button>
              <div className="dropdown-container">
                <div
                  className={`dropdown-menu ${
                    open === stationId ? 'active' : 'inactive'
                  }`}
                >
                  <ul className=" clean-list">
                    <DropDownItem />
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
            {station.songs.map((track) => {
              return (
                <div className="track-list-container">
                  <li className="track-wrapper">
                    <span></span>
                    <div className="track-idx">
                      <span>{station.songs.indexOf(track) + 1}</span>
                    </div>
                    <div className="track-img-container">
                      <img
                        src={track.imgUrl}
                        alt="track-img"
                        className="track-img"
                      ></img>
                    </div>
                    <div className="track-title">
                      <span className="track-name">{track.title}</span>
                    </div>
                    <div className="track-created-at">
                      {new Date(track.addedAt).toLocaleDateString()}
                    </div>
                    <div className="list-options flex">
                      <button className="btn-like-track">
                        {svgService.heartIcon}
                      </button>
                      <div className="list-options-container">
                        {/* <button
                          onClick={() => {
                            setOpen(!open)
                          }}
                          className={`btn-list-options ${
                            open ? 'active' : 'inactive'
                          }`}
                        >
                          {svgService.optionsIcon}
                        </button> */}
                        <button
                          onClick={() => toggleModal(track.id)} // Pass the button name as an argument
                          className="btn-list-options"
                        >
                          {svgService.optionsIcon}
                        </button>
                        <div className="dropdown-container">
                          <div
                            className={`dropdown-menu ${
                              open === track.id ? 'active' : 'inactive'
                            }`}
                          >
                            <ul className=" clean-list">
                              <DropDownItem />
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
