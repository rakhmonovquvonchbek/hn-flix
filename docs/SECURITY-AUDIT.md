# HNFlix security & privacy audit (2026-11-03)

Scope: public repo [rakhmonovquvonchbek/hn-flix](https://github.com/rakhmonovquvonchbek/hn-flix) and a quick scan of your public GitHub footprint.

## hn-flix — clean for secrets

| Check | Result |
| --- | --- |
| API keys / tokens in source | **None found** |
| `.env` or credential files committed | **None** |
| GitHub Actions secrets in repo | **None** (empty) |
| Private keys / `ghp_` / `sk-` in git history | **None** in this repo |
| `movies.json` personal data | **None** (public film metadata only) |

## Information that is public (by design)

- **GitHub username** in the live URL and README (`rakhmonovquvonchbek.github.io/hn-flix/`).
- **Commit author name** on commits (`Kuvonchbek Rahmonov`). Email is a local placeholder (`@hello.local`), not a real mailbox — still consider using GitHub’s noreply email on future commits: `ID+username@users.noreply.github.com` (Settings → Emails).

## Copyright & content

- **HNMovies data**: MIT-licensed dataset; film titles/metadata are factual listings.
- **Posters**: URLs point at **Wikimedia**; images are not bundled in the repo. Hotlinking may break if Wikipedia changes URLs; it is not hosting pirated video.
- **Branding**: “HNFlix” / HN styling — not using Netflix logos or trademarks. Fan-style UI homage, not impersonation.

## Broader GitHub account (public repos)

Automated search for `ghp_`, `AKIA`, and `sk-` in your public code found **placeholder examples only** (e.g. `sk-ant-...` in `fern` README/docs), not live keys. **Private repos were not audited here.**

Recommendations:

1. Enable **GitHub secret scanning** (on for public repos by default) and avoid committing `.env`.
2. Rotate any key that was ever committed literally (not `...` placeholders).
3. Keep `hn-flix` free of analytics IDs in git — use **Repository variables** (see `docs/ANALYTICS.md`).

## Analytics privacy

When enabled, GA4 + Clarity receive IP-derived location, referrer, device, and on-site behavior. A **consent banner** gates loading in the app. Update the banner text if your audience is mostly UK/EEA and you adopt a formal privacy policy.
