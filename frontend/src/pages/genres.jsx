import { useSelector } from "react-redux"
import { StationPreview } from "../cmps/station-preview"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadStations } from "../store/station.actions"

export function Genres() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const [currGenreStations, setCurrGenreStations] = useState(null)
  const { stationGenre } = useParams()

  useEffect(() => {
    loadStations()
  }, [])

  useEffect(() => {
    loadGenreStations()
  }, [stations])

  async function loadGenreStations() {
    try {
      const genreStations = stations.filter((station) =>
        station.tags.includes(stationGenre)
      )
      setCurrGenreStations(genreStations)
    } catch (err) {
      console.log("Could not load Genres", err)
    }
  }
  
  const capitalizedGenre =
    stationGenre.charAt(0).toUpperCase() + stationGenre.slice(1)

  return (
    <section className="genre-stations">
      <h1>{capitalizedGenre}</h1>

      <div className="genre-stations-list">
        {currGenreStations && currGenreStations.length === 0 ? (
          <h2 className="no-playlist">No playlist available right now</h2>
        ) : (
          currGenreStations &&
          currGenreStations.map((station) => (
            <StationPreview key={station.id} station={station} />
          ))
        )}
      </div>
    </section>
  )
}
