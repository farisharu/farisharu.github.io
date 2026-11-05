# Portfolio website v3: Faris
**Style:** Japanese techwear × cyberpunk, neon ice blue, laid out as a console "title select" screen. Design notes are in `DESIGN.md`.

Older versions are kept in `99_Archive/`:
- v1 "Instruction Manual" (white)
- v2 "Systems Dossier" (dark, scrolling)

## Preview
Double-click `index.html`. It opens in Chrome or Edge and works offline.
- **Desktop:** pick a title on the left, or use the ← → arrow keys.
- **Phone:** swipe the title row, or use Prev and Next at the bottom.

## Live site
**https://farisharu.github.io/** is served by GitHub Pages from the public repo `farisharu/farisharu.github.io`, branch `main`, root folder. It was first published on 6 Nov 2026.

**To update it:** this folder is the repo. Edit the files, then commit and push to `main` (or ask Claude to "publish the site changes"). The live site refreshes 1–2 minutes later.

**Link straight to a game** by adding its id after `#`:
- `https://farisharu.github.io/#monkey-king`
- `#cat-life-world`
- `#profile`, `#credits`, `#contact`

## Common edits
| What | Where |
|---|---|
| Change a game's text | `index.html`. Each game is an `<article class="card">` marked `<!-- 01 -->` … `<!-- 14 -->` |
| Change the stage picture | The `data-art` attribute on that game's `<article>` (square image works best) |
| Add a gameplay video link | Inside the game's `<p class="get">` line, add `<a class="btn" href="https://youtu.be/…">Watch gameplay</a>` |
| Reorder or add a game | Add a list item in `.list` **and** a matching `<article>` with the same id |
| Change the neon colour | `styles.css`, top: `--ice: #6be4ff;` |

## ⚠ If you add new Japanese text
- **Why it matters:** the Japanese fonts only contain the characters already used, to keep the site small. New kanji or katakana will show in a fallback font instead of the styled one.
- **Fix:** ask Claude to "re-subset the Japanese fonts".

## Notes
- **Phone number left out on purpose.** Public pages attract spam.
- **No CV on the site, by choice.** The CV is sent by email only. The front screen shows only "Faris".
- **Screenshot credit.** Game screenshots come from your portfolio PDF and belong to their publishers. A credit line sits on the Contact screen.
- **Fonts.** Archivo, Zen Kaku Gothic New and Dela Gothic One, all under the SIL Open Font License (see `fonts/`).
