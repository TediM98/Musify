import { Link } from 'react-router-dom'
import { svgService } from '../services/svg.service'

export function StationPreview({ station }) {
  return (
    <Link to={`/station/${station._id}`}>
      <section className="station-card">
        <div className='img-conatiner'>
          <img src={station.createdBy.imgUrl} alt="" />
          <button className='btn-play-playlist'>
            {svgService.palyerBtnPreview}
          </button>
        </div>
        <h3>{station.name}</h3>
        <div className="content">
          {station.songs.length > 0 ? (
            <>
              <div title={station.songs[0].title}>{station.songs[0].title.slice(0, 20)}</div>
              <div title={station.songs[1].title}>{station.songs[1].title.slice(0, 20)}...</div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </Link>
  )
}
