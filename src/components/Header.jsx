import { useEffect, useState } from 'react'

const BROWSE_LINKS = [
  { id: 'row-top', label: 'Top on HN' },
  { id: 'row-years', label: 'Year after year' },
  { id: 'row-hackers', label: 'For hackers' },
  { id: 'row-gems', label: 'Hidden gems' },
]

export default function Header({ search, onSearch, view, onNav, onBrowse }) {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${solid ? 'header--solid' : ''}`}>
      <a
        href="#home"
        className="header__brand"
        onClick={(e) => {
          e.preventDefault()
          onNav('home')
        }}
      >
        <span className="header__logo">HNFLIX</span>
        <span className="header__tag">HN picks</span>
      </a>
      <nav className="header__nav" aria-label="Primary">
        <button
          type="button"
          className={`header__link ${view === 'home' ? 'header__link--active' : ''}`}
          onClick={() => onNav('home')}
        >
          Home
        </button>
        <button
          type="button"
          className={`header__link ${view === 'list' ? 'header__link--active' : ''}`}
          onClick={() => onNav('list')}
        >
          My List
        </button>
        {view === 'home' && !search ? (
          <div className="header__browse">
            <span className="header__browse-label">Browse</span>
            {BROWSE_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                className="header__browse-item"
                onClick={() => onBrowse(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="header__search-wrap">
          <svg
            className="header__search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
          <input
            className="header__search"
            type="search"
            placeholder="Titles, vibes, directors…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search films"
          />
        </div>
      </nav>
    </header>
  )
}
