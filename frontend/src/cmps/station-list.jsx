import React from 'react'
import { StationPreview } from './station-preview'


export function StationList({ stations }) {
  return (
    <section className='station-list'>
      {
        stations.map(station =>
          <StationPreview station={station} key={station._id} />)}
    </section>
  )
}