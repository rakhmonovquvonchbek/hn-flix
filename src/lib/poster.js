/** Upgrade Wikimedia thumb URLs or resolve to the full-size file when possible. */
export function resolvePosterUrl(raw, variant = 'card') {
  if (!raw) return null

  const widthByVariant = { card: 480, modal: 720, hero: 1280 }
  const targetWidth = widthByVariant[variant] ?? 480

  if (!raw.includes('upload.wikimedia.org')) return raw

  if (variant === 'hero' || variant === 'modal') {
    const original = wikimediaOriginal(raw)
    if (original) return original
  }

  if (raw.includes('/thumb/')) {
    return raw.replace(/\/(\d+)px-([^/?#]+)/, `/${targetWidth}px-$2`)
  }

  return raw
}

function wikimediaOriginal(raw) {
  try {
    const url = new URL(raw)
    const parts = url.pathname.split('/').filter(Boolean)
    const thumbIndex = parts.indexOf('thumb')
    if (thumbIndex === -1) return raw

    const fileName = parts[parts.length - 1].replace(/^\d+px-/, '')
    const stablePath = parts.slice(thumbIndex + 1, -1)
    url.pathname = ['', ...parts.slice(0, thumbIndex), ...stablePath, fileName].join('/')
    return url.toString()
  } catch {
    return raw
  }
}

export function trailerSearchUrl(movie) {
  const q = encodeURIComponent(`${movie.title} ${movie.year} trailer`)
  return `https://www.youtube.com/results?search_query=${q}`
}

export function hnSearchUrl(movie) {
  const q = encodeURIComponent(movie.title)
  return `https://hn.algolia.com/?query=${q}&sort=byDate`
}
