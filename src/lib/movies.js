const VIBE_LABELS = {
  'hackers-crypto': 'Hackers & crypto',
  'hard-scifi': 'Hard sci-fi',
  'puzzle-box': 'Puzzle box',
  'competence-porn': 'Competence porn',
  'obsession-docs': 'Obsession',
  'systemic-finance': 'Finance & systems',
  'world-auteur': 'World cinema',
}

export function vibeLabel(vibe) {
  return VIBE_LABELS[vibe] ?? vibe.replace(/-/g, ' ')
}

export function heroBlurb(movie) {
  const directors = movie.directors?.length
    ? `Directed by ${movie.directors.slice(0, 2).join(' & ')}. `
    : ''
  return (
    `${directors}` +
    `Endorsed by ${movie.hn_recommending_users} distinct Hacker News commenters across ${movie.hn_threads} threads — mentioned in ${movie.hn_years_spanned} separate years on HN. ` +
    `Meme-filtered score ${movie.rec_score.toFixed(0)} from the HNMovies corpus (2007–present).`
  )
}

export function buildRows(movies) {
  const byScore = [...movies].sort((a, b) => b.rec_score - a.rec_score)
  const byYears = [...movies]
    .filter((m) => m.hn_years_spanned >= 12)
    .sort((a, b) => b.hn_years_spanned - a.hn_years_spanned || b.rec_score - a.rec_score)
  const hiddenGems = [...movies]
    .filter((m) => m.hidden_gem_score > 40)
    .sort((a, b) => b.hidden_gem_score - a.hidden_gem_score)
    .slice(0, 24)
  const hackers = movies.filter((m) => m.vibes?.includes('hackers-crypto')).slice(0, 24)
  const hardScifi = movies.filter((m) => m.vibes?.includes('hard-scifi')).slice(0, 24)
  const puzzle = movies.filter((m) => m.vibes?.includes('puzzle-box')).slice(0, 24)
  const classics = movies.filter((m) => m.year < 2000).sort((a, b) => b.rec_score - a.rec_score).slice(0, 24)

  return [
    {
      id: 'top',
      title: 'Most endorsed on Hacker News',
      subtitle: 'Ranked by meme-filtered rec_score from 49M+ HN stories & comments (HNMovies).',
      items: byScore.slice(0, 24),
    },
    {
      id: 'years',
      title: 'Recommended year after year',
      subtitle: 'Films that kept showing up across HN threads for a decade or more.',
      items: byYears.slice(0, 24),
    },
    {
      id: 'hackers',
      title: 'Movies for hackers',
      subtitle: 'The Matrix, Sneakers, Hackers, and the rest of the terminal-core canon.',
      items: hackers,
    },
    {
      id: 'scifi',
      title: 'Hard sci-fi row',
      subtitle: 'Big ideas, physics with consequences, and comment threads that turn into seminars.',
      items: hardScifi,
    },
    {
      id: 'puzzle',
      title: 'Puzzle boxes & rewatch bait',
      subtitle: 'Films HN keeps re-watching to catch one more clue.',
      items: puzzle,
    },
    {
      id: 'gems',
      title: 'Hidden gems on HN',
      subtitle: 'High conviction on Hacker News, modest mainstream vote counts.',
      items: hiddenGems,
    },
    {
      id: 'classics',
      title: 'Pre-Y2K favorites',
      subtitle: 'Lindy-tested cinema still cited in Ask HN threads today.',
      items: classics,
    },
  ].filter((row) => row.items.length > 0)
}

export function searchMovies(movies, query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return movies.filter((m) => {
    const hay = [
      m.title,
      String(m.year),
      ...(m.directors ?? []),
      ...(m.genres ?? []),
      ...(m.vibes ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
}

const LIST_KEY = 'hnflix-my-list'

export function loadMyList() {
  try {
    const raw = localStorage.getItem(LIST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveMyList(ids) {
  localStorage.setItem(LIST_KEY, JSON.stringify(ids))
}
