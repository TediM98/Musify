import { useEffect } from "react"
import { useSelector } from "react-redux"
import { loadStations, setCurrStation } from "../store/station.actions.js"
import { StationList } from "../cmps/station-list.jsx"
import { HighLightsTable } from "../cmps/station-table.jsx"
import { utilService } from "../services/util.service.js"
import { setIsPlaying, setSongPlaying } from "../store/player.actions.js"
import { stationService } from "../services/station.service.js"
import { loaderService } from "../services/loader-service.js"

export function StationIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const player = useSelector((storeState) => storeState.playerModule.player)
  const songPlaying = useSelector(
    (storeState) => storeState.playerModule.songPlaying
  )
  const currStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  useEffect(() => {
    loadStations()
  }, [])

  function renderStationsByTag(tag) {
    return stations.filter((station) => station.tags.includes(tag))
  }

  function playSong(reqStation) {
    if (songPlaying && currStation._id !== reqStation._id) {
      setSongPlaying({ songId: reqStation.songs[0]._id, songIdx: 0 })
    } else if (!songPlaying) {
      setSongPlaying({ songId: reqStation.songs[0]._id, songIdx: 0 })
    }

    if (!isPlaying) {
      player.playVideo()
      setIsPlaying(true)
    } else {
      player.pauseVideo()
      setIsPlaying(false)
    }
  }

  async function onPlayStation(currStationId) {
    try {
      const reqStation = await stationService.getById(currStationId)
      setCurrStation(reqStation)
      playSong(reqStation)
    } catch (err) {
      console.log("cannot find currstation", err)
    }
  }

  if (!stations) return loaderService.threeDots
  return (
    <section className="main-layout home-page scrollable-container">
      <section className="station-table main-layout">
        <h3 className="greeting">{utilService.getGreetings()}</h3>
        <HighLightsTable stations={stations} onPlayStation={onPlayStation} />
      </section>
      <section className="station-list-container">
        <span>Rock</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("rock")}
        />
        <span>Pop</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("pop")}
        />
        <span>Relaxing</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("relaxing")}
        />
        <span>Hip-Hop</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("Hip-Hop")}
        />
        <span>Country</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("country")}
        />
        <span>Jazz</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("jazz")}
        />
        <span>Classical</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("classical")}
        />
        <span>Electronic</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("electronic")}
        />
        <span>R&B</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("R&B")}
        />
        <span>Metal</span>
        <StationList
          onPlayStation={onPlayStation}
          stations={renderStationsByTag("metal")}
        />
      </section>
    </section>
  )
}
