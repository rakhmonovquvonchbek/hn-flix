import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'
import MovieModal from './components/MovieModal'
import MovieCard from './components/MovieCard'
import {
  buildRows,
  loadMyList,
  saveMyList,
  searchMovies,
} from './lib/movies'

export default function App() {
  const [movies, setMovies] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('home')
  const [selected, setSelected] = useState(null)
  const [myList, setMyList] = useState(() => loadMyList())

  useEffect(() => {
    fetch('/data/movies.json')
      .then((r) => {
        if (!r.ok) throw new Error('Could not load catalog')
        return r.json()
      })
      .then((data) => {
        setMovies(data.movies ?? [])
        setMeta(data.meta ?? null)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const featured = movies[0] ?? null
  const rows = useMemo(() => buildRows(movies), [movies])
  const searchResults = useMemo(
    () => (search.trim() ? searchMovies(movies, search) : []),
    [movies, search],
  )

  const listMovies = useMemo(
    () => movies.filter((m) => myList.includes(m.imdb_id)),
    [movies, myList],
  )

  const toggleList = useCallback((imdbId) => {
    setMyList((prev) => {
      const next = prev.includes(imdbId)
        ? prev.filter((id) => id !== imdbId)
        : [...prev, imdbId]
      saveMyList(next)
      return next
    })
  }, [])

  const openMovie = useCallback((movie) => setSelected(movie), [])
  const closeModal = useCallback(() => setSelected(null), [])

  const handleNav = (next) => {
    setView(next)
    setSearch('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return <div className="app app--loading">Loading HN’s greatest hits…</div>
  }

  if (error) {
    return (
      <div className="app app--error">
        <div>
          <h1>Something went wrong</h1>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const showSearch = search.trim().length > 0
  const selectedInList = selected ? myList.includes(selected.imdb_id) : false
  const featuredInList = featured ? myList.includes(featured.imdb_id) : false

  return (
    <div className="app">
      <Header search={search} onSearch={setSearch} view={view} onNav={handleNav} />

      {showSearch ? (
        <section className="search-results" aria-label="Search results">
          <h1 className="search-results__title">
            {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for “{search}”
          </h1>
          <div className="search-grid">
            {searchResults.map((m) => (
              <MovieCard key={m.imdb_id} movie={m} onSelect={openMovie} />
            ))}
          </div>
        </section>
      ) : view === 'list' ? (
        <section className="search-results" aria-label="My list">
          <h1 className="search-results__title">My List</h1>
          {listMovies.length === 0 ? (
            <p className="row__subtitle">Save films with + My List — stored locally in your browser.</p>
          ) : (
            <div className="search-grid">
              {listMovies.map((m) => (
                <MovieCard key={m.imdb_id} movie={m} onSelect={openMovie} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <Hero
            movie={featured}
            inList={featuredInList}
            onPlay={() => openMovie(featured)}
            onInfo={() => openMovie(featured)}
            onToggleList={() => featured && toggleList(featured.imdb_id)}
          />
          <main className="main">
            {rows.map((row) => (
              <MovieRow key={row.id} row={row} onSelect={openMovie} />
            ))}
          </main>
        </>
      )}

      <footer className="footer">
        <p>
          <strong>HNFlix</strong> — feature films repeatedly recommended on{' '}
          <a href="https://news.ycombinator.com/" target="_blank" rel="noreferrer">
            Hacker News
          </a>
          . Catalog from the{' '}
          <a href="https://hnmovies.org/" target="_blank" rel="noreferrer">
            HNMovies
          </a>{' '}
          dataset ({meta?.source ?? 'gnumanth/hnmovies'}, {meta?.updated ?? 'weekly'}). Not affiliated with Netflix
          or Y Combinator.
        </p>
      </footer>

      {selected ? (
        <MovieModal
          movie={selected}
          inList={selectedInList}
          onClose={closeModal}
          onToggleList={() => toggleList(selected.imdb_id)}
        />
      ) : null}
    </div>
  )
}
