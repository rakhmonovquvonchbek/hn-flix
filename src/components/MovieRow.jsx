import { useRef } from 'react'
import MovieCard from './MovieCard'

export default function MovieRow({ row, onSelect, onToggleList, myList }) {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.75 * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="row" id={`row-${row.id}`} aria-labelledby={`row-${row.id}`}>
      <div className="row__head">
        <div>
          <h2 className="row__title" id={`row-${row.id}`}>
            {row.title}
          </h2>
          {row.subtitle ? <p className="row__subtitle">{row.subtitle}</p> : null}
        </div>
      </div>
      <div className="row__track-wrap">
        <button type="button" className="row__arrow row__arrow--left" aria-label="Scroll left" onClick={() => scroll(-1)}>
          ‹
        </button>
        <div className="row__track" ref={trackRef}>
          {row.items.map((movie) => (
            <MovieCard
              key={movie.imdb_id}
              movie={movie}
              onSelect={onSelect}
              onToggleList={onToggleList}
              inList={myList?.includes(movie.imdb_id)}
            />
          ))}
        </div>
        <button type="button" className="row__arrow row__arrow--right" aria-label="Scroll right" onClick={() => scroll(1)}>
          ›
        </button>
      </div>
    </section>
  )
}
