import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStations } from '../store/station.actions.js'

// For local service
import { StationList } from '../cmps/station-list.jsx'
import { StationTalbe } from '../cmps/station-table.jsx'
import { utilService } from '../services/util.service.js'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  useEffect(() => {
    loadStations()
  }, [])

  function renderStationsByTag(tag) {
    return stations.filter(station => station.tags.includes(tag));
  }

  if (!stations) return <div>Loading...</div>
  return (
    <section className="main-layout home-page scrollable-container">
      <section className="station-table main-layout">
        <h3>{utilService.getGreetings()}</h3>
        <StationTalbe stations={stations} />
      </section>
      <section className='station-list-container'>
        <span>Your top mixes</span>
        <StationList stations={renderStationsByTag('Happy')} />
        <span>More like Mac miller</span>
        <StationList stations={renderStationsByTag('Rock')} />
        <span>Relaxing</span>
        <StationList stations={renderStationsByTag('Relaxing')} />
      </section>
    </section >
  )
}
