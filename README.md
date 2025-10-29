# Maximo Edge Intelligence Deck

Browser-delivered presentation for the federated Maximo asset intelligence narrative. The deck is built with Vite and vanilla JavaScript so it launches quickly and runs entirely client-side.

## Running Locally

```bash
npm install
npm run dev
```

The dev server prints a local URL (default `http://localhost:5173`). Open it in the presentation laptop's browser. Use the same commands whenever you need to rehearse or update slides.

## Slide Controls

- Keyboard navigation: `←`/`→`, `↑`/`↓`, `space`, or `enter`
- Click or tap anywhere on the slide background to advance
- Share direct links by appending `#<slide-number>` to the URL (for example `#/8`)

## Build for Offline Use

Create a static bundle in `dist/` that you can host from any static file server or USB drive:

```bash
npm run build
npx serve dist
```

The build keeps Google Fonts references online; download fonts if you need an entirely air-gapped setup.

## Project Structure

- `index.html` – Vite entry point and global metadata
- `src/slides.js` – Slide copy, section labels, and visual cues
- `src/main.js` – Navigation, rendering logic, and hash-based deep links
- `src/style.css` – Visual theme for the deck

Update `src/slides.js` whenever slide copy or placeholders change. Adjust typography and layout in `src/style.css` to match event branding.
