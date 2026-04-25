# D & M Plumbing Services — Website

A clean, mobile-first marketing website for D & M Plumbing Services
(South Shields, North East England). Built with vanilla HTML5, CSS3, and
JavaScript — no frameworks, no build step.

---

## File structure

```
dm-plumbing/
├── index.html      ← The page itself
├── styles.css      ← All styling
├── script.js       ← Form handling + scroll reveals
└── README.md       ← This file
```

That's it. Three files, no node_modules, nothing to break.

---

## Test it locally

Just open `index.html` in any browser. No server needed.

If you want a local dev server (auto-reload, mobile preview on your phone
over Wi-Fi), run one of these from the `dm-plumbing/` folder:

```bash
# Python (already on macOS / most Linux)
python3 -m http.server 8080

# OR Node (if you have it)
npx serve .
```

Then open `http://localhost:8080`.

---

## Free hosting + custom domain — Karthik's options

### Option 1 — Netlify (recommended for the sales pitch)

**Why:** Easiest for a non-technical client to take over later if needed.
Drag-and-drop deploy, free SSL, free subdomain straight away.

1. Go to [app.netlify.com](https://app.netlify.com), sign up free
2. Drag the entire `dm-plumbing/` folder into the dashboard
3. Done — you'll get a URL like `dm-plumbing-southshields.netlify.app`
4. **Show this link to Dave first.** Free, no domain cost yet.
5. When he says yes, buy the domain and point it across (see below).

To enable the contact form properly, add `data-netlify="true"` to the
`<form>` tag in `index.html` and Netlify auto-handles submissions to
the email of your choice. Free up to 100 submissions/month.

### Option 2 — GitHub Pages + Cloudflare

**Why:** Cheapest long-term, full control, looks professional on your
freelance portfolio.

1. Create a new public GitHub repo (e.g. `dm-plumbing-site`)
2. Push these three files
3. Repo → Settings → Pages → deploy from `main` branch, root folder
4. You get `https://<your-username>.github.io/dm-plumbing-site/`
5. Add the custom domain via Cloudflare (see "Custom domain" below)

### Option 3 — Cloudflare Pages

Same idea as Netlify, but tighter integration with Cloudflare's free DNS,
analytics, and caching. `pages.cloudflare.com` → connect Git or upload
folder.

### Option 4 — Vercel

Also free. Best for if you later want to add a Next.js/React rebuild.
Slightly overkill for a static site this size.

---

## Custom domain (the part Dave actually pays for)

Suggested domain to buy:
- `dmplumbingsouthshields.co.uk` (~£6–10/year on Namecheap / Cloudflare Registrar)
- Backup: `dmplumbing-ne.co.uk` or `dmplumbing.uk`

**Cheapest UK registrars:**
- **Cloudflare Registrar** — at-cost pricing, no markup, free WHOIS privacy
- **Namecheap** — easy interface, ~£8/yr for `.co.uk`
- **123-Reg** — UK-based but more expensive

**Pointing the domain to Netlify (example):**
1. In Netlify → Domain Settings → Add custom domain
2. In your registrar's DNS settings, add a CNAME record pointing to
   `your-site.netlify.app`, plus an A record for the apex (Netlify gives
   you the values to use)
3. Wait 10–60 minutes. SSL is provisioned automatically and free.

---

## Sales pitch playbook (your bit, Karthik)

### Pricing suggestion

For a one-page small business site like this, in the South Shields market:

- **Build fee:** £250–£400 one-off (you've already done the work)
- **Hosting & domain:** £8–10/year domain cost passed on, or bundled
- **Optional monthly retainer:** £10–20/mo for hosting management,
  small content edits, and renewing the domain on his behalf

You're not just selling code, you're selling: *"You'll never have to think
about it. New review comes in? Send it to me. Phone number changes? Send
it to me."* That's worth a small monthly to a non-technical tradesman.

### Outreach sequence

1. **Deploy to Netlify free subdomain first.** Costs you nothing.
2. **Ring Dave directly on 07939 845541.** Tradesmen respond to phone
   calls way better than email or Insta DMs. Quick pitch:

   > "Hi Dave, my name's Karthik — I'm a local web developer. I noticed
   > D&M doesn't have a website and I've already built one for you as a
   > demo, just to show what's possible. No obligation. Can I send you
   > the link to have a quick look on your phone? Takes 30 seconds."

3. **Send the Netlify link by text** straight after the call.
4. **Follow up the next day.** "Did you get a chance to look?"
5. If interested → quote, agree on domain name, point DNS, invoice.

### Things to update before sending

- Confirm with Dave: opening hours, exact service area, whether the
  landline is still active
- Replace placeholder email `hello@dmplumbing.co.uk` in `script.js` with
  Dave's real email once provided
- Get a real photo of Dave or his van for an "About" upgrade later
- Ask if he wants Google Business Profile linked

---

## Things this build deliberately does NOT do

- No CMS — keeps it simple. Edits are just text changes in `index.html`.
- No tracking / cookies — no GDPR cookie banner needed.
- No external JS libraries — fast, no security maintenance.
- No images of stock plumbers — looks generic, looks like every other
  plumber site. The editorial typography does the heavy lifting instead.

---

## Future upgrades (sell as add-ons)

- Real photo gallery of completed jobs (£75 add-on)
- Google Reviews live embed (£50)
- Booking calendar / quote form with backend (£150+)
- Local SEO pack — Google Business Profile setup, schema markup,
  citation listings (£200)

---

Built by Karthik Digital Services.
