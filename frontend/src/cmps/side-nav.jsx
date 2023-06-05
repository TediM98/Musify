import { useNavigate } from 'react-router-dom'
import { SideNavLibrary } from './side-nav-library'
import { svgService } from '../services/svg.service'
import { addStation, removeStation } from "../store/station.actions"
import { stationService } from "../services/station.service.local"

export function SideNav() {
  const navigate = useNavigate()

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
    <header className='main-nav'>
      <nav className="parmanent-nav">
        <ul className='app-nav clean-list'>
          <li>
            <a href="/" className='router-link 
            router-link-exact'
              aria-current="page">
              {svgService.homeIcon}
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/search" className='router-link
             router-link-exact' aria-current="page">
              {svgService.searchHomePageIcon}
              <span>Search</span>
            </a>
          </li>
        </ul>
        <SideNavLibrary
          onAddStation={onAddStation}
        />
      </nav>
    </header >
  )
}
