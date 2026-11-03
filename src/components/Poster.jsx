import { useMemo, useState } from 'react'
import { resolvePosterUrl } from '../lib/poster'

function hashHue(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 360
  return h
}

export default function Poster({ movie, variant = 'card', className = '', alt, priority = false }) {
  const [failed, setFailed] = useState(false)
  const src = useMemo(() => resolvePosterUrl(movie.poster, variant), [movie.poster, variant])
  const showFallback = !src || failed

  const rootClass = ['poster', `poster--${variant}`, className].filter(Boolean).join(' ')

  if (showFallback) {
    const hue = hashHue(movie.imdb_id || movie.title)
    return (
      <div
        className={rootClass}
        style={{
          background: `linear-gradient(145deg, hsl(${hue} 45% 28%), hsl(${(hue + 40) % 360} 35% 14%))`,
        }}
        aria-hidden={alt === '' ? true : undefined}
      >
        <div className="poster__fallback">
          <span className="poster__fallback-title">{movie.title}</span>
          <span className="poster__fallback-year">{movie.year}</span>
        </div>
      </div>
    )
  }

  return (
    <img
      className={rootClass}
      src={src}
      alt={alt ?? `${movie.title} (${movie.year}) poster`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  )
}
