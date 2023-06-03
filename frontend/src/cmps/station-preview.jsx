import { Link } from 'react-router-dom'

export function StationPreview({ station }) {
  return (
    <Link to={`/station/${station._id}`}>
      <section className="station-card">
        <img src={station.createdBy.imgUrl} alt="" />
        <button className='btn-play-playlist'>
          <svg xmlns="http://www.w3.org/2000/svg" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" className="Svg-sc-ytk21e-0 ldgdZj"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" /></svg>
        </button>
        <h3>{station.name}</h3>
        <div className="content">
          <div>{station.songs[0].title}</div>
          <div>{station.songs[1].title.slice(0, 20)}...</div>
        </div>
      </section>
    </Link>
  )
}
