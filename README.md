# ajmerc.github.io
Personal Website for Avery (AJ) Schwartz

Plain HTML, CSS, and a little vanilla JavaScript. There's no build step: push to `main` and GitHub Pages serves it.

> **Status:** landing and research pages are built. The illustration page is waiting on portfolio images.

## Layout

```
index.html               Landing page: name, one-liner, and the Research / Illustration choice
research/index.html      Research side
illustration/index.html  Art side
assets/css/site.css      All styles. Colors and fonts are tokens at the top; each side is a "theme" block.
assets/js/wipe.js        The wipe transition (links with data-wipe="…")
assets/img/              Images (torn-edge.svg is the seam between the two halves)
assets/fonts/            Self-hosted Bricolage Grotesque (open-source license included)
cv.pdf                   CV (replace the file to update it; keep the name)
sitemap.xml, robots.txt  For search engines. Add new pages to sitemap.xml.
```

## Editing text

Open the HTML file and edit the text between the tags. Comments marked `=====` point to the parts you'll most likely change.

On the landing page, the `<h1>` has a `data-text` attribute. Keep it identical to the heading text, because it draws the pink off-register print on the right half of your name.

## Adding a paper, poster, or talk

In `research/index.html`, find the `Papers, posters, and talks` comment. Copy a whole `<li class="pub"> … </li>` block, paste it at the top of the list, and edit the year, authors, title, and venue.

## Adding your profile links

In `research/index.html`, find the `Contact` comment and replace each `[URL]` placeholder with a link. Also add the same URLs to the `"sameAs"` list in the structured-data block at the top of `index.html` and `research/index.html`, so Google connects those profiles to you.

## Previewing locally

Run `python3 -m http.server` in this folder and open <http://localhost:8000>.
