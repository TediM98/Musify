import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
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
      console.log('variable')
    } catch (err) {
      console.error('Cannot add station@@@')
    }
  }

  // async function onRemoveStation(stationId) {
  //   try {
  //     await removeStation(stationId)
  //   } catch (err) {
  //     console.error('Could not remove station')
  //   }
  // }

  return (
    <header className='main-nav'>
      <nav className="parmanent-nav">
        <ul className='app-nav clean-list'>
          <li>
            <a href="/" className='router-link-active 
            router-link-exact-active'
              aria-current="page">
              {svgService.homeIcon}
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/search" className='router-link-active
             router-link-exact-active' aria-current="page">
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
