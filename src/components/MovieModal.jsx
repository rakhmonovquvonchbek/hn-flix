import { useEffect } from 'react'
import Poster from './Poster'
import { heroBlurb, vibeLabel } from '../lib/movies'
import { hnSearchUrl, trailerSearchUrl } from '../lib/poster'

export default function MovieModal({ movie, inList, onClose, onToggleList }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!movie) return null

  const imdbUrl = `https://www.imdb.com/title/${movie.imdb_id}/`

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__hero">
          <Poster movie={movie} variant="modal" alt="" priority />
          <div className="modal__hero-shade" />
          <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
            ×
          </button>
          <div className="modal__hero-text">
            <h2 className="modal__title" id="modal-title">
              {movie.title} <span className="modal__year">({movie.year})</span>
            </h2>
          </div>
        </div>
        <div className="modal__body">
          <div className="modal__grid">
            <div>
              <p className="modal__desc">{heroBlurb(movie)}</p>
              <div className="modal__tags">
                {(movie.genres ?? []).map((g) => (
                  <span key={g} className="tag">
                    {g}
                  </span>
                ))}
                {(movie.vibes ?? []).map((v) => (
                  <span key={v} className="tag tag--vibe">
                    {vibeLabel(v)}
                  </span>
                ))}
              </div>
              <div className="hero__actions modal__actions">
                <a className="btn btn--primary" href={trailerSearchUrl(movie)} target="_blank" rel="noreferrer">
                  ▶ Trailer
                </a>
                <a className="btn btn--secondary" href={imdbUrl} target="_blank" rel="noreferrer">
                  IMDb
                </a>
                <a className="btn btn--ghost" href={hnSearchUrl(movie)} target="_blank" rel="noreferrer">
                  HN threads
                </a>
                <button
                  type="button"
                  className={`btn ${inList ? 'btn--in-list' : 'btn--ghost'}`}
                  onClick={onToggleList}
                >
                  {inList ? '✓ In My List' : '+ My List'}
                </button>
              </div>
            </div>
            <aside className="stats-panel">
              <h3>Hacker News signal</h3>
              <div className="stat-row">
                <span>Recommending users</span>
                <span>{movie.hn_recommending_users}</span>
              </div>
              <div className="stat-row">
                <span>Threads</span>
                <span>{movie.hn_threads}</span>
              </div>
              <div className="stat-row">
                <span>Years on HN</span>
                <span>{movie.hn_years_spanned}</span>
              </div>
              <div className="stat-row">
                <span>rec_score</span>
                <span>{movie.rec_score.toFixed(1)}</span>
              </div>
              <div className="stat-row">
                <span>Hidden gem</span>
                <span>{movie.hidden_gem_score.toFixed(1)}</span>
              </div>
              <div className="stat-row">
                <span>IMDb</span>
                <span>{movie.imdb_rating.toFixed(1)}</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
