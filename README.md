# HNFlix

Netflix-style browsing UI for **feature films repeatedly recommended on Hacker News** — powered by the [HNMovies](https://hnmovies.org/) dataset (`gnumanth/hnmovies`).

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Live site

- **Now:** https://rakhmonovquvonchbek.github.io/hn-flix/ (GitHub Pages)
- **Shorter URLs (free):** see [docs/CUSTOM-DOMAIN.md](docs/CUSTOM-DOMAIN.md) — e.g. `hnflix.vercel.app`, `hnflix.pages.dev`, `hnflix.surge.sh`, or your own `hnflix.app`.

## Security

See [docs/SECURITY-AUDIT.md](docs/SECURITY-AUDIT.md) for a secrets/copyright/privacy review of this repo.

## Analytics

Optional **Google Analytics 4** + **Microsoft Clarity** (visitor counts, country, referrers, time on site, session recordings). Setup: [docs/ANALYTICS.md](docs/ANALYTICS.md) — add repository variables, then redeploy.

## Data

- `public/data/movies.json` — top 200 HN-endorsed **movies** (documentaries excluded from this UI per “movies only”).
- Scores and thread counts come from HNMovies’ meme-filtered `rec_score` and `hn_years_spanned` fields.
- Posters: Wikipedia thumbnails where available; gradient fallback otherwise.

## Refresh catalog

From the repo root (requires `pyarrow`):

```bash
pip install pyarrow
curl -sSL "https://huggingface.co/datasets/gnumanth/hnmovies/resolve/main/data/train-00000-of-00001.parquet" -o /tmp/hnmovies.parquet
python3 scripts/export_movies.py   # add script if you extend the pipeline
```

The initial export was generated inline when the project was created.
