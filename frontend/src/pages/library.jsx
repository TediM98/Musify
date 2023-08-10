import { useSelector } from "react-redux"
import { UserStationPreview } from "../cmps/user-station-preview"
import { stationService } from "../services/station.service"
import { useNavigate } from "react-router-dom"
import { addStation } from "../store/station.actions"
import { SideNavLibrary } from "../cmps/side-nav-library"

export function Library() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const navigate = useNavigate()

  async function onAddStation() {
    const station = stationService.getEmptyStation()
    try {
      const addedStation = await addStation(station)
      navigate(`/station/${addedStation._id}`)
    } catch (err) {
      console.error("Cannot add station")
    }
  }
  
  function getLikedSongStation() {
    const [likedSongsStation] = stations.filter((station) => {
      return station.name === "Liked Songs"
    })
    return likedSongsStation
  }

  return (
    <section className="lib-container">
      <SideNavLibrary onAddStation={onAddStation} />
      <div className="lib-stations">
        {getLikedSongStation() && (
          <UserStationPreview station={getLikedSongStation()} />
        )}
        {stations
          .filter(
            (station) =>
              station.createdBy?.owner === "admin" &&
              station.name !== "Liked Songs"
          )
          .map((station) => (
            <UserStationPreview station={station} key={station._id} />
          ))}
      </div>
    </section>
  )
}
