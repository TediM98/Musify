import React from 'react'

export function DropDownItem({
  onRemoveStation,
  stationId,
  onRemoveSong,
  songId,
}) {
  return (
    <React.Fragment>
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
        <li className="dropdown-item clean-list">
          <article>Add to playlist</article>
        </li>
      )}
    </React.Fragment>
  )
}
