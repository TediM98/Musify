import { Link } from "react-router-dom"
import POP from "../assets/img/song-images-search-companent/3.jpeg"
import HIPHOP from "../assets/img/song-images-search-companent/6.jpeg"
import ROCK from "../assets/img/song-images-search-companent/7.jpeg"
import Global from "../assets/img/song-images-search-companent/9.jpeg"
import LiveEvents from "../assets/img/song-images-search-companent/10.jpeg"
import MOOD from "../assets/img/song-images-search-companent/12.jpeg"
import Electronic from "../assets/img/song-images-search-companent/14.jpeg"
import Country from "../assets/img/song-images-search-companent/16.jpeg"
import RandB from "../assets/img/song-images-search-companent/17.jpeg"
import CHILL from "../assets/img/song-images-search-companent/chill.jpeg"
import JAZZ from "../assets/img/song-images-search-companent/JAZZ.jpg"
import ALT from "../assets/img/song-images-search-companent/ALT.jpeg"
import CLASSIC from "../assets/img/song-images-search-companent/CLASSIC.jpeg"
import SLEEP from "../assets/img/song-images-search-companent/SLEEP.jpeg"
import METAL from "../assets/img/song-images-search-companent/METAL.jpeg"

export function GenreList() {
  return (
    <section className="genres-page">
      <h1 className="browse-all">Browse all</h1>
      <div className="genres-cards-container">
        <Link to={`rock`}>
          <div
            style={{ backgroundColor: "#e61e32" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Rock</h1>
            <img className="search-card-img" src={ROCK} alt="" />
          </div>
        </Link>
        <Link to={`pop`}>
          <div
            style={{ backgroundColor: "#148a08" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Pop</h1>
            <img className="search-card-img" src={POP} alt="" />
          </div>
        </Link>
        <Link to={`Chill`}>
          <div
            style={{ backgroundColor: "#1e3264" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Chill</h1>
            <img className="search-card-img" src={CHILL} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`hiphop`}>
          <div
            style={{ backgroundColor: "#148a08" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Hip-Hop</h1>
            <img className="search-card-img" src={HIPHOP} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`electronic`}>
          <div
            style={{ backgroundColor: "#d84000" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Electronic</h1>
            <img className="search-card-img" src={Electronic} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`jazz`}>
          <div
            style={{ backgroundColor: "#1e3264" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Jazz</h1>
            <img className="search-card-img" src={JAZZ} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`R&B`}>
          <div
            style={{ backgroundColor: "#5179a1" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">R&B</h1>
            <img className="search-card-img" src={RandB} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`alternative`}>
          <div
            style={{ backgroundColor: "#e61e32" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Alternative</h1>
            <img className="search-card-img" src={ALT} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`Global Songs`}>
          <div
            style={{ backgroundColor: "#d84000 " }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Global Songs</h1>
            <img className="search-card-img" src={Global} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`Live Events`}>
          <div
            style={{ backgroundColor: "#bc5900" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Live Events</h1>
            <img className="search-card-img" src={LiveEvents} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`Classical`}>
          <div
            style={{ backgroundColor: "#148a08" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Classical</h1>
            <img className="search-card-img" src={CLASSIC} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`Mood`}>
          <div
            style={{ backgroundColor: "#e1118c" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Mood</h1>
            <img className="search-card-img" src={MOOD} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`Country`}>
          <div
            style={{ backgroundColor: "#bc9900" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Country</h1>
            <img className="search-card-img" src={Country} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`Sleep`}>
          <div
            style={{ backgroundColor: "#1e3264" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Sleep</h1>
            <img className="search-card-img" src={SLEEP} alt="" />
          </div>
        </Link>
        <Link className="genre-link" to={`Metal`}>
          <div
            style={{ backgroundColor: "#e61e32" }}
            className="search-card-category"
          >
            <h1 className="search-card-headline">Metal</h1>
            <img className="search-card-img" src={METAL} alt="" />
          </div>
        </Link>
      </div>
    </section>
  )
}
