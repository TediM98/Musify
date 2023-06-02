import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { stationService } from '../services/station.service.local'
import logo from '../assets/img/musify-logo.jpg'
import play from '../assets/img/play-station.svg'
import { bgcService } from '../services/bgc.service'

// import threedots from '../assets/img/3dots.svg'

export function StationDetails() {
  const [station, setStation] = useState(null)
  const { stationId } = useParams()
  const navigate = useNavigate()
  // const stationId = '5ckssad123jasdjklas123jask'
  const [bgc, setBgc] = useState('black')
  useEffect(() => {
    if (stationId) loadStation().then(getBgc())
  }, [stationId])

  // useEffect(() => {
  //   getBgc()
  // }, [stationId])

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

  if (!station) return <div>Loading...</div>
  return (
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
              <span onClick="onChange()">
                <img src={play} alt="play-button" className="play-icon"></img>
              </span>
            </button>
          </div>
          <button className="like-station-icon">
            <svg
              className="heart-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
          </button>

          <button className="btn-more-options">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              height="32"
              width="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="icon-options"
            >
              <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </svg>
          </button>
        </div>
      </section>
      <section className="song-list">
        <div className="song-list-header">
          <div></div>
          <span className="list-song-idx">#</span>
          <div className="list-song-title">Title</div>
          <div></div>
          <div className="list-song-date">Date Added</div>
          <small>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              class="Svg-sc-ytk21e-0 uPxdw"
            >
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" />
              <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z" />
            </svg>
          </small>
        </div>
      </section>
    </section>
  )
}
