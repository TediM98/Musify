import React from 'react'

export function DropDownItem() {
  return (
    <React.Fragment>
      <li className="dropdown-item clean-list">
        <article>Add to queue</article>
      </li>
      <li className="dropdown-item clean-list">
        <article>Delete</article>
      </li>
      <li className="dropdown-item clean-list">
        <article>Add to playlist</article>
      </li>
    </React.Fragment>
  )
}
