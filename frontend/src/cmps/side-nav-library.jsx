import { Link } from "react-router-dom"
import { svgService } from "../services/svg.service"

export function SideNavLibrary({ onAddStation }) {

  return (
    <section className="app-nav library">
      <li className="flex library-add-station-btn">
        <Link to={`/station/library`}>
          {svgService.libraryIcon}
          <span>Your Library</span>
        </Link>
        <button title="Add station" onClick={onAddStation} className="add-station-btn">
          {svgService.addSationBtn}
        </button>

      </li>
    </section >
  )
}