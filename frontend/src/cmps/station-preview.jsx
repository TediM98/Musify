import { Link } from "react-router-dom"
import { svgService } from "../services/svg.service"
import React from "react"
import { useSelector } from "react-redux"
import { trackService } from "../services/track.service"

export function StationPreview({ station, onPlayStation }) {
  const isPlaying = useSelector(
    (storeState) => storeState.playerModule.isPlaying
  )

  return (
    <section>
      <section className="station-card">
        <Link to={`/station/${station._id}`}>
          <div className="img-conatiner">
            <img src={station.createdBy.imgUrl} alt="" />
          </div>
          <h3>{station.name}</h3>
          <div className="content">
            {station.songs.length > 0 ? (
              <>
                <div title={station.songs[0].title}>
                  {trackService.getCleanTitle(station.songs[0].title)}
                </div>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </Link>
        <button
          className="btn-play-playlist"
          onClick={() => onPlayStation(station._id)}
        >
          {isPlaying
            ? svgService.playerPauseTrackIcon
            : svgService.playerPlayTrackIcon}
        </button>
      </section>
    </section>
  )
}
