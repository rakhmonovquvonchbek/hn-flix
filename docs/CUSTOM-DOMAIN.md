# Short public URL for HNFlix

## Best free options (pick one)

| URL | How |
| --- | --- |
| **https://hnflix.pages.dev** | Cloudflare Pages (free). Add repo secrets `CLOUDFLARE_API_TOKEN` + variable `CLOUDFLARE_ACCOUNT_ID`, push to `main`. |
| **https://hnflix.vercel.app** | Run once locally: `npx vercel login` then `npx vercel --prod` from this folder. |
| **https://hnflix.netlify.app** | Connect repo at [app.netlify.com](https://app.netlify.com) or `netlify deploy --prod`. |
| **https://hnflix.surge.sh** | `npm run build && npx surge dist hnflix.surge.sh` |

## Branded domain (recommended for X/HN posts)

Buy something like **hnflix.app** or **hnflix.dev** (~$10–15/yr on Cloudflare Registrar).

### GitHub Pages (current host)

1. In repo **Settings → Pages → Custom domain**, enter `hnflix.app` (or `www.hnflix.app`).
2. At your DNS host, add:
   - `A` records for `@` → GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or `CNAME` `www` → `rakhmonovquvonchbek.github.io`
3. Add `public/CNAME` in this repo with your domain (one line, no `https://`).
4. Enable **Enforce HTTPS** in Pages settings.

After DNS propagates, set `BASE_PATH=/` in the GitHub Pages workflow (root deploy) or keep `/hn-flix/` only on the long github.io URL.

### Cloudflare Pages

Use the included workflow; in Cloudflare dashboard add custom domain `hnflix.app` to project **hnflix**.
