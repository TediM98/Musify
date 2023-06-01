import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  loadStations,
  addStation,
  updateStation,
  removeStation,
} from '../store/station.actions.js'
import { StationPlayer } from "../cmps/player.jsx";
// import { stationService } from '../services/station.service.js'
import { stationService } from '../services/station.service.local.js'

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

  return (
    <div className="main-layout">
      <h3>Hello from stat ion Index</h3>
      <StationPlayer />
    </div>
  )
}
