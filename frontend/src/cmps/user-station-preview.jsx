import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const UserStationPreview = ({ station }) => {
  const navigate = useNavigate()
  const [songsLength, setSongsLength] = useState(station.songs.length)

  useEffect(() => {
    setSongsLength(station.songs.length)
  }, [station.songs.length])

  async function navToStation(stationId) {
    try {
      navigate(`/station/${stationId}`)
    } catch (error) {
      console.error('Error navigating to station:', error)
    }
  }

  return (
    <li
      className="user-station-preview"
      onClick={() => navToStation(station._id)}
    >
      <img src={station.createdBy.imgUrl} alt={station.name} />
      <div className="station-info">
        <h3>{station.name}</h3>
        <span>{songsLength} songs</span>
      </div>
      <div className="playlist-actions"></div>
    </li>
  )
}
