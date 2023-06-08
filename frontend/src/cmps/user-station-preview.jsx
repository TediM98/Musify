import { useNavigate } from "react-router-dom"
import { svgService } from "../services/svg.service"

export const UserStationPreview = ({ station }) => {
  const navigate = useNavigate()

  async function navToStation(stationId) {
    try {
      navigate(`/station/${stationId}`)
    } catch (error) {
      console.error('Error navigating to station:', error)
    }
  }

  return (
    <li className="user-station-preview" onClick={() => navToStation(station._id)}>
      <img src={station.createdBy.imgUrl} alt={station.name} />
      <div className="station-info">
        <h3>{station.name}</h3>
        <span>playlist · User</span>
      </div>
      <div className="playlist-actions">
      </div>
    </li >
  )
}
