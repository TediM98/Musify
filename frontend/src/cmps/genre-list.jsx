import { Link } from 'react-router-dom'
import img1 from '../assets/img/song-images-search-companent/1.jpeg'
import img2 from '../assets/img/song-images-search-companent/2.jpeg'
import img3 from '../assets/img/song-images-search-companent/3.jpeg'
import img4 from '../assets/img/song-images-search-companent/4.jpeg'
import img5 from '../assets/img/song-images-search-companent/5.jpeg'
import img6 from '../assets/img/song-images-search-companent/6.jpeg'
import img7 from '../assets/img/song-images-search-companent/7.jpeg'
import img8 from '../assets/img/song-images-search-companent/8.jpeg'
import img9 from '../assets/img/song-images-search-companent/9.jpeg'
import img10 from '../assets/img/song-images-search-companent/10.jpeg'
import img11 from '../assets/img/song-images-search-companent/11.jpeg'
import img12 from '../assets/img/song-images-search-companent/12.jpeg'
import img13 from '../assets/img/song-images-search-companent/13.jpeg'
import img14 from '../assets/img/song-images-search-companent/14.jpeg'
import img15 from '../assets/img/song-images-search-companent/15.jpeg'
import img16 from '../assets/img/song-images-search-companent/16.jpeg'
import img17 from '../assets/img/song-images-search-companent/17.jpeg'
import img18 from '../assets/img/song-images-search-companent/18.jpeg'


export function GenreList() {
  return (
    <div>
      <h1>Browse all</h1>
      <div className="genres-cards-container">
        <Link to={`rock`}>
          <div
            style={{ backgroundColor: '#e61e32' }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Rock</h1>
            <img className="search-card-img" src={img1} alt="" />
          </div>
        </Link>
        <Link to={`pop`}>
          <div
            style={{ backgroundColor: '#148a08' }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Pop</h1>
            <img className="search-card-img" src={img2} alt="" />
          </div>
        </Link>
        <Link to={`relaxing`}>
          <div
            style={{ backgroundColor: '#1e3264' }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Relaxing</h1>
            <img className="search-card-img" src={img3} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`hiphop`}>
          <div
            style={{ backgroundColor: '#148a08' }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Hip-Hop</h1>
            <img className="search-card-img" src={img4} alt="" />
          </div>
        </Link>
        <div
          style={{ backgroundColor: '#d84000' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Electronic</h1>
          <img className="search-card-img" src={img5} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#1e3264' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Jazz</h1>
          <img className="search-card-img" src={img6} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#5179a1' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">R&B</h1>
          <img className="search-card-img" src={img7} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e61e32' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Alternative</h1>
          <img className="search-card-img" src={img8} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#d84000 ' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Dance</h1>
          <img className="search-card-img" src={img9} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#bc5900' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Oriental</h1>
          <img className="search-card-img" src={img10} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#148a08' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Classical</h1>
          <img className="search-card-img" src={img11} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e1118c' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Latin</h1>
          <img className="search-card-img" src={img12} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#bc9900' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Country</h1>
          <img className="search-card-img" src={img13} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#ec5502' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Chill</h1>
          <img className="search-card-img" src={img14} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e1118c' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Mood</h1>
          <img className="search-card-img" src={img15} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#1e3264' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Sleep</h1>
          <img className="search-card-img" src={img16} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#e61e32' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Metal</h1>
          <img className="search-card-img" src={img17} alt="" />
        </div>
        <div
          style={{ backgroundColor: '#bc5900' }}
          className="search-card-category"
        >
          <h1 className="search-card-headline">Jazz</h1>
          <img className="search-card-img" src={img18} alt="" />
        </div>
      </div>
    </div>
  )
}
