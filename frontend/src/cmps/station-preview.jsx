export function StationPreview({ station }) {
  return (
    <section className="station-card">
      <img src={station.createdBy.imgUrl} alt="" />
      <h3>{station.name}</h3>
      <div className="content">
        <div>{station.songs[0].title}</div>
        <div>{station.songs[1].title}</div>
      </div>
    </section>
  )
}
