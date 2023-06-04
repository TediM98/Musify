import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { SideNavLibrary } from './side-nav-library'
import { svgService } from '../services/svg.service'

export function SideNav() {
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
        <SideNavLibrary />
      </nav>
    </header >
  )
}
