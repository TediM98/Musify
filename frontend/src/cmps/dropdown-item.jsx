import React, { useState } from 'react'
import { stationService } from '../services/station.service'
import { setCurrStation } from '../store/station.actions'

export function DropDownItem({
  onRemoveStation,
  stationId,
  onRemoveSong,
  songId,
  stations,
  currStation,
  addToStation,
}) {
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  function handleAddToPlaylistClick() {
    setShowPlaylistModal(true)
  }

  async function handlePlaylistSelect(reqId) {
    try {
      const stationToUpdate = await stationService.getById(reqId)
      const [songToAdd] = currStation.songs.filter(
        (song) => song._id === songId
      )
      addToStation(songToAdd, stationToUpdate)
    } catch (err) {
      console.error(err)
    }
    setShowPlaylistModal(false)
  }

  return (
    <section className="dropdown_container">
      <li className="dropdown-item clean-list">
        {stationId ? (
          <article onClick={() => onRemoveStation(stationId)}>
            Delete playlist
          </article>
        ) : (
          <article onClick={() => onRemoveSong(songId)}>Delete song</article>
        )}
      </li>
      {!stationId && (
        <li
          className="dropdown-item clean-list"
          onMouseEnter={handleAddToPlaylistClick}
          onMouseLeave={() => setShowPlaylistModal(false)}
        >
          <article>Add to playlist</article>
          {showPlaylistModal && (
            <div className="playlist-modal">
              <ul className="clean-list">
                {stations
                  .filter(
                    (station) =>
                      station.createdBy?.owner === 'admin' &&
                      station.name !== 'Liked Songs'
                  )
                  .map((station) => (
                    <li
                      key={station._id}
                      onClick={() => handlePlaylistSelect(station._id)}
                    >
                      {station.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </li>
      )}
    </section>
  )
}
