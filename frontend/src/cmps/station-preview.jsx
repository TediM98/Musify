


export function StationPreview({ station }) {

  // console.log(station.createdBy.imgUrl)
  return (
    <section className="station-card">
      <img src={station.createdBy.imgUrl} alt="" />
      <h3>{station.name}</h3>
      <div className="content">
        {/* title-list */}
        <a>{station.songs[0].title}</a>
        <p>{station.songs[1].title}</p>
      </div>
    </section>
  )
}