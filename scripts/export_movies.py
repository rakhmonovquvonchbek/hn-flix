#!/usr/bin/env python3
"""Export HNMovies feature films to public/data/movies.json with Wikipedia posters."""

from __future__ import annotations

import json
import urllib.parse
import urllib.request
from pathlib import Path

import pyarrow.parquet as pq

ROOT = Path(__file__).resolve().parents[1]
PARQUET = Path("/tmp/hnmovies.parquet")
OUT = ROOT / "public" / "data" / "movies.json"
LIMIT = 200


def fetch_poster(title: str, year: int) -> str:
    for q in (f"{title} ({year} film)", f"{title} ({year})", title, f"{title} (film)"):
        url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(
            q.replace(" ", "_"), safe="()"
        )
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "HNFlix/1.0 (educational)"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read())
            if data.get("type") == "disambiguation":
                continue
            orig = data.get("originalimage", {}).get("source", "")
            thumb = data.get("thumbnail", {}).get("source", "")
            best = orig or thumb
            if best:
                return best.split("?")[0]
        except OSError:
            continue
    return ""


def main() -> None:
    if not PARQUET.is_file():
        raise SystemExit(f"Missing {PARQUET}. Download the HNMovies parquet from Hugging Face first.")

    df = pq.read_table(PARQUET).to_pandas()
    movies = df[df["type"] == "movie"].sort_values("rec_score", ascending=False).head(LIMIT)
    records = []
    for _, row in movies.iterrows():
        title = row["title"]
        year = int(row["year"])
        poster = fetch_poster(title, year)
        records.append(
            {
                "title": title,
                "year": year,
                "imdb_id": row["imdb_id"],
                "imdb_rating": float(row["imdb_rating"]),
                "hn_recommending_users": int(row["hn_recommending_users"]),
                "hn_threads": int(row["hn_threads"]),
                "hn_years_spanned": int(row["hn_years_spanned"]),
                "rec_score": float(row["rec_score"]),
                "hidden_gem_score": float(row["hidden_gem_score"]),
                "genres": row["genres"].tolist(),
                "vibes": row["vibes"].tolist(),
                "directors": row["directors"].tolist(),
                "poster": poster,
                "tagline": (
                    f"{int(row['hn_recommending_users'])} HN recommenders · "
                    f"{int(row['hn_threads'])} threads · "
                    f"{int(row['hn_years_spanned'])} years on HN"
                ),
            }
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "meta": {
            "source": "gnumanth/hnmovies",
            "updated": "weekly",
            "description": "Feature films repeatedly recommended on Hacker News (meme-filtered rec_score)",
        },
        "movies": records,
    }
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {len(records)} movies to {OUT}")


if __name__ == "__main__":
    main()
