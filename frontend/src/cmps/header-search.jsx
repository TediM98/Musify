import { useEffect, useState } from "react"
import { svgService } from "../services/svg.service"
import { utilService } from "../services/util.service"
import { trackService } from "../services/track.service"
import { useSelector } from "react-redux"
import { setSearchRes } from "../store/station.actions"

export function HeaderSearch() {
  const [newSearch, setNewSearch] = useState("")
  const [showSongList, setShowSongList] = useState(false)
  const searchRes = useSelector(
    (storeState) => storeState.stationModule.searchRes
  )

  useEffect(() => {
    const delayedSearch = utilService.debounce(async () => {
      if (!newSearch) {
        setSearchRes("")
        return
      }

      try {
        const songs = await trackService.getVideos(newSearch)
        setSearchRes(songs)
      } catch (error) {
        console.error(error)
      }
    }, 450)
    
    delayedSearch()
    return () => {
      clearTimeout(delayedSearch)
    }
  }, [newSearch])

  function handleChange({ target }) {
    const value = target.value || ""
    setNewSearch(value)
    setShowSongList(!!value)
  }

  return (
    <section>
      <div className="search-bar-searchComp-container">
        <div className="search-icon-magGlass">
          {svgService.searchMagGlassIcon}
        </div>

        <input
          className="station-search-input flex"
          onChange={handleChange}
          name="txt"
          id="txt"
          type="text"
          placeholder="What do you want to listen to?"
        />
      </div>
    </section>
  )
}
