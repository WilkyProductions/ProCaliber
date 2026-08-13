# Pro Caliber Services

Marketing website for Pro Caliber Services — industrial electrical systems
and control panel fabrication for the water/wastewater industry. Built with
Next.js (App Router), TypeScript, and Tailwind CSS.

## Project structure

```
app/
  layout.tsx        Root layout: fonts, metadata, mounts ElectricBackground
  page.tsx           Assembles the single-page site from components/
  globals.css         Color palette, fonts, and the wire-pulse animation
  api/contact/route.ts  Contact form submit handler (sends via Resend)

components/           One component per section (Header, Hero, About,
                       Services, Industries, Gallery, Contact, Footer,
                       ElectricBackground, MobileNav, ContactForm)

data/site-content.ts  All editable copy — company info, nav links, hero
                       text, services list, industries list. Edit text here
                       first before touching component files.

lib/images.ts         Helpers that read /public/images/* at build time so
                       gallery/logo/hero images can just be dropped in.

public/images/
  logo/                Drop the Pro Caliber logo file here (any image name)
  hero/                Drop one hero/background image here
  about/                Drop one image for the About section here
  gallery/              Drop as many project photos here as you want — the
                         Gallery section picks up every image automatically
```

Dropping images into these folders is all that's needed — no code changes
required. Filenames become the gallery `alt` text, so name them
descriptively (e.g. `panel-assembly-line.jpg` → "Panel Assembly Line").

## Design system

- **Colors & fonts**: defined once in `app/globals.css` under `@theme`.
  - `--color-gray` is a placeholder gray — once the logo file is in
    `/public/images/logo`, update this hex to match it exactly.
  - Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
    for headings (tech feel), [Inter](https://fonts.google.com/specimen/Inter)
    for body text (readability). Loaded via `next/font/google`, self-hosted
    automatically — no external font requests at runtime.
- **ElectricBackground** (`components/ElectricBackground.tsx`): the animated
  circuit-line background. It measures the full page height on mount/resize
  so the lines run the entire scrollable page, not just one viewport. Each
  line is an SVG path with a bright, blurred "pulse" that travels along it
  via `stroke-dashoffset` animation — this follows the line's bends
  correctly and respects `prefers-reduced-motion`. Edit the `WIRES` array to
  add/remove/reposition lines.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form / Resend setup

The contact form posts to `app/api/contact/route.ts`, which sends an email
via [Resend](https://resend.com). To activate it:

1. Create a Resend account and get an API key from
   [resend.com/api-keys](https://resend.com/api-keys).
2. (Recommended) Verify your sending domain at
   [resend.com/domains](https://resend.com/domains) so email can be sent
   "from" your own domain. Until you do, the route falls back to Resend's
   shared `onboarding@resend.dev` sender, which works for testing but looks
   less professional.
3. Copy `.env.local.example` to `.env.local` and fill in:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` — the inbox that should receive submissions
   - `CONTACT_FROM_EMAIL` — leave blank to use the shared testing sender
4. Restart the dev server. Submissions will now send real email.

Add the same three variables in Vercel (see below) before deploying, or the
form will return a friendly "not configured yet" error instead of sending.

## Deploying to Vercel

The repo isn't showing up in your Vercel repo list most likely because
Vercel only lists repos it has GitHub/GitLab/Bitbucket App access to — a
repo has to be pushed to one of those providers and connected before it
appears as an import option. Steps:

1. **Push this repo to GitHub** (if it isn't already):
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. **Go to [vercel.com/new](https://vercel.com/new)** and sign in with the
   same account/org you want the project under.
3. If the repo still doesn't appear in the import list, click
   **"Adjust GitHub App Permissions"** (or **Import Git Repository →
   Configure GitHub App**) and grant Vercel access to this specific repo —
   by default the Vercel GitHub App may only have access to repos you
   explicitly selected when it was installed.
4. Select the repo and click **Import**. Vercel auto-detects Next.js, so
   the default build settings (`next build`, output handled automatically)
   need no changes.
5. Before the first deploy (or right after, then redeploy), add the
   environment variables from `.env.local.example` under **Project
   Settings → Environment Variables**: `RESEND_API_KEY`,
   `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
6. Click **Deploy**. Every push to `main` will auto-deploy afterward; pull
   requests get their own preview URLs automatically.
7. **Custom domain**: once live, add your domain under **Project Settings →
   Domains** and follow Vercel's DNS instructions.

## Notes

- This is currently a single page (`/`); all sections are anchor-linked
  from the header nav (`#about`, `#services`, etc.).
- `next.config.ts` disables Next's auto-generated `AGENTS.md`/`CLAUDE.md`
  files (`agentRules: false`) to keep the repo root clean.
