import React from 'react'

export function DropDownItem({ onRemoveStation, stationId }) {
  console.log('onRemoveStation', onRemoveStation)
  return (
    <React.Fragment>
      <li className="dropdown-item clean-list">
        <article>Add to queue</article>
      </li>
      <li className="dropdown-item clean-list">
        <article onClick={() => onRemoveStation(stationId)}>Delete</article>
      </li>
      <li className="dropdown-item clean-list">
        <article>Add to playlist</article>
      </li>
    </React.Fragment>
  )
}
