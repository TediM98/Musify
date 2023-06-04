import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStations } from '../store/station.actions.js'

// For local service
import { StationList } from '../cmps/station-list.jsx'
import { StationTalbe } from '../cmps/station-table.jsx'

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )

  useEffect(() => {
    loadStations()
  }, [])

  function getGreetings() {
    var myDate = new Date()
    var hrs = myDate.getHours()
    let greet

    if (hrs < 12) {
      greet = "Good Morning"
    } else if (hrs >= 12 && hrs <= 17) {
      greet = "Good Afternoon"
    } else if (hrs >= 17 && hrs <= 24) {
      greet = "Good Evening"
    }
    return greet
  }

  if (!stations) return <div>Loading...</div>
  return (
    <section className="main-layout home-page">
      <section className="station-table main-layout">
        <h3>{getGreetings()}</h3>
        <StationTalbe stations={stations} />
      </section>

      <h3>Your top mixes</h3>
      <StationList stations={stations} />
      <h3>More like Mac miller</h3>
      <StationList stations={stations} />
      <h3>Recently played</h3>
      <StationList stations={stations} />
    </section>
  )
}
