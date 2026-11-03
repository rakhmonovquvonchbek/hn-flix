import Poster from './Poster'

export default function MovieCard({ movie, onSelect }) {
  return (
    <article className="card" onClick={() => onSelect(movie)} role="button" tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(movie)
        }
      }}
    >
      <div className="card__poster">
        <Poster movie={movie} />
        <span className="card__hn">{movie.hn_years_spanned}y HN</span>
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
