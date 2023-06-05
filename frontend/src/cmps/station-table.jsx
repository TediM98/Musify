import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { svgService } from '../services/svg.service'

export function StationTalbe() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const navigate = useNavigate()

  async function getStation(stationId) {
    try {
      navigate(`/station/${stationId}`)
    } catch (error) {
      console.error('Error navigating to station:', error)
    }
  }

  return (
    <section className="section-highlights">
      {stations.map((station) => (
        <div className="table-data flex" key={station._id}>
          <img src={station.createdBy.imgUrl} alt="" />
          <div
            className="station-name-table"
            onClick={() => getStation(station._id)}
          >
            <h4>{station.name}</h4>
            <button className='btn-play-playlist'>
              {svgService.palyerBtnPreview}
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}
