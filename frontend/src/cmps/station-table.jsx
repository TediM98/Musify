import { useSelector } from 'react-redux'

export function StationTalbe() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
}
