import Poster from './Poster'
import { trailerSearchUrl } from '../lib/poster'

export default function MovieCard({ movie, onSelect, onToggleList, inList }) {
  return (
    <article
      className="card"
      onClick={() => onSelect(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(movie)
        }
      }}
    >
      <div className="card__poster">
        <Poster movie={movie} variant="card" />
        <span className="card__hn">{movie.hn_years_spanned}y HN</span>
        <div className="card__actions">
          <button
            type="button"
            className="card__action card__action--primary"
            title="More info"
            aria-label={`More info about ${movie.title}`}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(movie)
            }}
          >
            ℹ
          </button>
          <a
            className="card__action"
            title="Find trailer"
            aria-label={`Find ${movie.title} trailer on YouTube`}
            href={trailerSearchUrl(movie)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            ▶
          </a>
          {onToggleList ? (
            <button
              type="button"
              className={`card__action ${inList ? 'card__action--active' : ''}`}
              title={inList ? 'Remove from My List' : 'Add to My List'}
              aria-label={inList ? 'Remove from My List' : 'Add to My List'}
              onClick={(e) => {
                e.stopPropagation()
                onToggleList(movie.imdb_id)
              }}
            >
              {inList ? '✓' : '+'}
            </button>
          ) : null}
        </div>
      </div>
      <div className="card__info">
        <p className="card__name">{movie.title}</p>
        <p className="card__stats">
          ★ {movie.imdb_rating.toFixed(1)} · {movie.hn_recommending_users} HN fans
        </p>
      </div>
    </article>
  )
}
