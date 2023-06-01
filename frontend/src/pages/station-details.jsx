import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { stationService } from '../services/station.service.local'
import logo from '../assets/img/musify-logo.jpg'

export function StationDetails() {
  const [station, setStation] = useState(null)
  // const { stationId } = useParams()
  const navigate = useNavigate()
  const stationId = '5cksxjas89xjsa8xjsa8jxs09'
  useEffect(() => {
    if (stationId.length > 1) {
      loadStation()
    }
  }, [stationId])

  async function loadStation() {
    try {
      const station = await stationService.getById(stationId)
      console.log(station)
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
    <section className="station-details-container">
      <div className="station-img">
        <img src={station.createdBy.imgUrl} alt="station-img"></img>
      </div>
      <div className="station-content flex">
        <h1>{station.name}</h1>
        <div className="song-details-container">
          <div className="app-icon">
            <img src={logo} alt="icon"></img>
          </div>
          <span className="song-detail">
            {station.likedByUsers.length} likes
          </span>
          <span className="song-detail">{station.songs.length} songs</span>
        </div>
      </div>
    </section>
  )
}
