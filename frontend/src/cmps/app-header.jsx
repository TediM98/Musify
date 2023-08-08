import { svgService } from "../services/svg.service.js"
import { useLocation, useNavigate } from "react-router-dom"
import userImage from "../assets/img/user-image.jpg"
import { HeaderSearch } from "./header-search.jsx"

export function AppHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"

  function goToPreviousPage() {
    navigate(-1)
  }

  function goToNextPage() {
    navigate(1)
  }

  return (
    <header className="app-header content-layout ">
      <div className="flex ">
        <nav className="flex ">
          <button onClick={goToPreviousPage} className="btn-go-back">
            {svgService.btnGoBackHeader}
          </button>
          <button onClick={goToNextPage} className="btn-go-next">
            {svgService.btnGoNextHeader}
          </button>
          {isSearchPage && <HeaderSearch />}
        </nav>
        <section className="btn-login-signup-wrapper">
          <div className="user-image-container">
            <img src={userImage} title="user image" alt="user profile"/>
          </div>
        </section>
      </div>
    </header>
  )
}
