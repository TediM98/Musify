import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { svgService } from "../services/svg.service"
import { bgcService } from "../services/bgc.service"

export function HighLightsTable({ onPlayStation }) {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )
  const navigate = useNavigate()
  const [bgc, setBgc] = useState("rgb(223, 101, 223)")

  function changePrimaryClr(color = "gray") {
    let r = document.querySelector(":root")
    r.style.setProperty("--primary-color", color)
  }

  async function getBgc(imgUrl) {
    try {
      const color = await bgcService.getColorFromUrl(imgUrl)
      changePrimaryClr(color)
      setBgc(color)
    } catch (err) {
      console.error("Could not load color", err)
    }
  }

  async function getStation(stationId) {
    try {
      navigate(`/station/${stationId}`)
    } catch (error) {
      console.error("Error navigating to station:", error)
    }
  }

  return (
    <section className="section-highlights">
      {stations.slice(1, 7).map((station) => (
        <div
          className="table-data flex"
          key={station._id}
          onMouseEnter={() => getBgc(station.createdBy.imgUrl)}
        >
          <img src={station.createdBy.imgUrl} alt="" />
          <div
            className="station-name-table"
            onClick={() => getStation(station._id)}
          >
            <h4>{station.name}</h4>
          </div>
          <button
            onClick={() => onPlayStation(station._id)}
            className="btn-play-playlist"
          >
            {isPlaying
              ? svgService.playerPauseTrackIcon
              : svgService.playerPlayTrackIcon}
          </button>
        </div>
      ))}
    </section>
  )
}
