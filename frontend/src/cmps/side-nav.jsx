import { useNavigate } from 'react-router-dom'
import { SideNavLibrary } from './side-nav-library'
import { svgService } from '../services/svg.service'
import { addStation, removeStation } from '../store/station.actions'
import { stationService } from '../services/station.service.local'
import { UserStationPreview } from "./user-station-preview"
import { useSelector } from 'react-redux'

export function SideNav() {
  const navigate = useNavigate()
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  async function onAddStation() {
    const station = stationService.getEmptyStation()
    try {
      const addedStation = await addStation(station)
      navigate(`/station/${addedStation._id}`)
    } catch (err) {
      console.error('Cannot add station')
    }
  }

  return (
    <header className="main-nav">
      <nav className="parmanent-nav">
        <ul className="app-nav clean-list">
          <li>
            <a
              href="/"
              className="router-link 
            router-link-exact"
              aria-current="page"
            >
              {svgService.homeIcon}
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="/search"
              className="router-link
             router-link-exact"
              aria-current="page"
            >
              {svgService.searchHomePageIcon}
              <span>Search</span>
            </a>
          </li>
        </ul>
        <SideNavLibrary onAddStation={onAddStation} />
        <section className="user-station">
          {/* <div className=''>
            <button>
              <span>Playlist</span>
            </button>
            <button>
              <span>Artist</span>
            </button>
            <button>
              <span>Albums</span>
            </button>
          </div> */}

          {/* serach in playlist 
          {svgService.searchHomePageIcon}
          with input
          */}
          {
            stations.map(station =>
              <UserStationPreview station={station} key={station._id} />)}

        </section>
      </nav>
    </header>
  )
}
