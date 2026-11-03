import Poster from './Poster'
import { heroBlurb } from '../lib/movies'

export default function Hero({ movie, inList, onPlay, onInfo, onToggleList }) {
  if (!movie) return null

  return (
    <section className="hero" aria-label="Featured film">
      <div className="hero__backdrop">
        <Poster movie={movie} alt="" />
        <div className="hero__shade" />
        <div className="hero__shade-bottom" />
      </div>
      <div className="hero__content">
        <div className="hero__badge">
          <span>#1 on Hacker News</span>
          <span aria-hidden>·</span>
          <span>{movie.hn_years_spanned} years of mentions</span>
        </div>
        <h1 className="hero__title">
          {movie.title} <span className="hero__year">({movie.year})</span>
        </h1>
        <div className="hero__meta">
          <span>{Math.round(movie.rec_score)} HN score</span>
          <span>IMDb {movie.imdb_rating.toFixed(1)}</span>
          <span>{movie.genres?.slice(0, 2).join(' · ')}</span>
        </div>
        <p className="hero__desc">{heroBlurb(movie)}</p>
        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={onPlay}>
            ▶ More info
          </button>
          <button type="button" className="btn btn--secondary" onClick={onInfo}>
            Details
          </button>
          <button
            type="button"
            className={`btn ${inList ? 'btn--in-list' : 'btn--ghost'}`}
            onClick={onToggleList}
          >
            {inList ? '✓ In My List' : '+ My List'}
          </button>
        </div>
      </div>
    </section>
  )
}
