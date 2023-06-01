import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  loadStations,
  addStation,
  updateStation,
  removeStation,
} from '../store/station.actions.js'

// import { stationService } from '../services/station.service.js'

// For local service
import { stationService } from '../services/station.service.local.js'
import { StationList } from '../cmps/station-list.jsx'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  useEffect(() => {
    loadStations()
  }, [])

  async function onRemoveStation(stationId) {
    try {
      await removeStation(stationId)
    } catch (err) {
      console.log('Could not remove station')
    }
  }

  // async function onAddStation() {
  //   const station = stationService.getEmptyStation()
  //   station.vendor = prompt('Vendor?')
  //   try {
  //     const savedStation = await addStation(station)
  //   } catch (err) {
  //     console.log('Cannot add station')
  //   }
  // }

  // function onAddStationMsg(station) {
  //   console.log(`TODO Adding msg to station`)
  // }

  if (!stations) return <div>Loading...</div>
  return (
    <div className='main-layout home-page'>
      <h3>Good afterNoon</h3>

      <h3>Your top mixes</h3>
      <StationList
        stations={stations}
      />
      <h3>More like Mac miller</h3>
      <StationList
        stations={stations}
      />
      <h3>Recently played</h3>
      <StationList
        stations={stations}
      />
    </div>
  )
}
