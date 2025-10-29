# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Browser-delivered presentation deck for the federated Maximo asset intelligence narrative. Built with Vite and vanilla JavaScript for fast loading and client-side-only execution. The presentation runs entirely in the browser without server dependencies.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview

# Serve static build
npx serve dist
```

## Architecture

### Core Structure

The application follows a simple three-file architecture:

- **`src/slides.js`**: Slide content, section grouping, and visual metadata
  - Uses Vite's `import.meta.glob()` to dynamically load slide images from `src/assets/`
  - Each slide has: `section`, `title`, `line` (main heading), optional `subtitle`, `visual` description, `image`, and `hero` flag
  - Slides are grouped into sections (Opening, The Setup, The Problem, The Solution, Implementation, The Future)

- **`src/main.js`**: Navigation logic, rendering engine, and hash-based routing
  - Keyboard navigation: Arrow keys, Space, Enter, Backspace
  - Click-to-advance on slide background
  - Hash-based deep linking (`#<slide-number>`)
  - Background pulse animation system (20-second intervals)
  - Timeline measurement and CSS custom property injection for active section indicators

- **`src/style.css`**: Visual theme and responsive layout
  - Dark theme with gradient backgrounds and accent color system
  - 16:9 aspect ratio slides with responsive grid layouts
  - Timeline progress indicators with animated active states
  - Split-layout for content + media, hero layout for opening slides
  - Mobile-responsive breakpoints at 900px

### Rendering Flow

1. `renderSlide()` reads current slide from `slides` array
2. Determines section index for timeline state
3. Generates HTML with timeline, header, body (content + media), and footer
4. Injects into `#app` container
5. Schedules timeline measurement via `requestAnimationFrame`
6. Updates URL hash for deep linking
7. Background pulse continues on 20-second timer

### Timeline System

The timeline component uses CSS custom properties dynamically calculated from DOM measurements:
- `--timeline-start-offset`: Left padding to first dot center
- `--timeline-end-offset`: Right padding from last dot center
- `--timeline-active-width`: Width of active progress bar
- `--timeline-right-edge-offset`: Used to align media elements

Measurement happens after fonts load and on window resize to ensure accuracy.

### Image Management

Slide images are stored in `src/assets/` as `slide1.png`, `slide2.png`, etc. Vite's glob import maps them by slide number. If an image is missing, the slide falls back to displaying a "Concept Visual" card with the `visual` description text.

## Modifying Content

To update slide copy or add new slides, edit `src/slides.js`:
- Add/remove slides in the array
- Change section names to reorganize timeline grouping
- Update `line` (main heading), `title` (header), `subtitle`, or `visual` placeholders
- Set `hero: true` for full-width opening/closing slides

To change visual styling or layout, edit `src/style.css`:
- CSS custom properties in `:root` control colors and spacing
- `.slide--hero` and `.slide--with-media` control layout modes
- Timeline styles are in `.timeline` and related classes

## Build Output

`npm run build` creates an optimized static bundle in `dist/`:
- Minified JavaScript and CSS
- Hashed filenames for cache busting
- All assets inlined or copied
- Google Fonts remain as external references (download fonts separately for fully offline use)

The build can be deployed to any static file server, USB drive, or CDN.
