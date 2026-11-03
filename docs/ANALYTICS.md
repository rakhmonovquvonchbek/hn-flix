# Analytics setup (free)

HNFlix supports **Google Analytics 4** (traffic, country, referrer, UTM campaigns, time on site) and **Microsoft Clarity** (heatmaps, session recordings, frustration clicks). Both are free.

IDs are injected at **build time** via GitHub repository variables — they never need to live in source code.

## 1. Google Analytics 4

1. Open [Google Analytics](https://analytics.google.com/) → Admin → **Create property** (e.g. “HNFlix”).
2. Add a **Web** data stream for `https://rakhmonovquvonchbek.github.io/hn-flix/`.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`).

**Useful reports after you post on HN/Twitter/etc.:**

- **Reports → Acquisition → Traffic acquisition** — see `news.ycombinator.com`, `t.co`, etc.
- **Reports → User → Demographics → Country** — where visitors are.
- **Reports → Engagement → Pages and screens** — time and engagement.

Add UTM links when you share, e.g.  
`https://rakhmonovquvonchbek.github.io/hn-flix/?utm_source=hackernews&utm_medium=social&utm_campaign=launch`

## 2. Microsoft Clarity

1. Go to [clarity.microsoft.com](https://clarity.microsoft.com/) → **Add new project**.
2. Site URL: `https://rakhmonovquvonchbek.github.io/hn-flix/`
3. Copy the **Project ID** (short alphanumeric string from the setup snippet).

Clarity shows live users, recordings, scroll maps, and rage clicks — good for watching how people use the rows and modal.

Optional: in Clarity settings, **link GA4** so sessions align with GA traffic.

## 3. Add IDs to GitHub (no secrets in git)

From your machine (logged in with `gh`):

```bash
gh variable set VITE_GA_MEASUREMENT_ID --repo rakhmonovquvonchbek/hn-flix --body "G-XXXXXXXXXX"
gh variable set VITE_CLARITY_PROJECT_ID --repo rakhmonovquvonchbek/hn-flix --body "YOUR_CLARITY_PROJECT_ID"
```

Then redeploy:

```bash
gh workflow run "Deploy to GitHub Pages" --repo rakhmonovquvonchbek/hn-flix
```

Or push any commit to `main`. The workflow passes these into `npm run build`.

## 4. Verify

1. Open the live site, click **Accept** on the analytics banner.
2. GA4 → **Reports → Realtime** — you should see yourself.
3. Clarity → **Dashboard** — visits within a few minutes.

## Without third-party tools

GitHub also shows basic clone/view traffic under **repo → Insights → Traffic** (no time-on-site or geo detail).
