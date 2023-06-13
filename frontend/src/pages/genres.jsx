import { useSelector } from 'react-redux'
import { StationPreview } from '../cmps/station-preview'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadStations } from '../store/station.actions'

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
      console.log('Could not load Genres', err)
    }
  }

  return (
    <section className="genre-stations">
      <div className="">
        {currGenreStations &&
          currGenreStations.map((station) => (
            <StationPreview station={station} />
          ))}
      </div>
    </section>
  )
}
