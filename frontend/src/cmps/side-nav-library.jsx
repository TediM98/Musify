import { Link } from 'react-router-dom'
import { svgService } from '../services/svg.service'

export function SideNavLibrary() {
  return (
    <section className="app-nav library">
      <Link to={`/station/library`}>
        {svgService.libraryIcon}
        <section className="">
          <span>Your Library</span>
          <button className="add-station-btn">{svgService.addSationBtn}</button>
        </section>
      </Link>
    </section>
  )
}
