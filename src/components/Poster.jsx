import { useState } from 'react'

function hashHue(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 360
  return h
}

export default function Poster({ movie, className, alt }) {
  const [failed, setFailed] = useState(false)
  const src = movie.poster
  const showFallback = !src || failed

  if (showFallback) {
    const hue = hashHue(movie.imdb_id || movie.title)
    return (
      <div
        className={className}
        style={{
          background: `linear-gradient(145deg, hsl(${hue} 45% 28%), hsl(${(hue + 40) % 360} 35% 14%))`,
        }}
        aria-hidden={alt ? undefined : true}
      >
        <div className="card__fallback">
          <span className="card__fallback-title">{movie.title}</span>
          <span className="card__fallback-year">{movie.year}</span>
        </div>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt ?? `${movie.title} (${movie.year}) poster`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
