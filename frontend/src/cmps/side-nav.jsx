import { useLocation, useNavigate } from "react-router-dom"
import { SideNavLibrary } from "./side-nav-library"
import { svgService } from "../services/svg.service"
import { addStation, loadStations } from "../store/station.actions"
import { stationService } from "../services/station.service"
import { UserStationPreview } from "./user-station-preview"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

export function SideNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const [activePage, setActivePage] = useState(getActivePage(location.pathname))

  useEffect(() => {
    setActivePage(getActivePage(location.pathname))
    loadStations()
  }, [location])

  function getActivePage(pathname) {
    if (pathname === "/") {
      return { page: "home", icon: svgService.activeHome }
    } else if (pathname === "/search") {
      return { page: "search", icon: svgService.activeSearch }
    } else if (pathname === "/library") {
      return { page: "library", icon: svgService.activeLibrary }
    }
    return { page: "home", icon: svgService.homeIcon }
  }
  function getLikedSongStation() {
    const [likedSongsStation] = stations.filter((station) => {
      return station.name === "Liked Songs"
    })
    return likedSongsStation
  }

  async function onAddStation() {
    const station = stationService.getEmptyStation()
    try {
      const addedStation = await addStation(station)
      navigate(`/station/${addedStation._id}`)
    } catch (err) {
      console.error("Cannot add station")
    }
  }
  getLikedSongStation()
  return (
    <header className="main-nav">
      <nav className="parmanent-nav">
        <ul className="app-nav clean-list">
          <li
            onClick={() =>
              setActivePage({ page: "home", icon: svgService.activeHome })
            }
          >
            <a
              href="/"
              className={`home ${activePage.page === "home" ? "active" : ""}`}
              aria-current="page"
            >
              {activePage.page === "home"
                ? activePage.icon
                : svgService.homeIcon}
              <span
                className={`home ${activePage.page === "home" ? "active" : ""}`}
              >
                Home
              </span>
            </a>
          </li>
          <li
            onClick={() =>
              setActivePage({ page: "search", icon: svgService.activeSearch })
            }
          >
            <a
              href="/search"
              className={`search ${
                activePage.page === "search" ? "active" : ""
              }`}
              aria-current="page"
            >
              {activePage.page === "search"
                ? activePage.icon
                : svgService.searchHomePageIcon}
              <span>Search</span>
            </a>
          </li>
          <li onClick={() => setActivePage({ page: "library" })}>
            <a
              href="library"
              className={`library ${
                activePage.page === "library" ? "active" : ""
              }`}
            >
              {svgService.libraryIcon}
              <span>Your Library</span>
            </a>
          </li>
        </ul>
        <section
          className="user-station"
          onClick={() =>
            setActivePage({ page: "library", icon: svgService.libraryIcon })
          }
        >
          <SideNavLibrary onAddStation={onAddStation} />
          {getLikedSongStation() && (
            <UserStationPreview station={getLikedSongStation()} />
          )}
          {stations
            .filter(
              (station) =>
                station.createdBy?.owner === "admin" &&
                station.name !== "Liked Songs"
            )
            .map((station) => (
              <UserStationPreview station={station} key={station._id} />
            ))}
        </section>
      </nav>
    </header>
  )
}
