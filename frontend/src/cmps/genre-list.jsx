import { Link } from "react-router-dom";

export function GenreList() {
  return (
    <div>
      <h1>Browse all</h1>
      <div className="genres-cards-container">
      <Link to={`rock`}>
        <div
          style={{ backgroundColor: '#e61e32' }}
          className="search-card-category">

         


          <h1 className="search-card-headline">Rock</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        </Link> 
        <Link to={`pop`}>
        <div
          style={{ backgroundColor: '#148a08' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Pop</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        </Link>
        <Link to={`relaxing`}>
        <div
          style={{ backgroundColor: '#1e3264' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Relaxing</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        </Link>
        <Link className="genre-link" to={`hiphop`}>
        <div
          style={{ backgroundColor: '#148a08' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Hip-Hop</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        </Link>
        <div
          style={{ backgroundColor: '#d84000' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Electronic</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#1e3264' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Jazz</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#5179a1' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">R&B</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e61e32' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Alternative</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#d84000 ' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Dance</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#bc5900' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Oriental</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#148a08' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Classical</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e1118c' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Latin</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#bc9900' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Country</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#ec5502' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Chill</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e1118c' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Mood</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#1e3264' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Sleep</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e61e32' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Metal</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
        <div
          style={{ backgroundColor: '#bc5900' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Jazz</h1>
          <img className="search-card-img" src="" alt="" />
        </div>
      </div>
    </div>
  )
}
