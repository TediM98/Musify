import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'

export function SideNav() {
  return (
    <header className='main-nav'>
      <nav className="parmanent-nav">
        <ul className='app-nav clean-list'>
          <li>
            <a href="/" className='router-link-active router-link-exact-active' aria-current="page">

              <svg xmlns="http://www.w3.org/2000/svg" role="img" height="24" width="24" aria-hidden="true" className="Svg-sc-ytk21e-0 ldgdZj home-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z" /></svg>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/search" className='router-link-active router-link-exact-active' aria-current="page">

              <svg xmlns="http://www.w3.org/2000/svg" role="img" height="24" width="24" aria-hidden="true" className="Svg-sc-ytk21e-0 ldgdZj search-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" /></svg>
              <span>Search</span>
            </a>
          </li>
          {/* <li>
            <a href="#/collection" className='router-link-active router-link-exact-active' aria-current="page">

              <svg xmlns="http://www.w3.org/2000/svg" role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 ldgdZj"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" /></svg>
              <span>Your Library</span>
            </a>
          </li> */}
        </ul>
      </nav>
      <nav>

      </nav>
    </header >
  )
}
