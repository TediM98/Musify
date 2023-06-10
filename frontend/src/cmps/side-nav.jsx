import { useNavigate } from 'react-router-dom'
import { SideNavLibrary } from './side-nav-library'
import { svgService } from '../services/svg.service'
import { addStation, removeStation } from '../store/station.actions'
import { stationService } from '../services/station.service.local'
import { UserStationPreview } from "./user-station-preview"
import { useSelector } from 'react-redux'
import { useState } from 'react'

export function SideNav() {
  const navigate = useNavigate()
  const [activeIcon, setActiveIcon] = useState('home');
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

  function changeIcon(icon) {
    setActiveIcon(icon);
  }
  return (
    <header className="main-nav">
      <nav className="parmanent-nav">
        <ul className="app-nav clean-list">
          <li>
            <a
              href="/"
              className={`home ${activeIcon === 'home' ? 'active' : ''}`}
              aria-current="page"
            >
              {svgService.homeIcon}
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="/search"
              className={`router-link ${activeIcon === 'search' ? 'active' : ''}`}
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
          {stations
            .filter(station => station.createdBy.owner === 'tedi')
            .map(station => <UserStationPreview station={station} key=
              {station._id} />)
          }

        </section>
      </nav>
    </header>
  )
}
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { SideNavLibrary } from './side-nav-library'
// import { svgService } from '../services/svg.service'
// import { addStation, removeStation } from '../store/station.actions'
// import { stationService } from '../services/station.service.local'
// import { UserStationPreview } from "./user-station-preview"
// import { useSelector } from 'react-redux'

// export function SideNav() {
//   const navigate = useNavigate()
//   const stations = useSelector((storeState) => storeState.stationModule.stations)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortOption, setSortOption] = useState('')

//   async function onAddStation() {
//     const station = stationService.getEmptyStation()
//     try {
//       const addedStation = await addStation(station)
//       navigate(`/station/${addedStation._id}`)
//     } catch (err) {
//       console.error('Cannot add station')
//     }
//   }

//   function handleSearchInputChange(event) {
//     setSearchQuery(event.target.value)
//   }

//   function handleSortOptionChange(event) {
//     setSortOption(event.target.value)
//   }

//   function filterStations(stations) {
//     if (searchQuery) {
//       // Filter stations based on search query
//       const searchResult = stations.filter(station =>
//         station.createdBy && station.createdBy.title &&
//         station.createdBy.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       return searchResult
//     }

//     return stations
//   }

//   function sortStations(stations) {
//     if (sortOption === 'recents') {
//       // Sort stations by recent
//       return stations.sort((a, b) => b.createdAt - a.createdAt)
//     } else if (sortOption === 'alphabetical') {
//       // Sort stations alphabetically by title
//       return stations.sort((a, b) => {
//         if (a.createdBy && a.createdBy.title && b.createdBy && b.createdBy.title) {
//           return a.createdBy.title.localeCompare(b.createdBy.title)
//         }
//         return 0
//       })
//     }

//     return stations
//   }

//   const filteredAndSortedStations = sortStations(filterStations(stations))

//   return (
//     <header className="main-nav">
//       <nav className="parmanent-nav">
//         <ul className="app-nav clean-list">
//           <li>
//             <a
//               href="/"
//               className="router-link
//             router-link-exact"
//               aria-current="page"
//             >
//               {svgService.homeIcon}
//               <span>Home</span>
//             </a>
//           </li>
//           <li>
//             <a
//               href="/search"
//               className="router-link
//              router-link-exact"
//               aria-current="page"
//             >
//               {svgService.searchHomePageIcon}
//               <span>Search</span>
//             </a>
//           </li>
//         </ul>
//         <SideNavLibrary onAddStation={onAddStation} />
//         <section className="user-station">
//           <div className="search-bar">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchInputChange}
//               placeholder="Search playlist..."
//             />
//           </div>
//           <div className="sort-dropdown">
//             <label htmlFor="sort">Sort by:</label>
//             <select id="sort" value={sortOption} onChange={handleSortOptionChange}>
//               <option value="">None</option>
//               <option value="recents">Recents</option>
//               <option value="alphabetical">Alphabetical</option>
//             </select>
//           </div>
//           {
//             filteredAndSortedStations.map(station =>
//               <UserStationPreview station={station} key={station._id} />)
//           }
//         </section>
//       </nav>
//     </header>
//   )
// }
