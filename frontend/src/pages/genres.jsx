import { useSelector } from 'react-redux'
import { StationPreview } from '../cmps/station-preview'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadStations } from '../store/station.actions'

export function GenresCards({}) {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const [currGenreStations, setCurrGenreStations] = useState(null)
  const { stationGenre } = useParams()

  useEffect(() => {
    loadGenreStations()
  }, [stationGenre])

  async function loadGenreStations() {
    try {
      const stations = await loadStations()
      const genreStations = stations.filter((station) =>
        station.tags.includes(stationGenre)
      )
      setCurrGenreStations(genreStations)
    } catch (err) {
      console.log('Could not load Genres', err)
    }
  }

  function onCardClick() {}

  return (
    <section className="genre-stations">
      <div className=""></div>
    </section>
  )
}
