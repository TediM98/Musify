import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  loadStations,
  addStation,
  updateStation,
  removeStation,
} from '../store/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.js'

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
      showSuccessMsg('Station removed')
    } catch (err) {
      showErrorMsg('Cannot remove station')
    }
  }

  async function onAddStation() {
    const station = stationService.getEmptyStation()
    station.vendor = prompt('Vendor?')
    try {
      const savedStation = await addStation(station)
      showSuccessMsg(`Station added (id: ${savedStation._id})`)
    } catch (err) {
      showErrorMsg('Cannot add station')
    }
  }

  // function onAddStationMsg(station) {
  //   console.log(`TODO Adding msg to station`)
  // }

  return (
    <div>
      <h3>Hello from station Index</h3>
    </div>
  )
}
