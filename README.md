# Amadul Islam — Developer Portfolio

A single-page developer portfolio built with **Vite**, **React**, **TypeScript (strict mode)**, **Tailwind CSS v4**, and **Framer Motion**. All portfolio content is centralized in `src/data/content.ts`, and all image assets are centralized in `src/data/images.ts`.

## Tech Stack

- **Framework:** Vite + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 with CSS custom properties (dark-first with light mode toggle)
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **Icons:** `lucide-react` & `react-icons`
- **Fonts:** Self-hosted Space Grotesk & Inter via `@fontsource-variable`
- **Contact Form:** Formspree (frontend-only, no backend required)

---

## Local Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Run TypeScript typecheck:

```bash
npm run typecheck
```

---

## How to Edit Portfolio Content

All copy, links, skills, projects, experience, education, and awards live in a single file:

- **`src/data/content.ts`**

Search for `// TODO` in `src/data/content.ts` (and `index.html`) to locate items you may want to fill in:
- Live demo and GitHub repository URLs for **MosquitoWatch**, **EasyCode**, and **Niramoy** (links appear automatically as soon as a URL is provided).
- City/country in `personal.location` if you want it shown publicly.
- Verified GitHub / LinkedIn URLs.
- Additional projects under `otherProjects` (the "Other Projects" block renders automatically when items are added).

To update your downloadable CV, replace `/public/cv.pdf` with your updated PDF using the same filename.

---

## How to Replace Images

All image paths, dimensions, and alt text are defined in **`src/data/images.ts`** and point to local files inside **`/public/images/`**:

| Asset | File Path | Recommended Size |
| --- | --- | --- |
| Profile photo | `/public/images/profile.jpg` | `800×800` (1:1 square) |
| MosquitoWatch thumbnail | `/public/images/project1.svg` | `1280×720` (16:9) |
| EasyCode thumbnail | `/public/images/project2.svg` | `1280×720` (16:9) |
| Niramoy thumbnail | `/public/images/project3.svg` | `1280×720` (16:9) |
| Open Graph preview | `/public/images/og-image.svg` | `1200×630` |
| Favicon | `/public/images/favicon.svg` | `64×64` |

**Two ways to replace an image:**
1. **Same filename:** Overwrite the file in `/public/images/` (e.g. replace `profile.jpg` directly).
2. **Different format (e.g. PNG/WebP for project screenshots):** Save `project1.webp` in `/public/images/` and update the `src` field in `src/data/images.ts` (keeping `width` and `height` accurate to prevent layout shift).

---

## How to Configure the Contact Form (Formspree)

1. Sign up or log in at [formspree.io](https://formspree.io/).
2. Create a new form and copy its endpoint URL (looks like `https://formspree.io/f/xabcdefg`).
3. Open `src/data/content.ts` and replace `YOUR_FORMSPREE_ID` in `contact.formspreeEndpoint`:
   ```ts
   formspreeEndpoint: 'https://formspree.io/f/YOUR_ACTUAL_ID',
   ```
4. Commit and redeploy.

---

## How to Deploy / Redeploy on Vercel

### Option A: Automatic deployments via GitHub (recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Confirm settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Every subsequent `git push` to `main` automatically rebuilds and redeploys your site.

### Option B: Deploy from CLI
```bash
npx vercel --prod
```

### Adding a Custom Domain Later
1. In your Vercel dashboard, open the project → **Settings → Domains**.
2. Enter your custom domain (e.g., `amadul.dev`) and click **Add**.
3. Add the DNS records Vercel provides (`A` record pointing to `76.76.21.21` for apex domain, or `CNAME` pointing to `cname.vercel-dns.com` for `www`) at your domain registrar.
4. Once SSL is provisioned (typically a few minutes), update the `<link rel="canonical">` and `og:url` meta tags in `index.html` to your new domain.
