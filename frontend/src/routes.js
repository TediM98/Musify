import { Genres } from "./pages/genres.jsx"
import { Library } from "./pages/library.jsx"
import { StationDetails } from "./pages/station-details.jsx"
import { StationIndex } from "./pages/station-index.jsx"
import { StationSearch } from "./pages/station-search.jsx"

const routes = [
  {
    path: "/",
    component: <StationIndex />,
    label: "Home",
  },
  {
    path: "search",
    component: <StationSearch />,
    label: "Search",
  },
  {
    path: "station/:stationId",
    component: <StationDetails />,
    label: "Station",
  },
  {
    path: "search/:stationGenre",
    component: <Genres />,
    label: "Genre",
  },
  {
    path: "library",
    component: <Library />,
    label: "library",
  },
]

export default routes
