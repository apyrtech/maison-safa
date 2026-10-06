# Maison Safa

Atelier site for Maison Safa — thobes, abayas, and koofis. Browse the house, the shop, and a piece, then hold a few in the bag.

This is a **React** app (TypeScript, [TanStack Start](https://tanstack.com/start), Tailwind). It is not a single HTML file you can drop onto a basic file host. Publishing it means building it and serving the result, usually on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Open the address printed in the terminal.

## Put a live demo on your site

The simplest path is [Vercel](https://vercel.com) (free tier is enough):

1. Import this GitHub repository.
2. Leave the build command as `npm run build`.
3. Deploy. You get a public URL such as `https://maison-safa.vercel.app`.

From your existing website, either:

- link to that URL (“View the collection”), or
- embed it with an iframe:

```html
<iframe
  src="https://YOUR-VERCEL-URL"
  title="Maison Safa"
  style="width: 100%; height: 100vh; border: 0"
></iframe>
```

A custom subdomain (`demo.yoursite.com`) can point at the same Vercel project in the project’s domain settings.

Netlify and similar hosts also work if they can run a Node build. A plain HTML upload (cPanel “public_html”, GitHub Pages without a build) will not, because the shop is a small web application, not one static page.
