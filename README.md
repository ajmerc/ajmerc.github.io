# ajmerc.github.io
Personal Website for Avery (AJ) Schwartz

Plain HTML, CSS, and a little vanilla JavaScript. There's no build step: push to `main` and GitHub Pages serves it.

> **Status:** landing-page prototype. The research and illustration pages are stubs until the landing page and wipe transition are signed off.

## Layout

```
index.html               Landing page: name, one-liner, and the Research / Illustration choice
research/index.html      Research side
illustration/index.html  Art side
assets/css/site.css      All styles. Colors and fonts are tokens at the top; each side is a "theme" block.
assets/js/wipe.js        The wipe transition (links with data-wipe="…")
assets/img/              Images (torn-edge.svg is the seam between the two halves)
assets/fonts/            Self-hosted Bricolage Grotesque (open-source license included)
```

## Editing text

Open the HTML file and edit the text between the tags. Comments marked `=====` point to the parts you'll most likely change.

On the landing page, the `<h1>` has a `data-text` attribute. Keep it identical to the heading text, because it draws the pink off-register print on the right half of your name.

## Previewing locally

Run `python3 -m http.server` in this folder and open <http://localhost:8000>.
