# Portfolio v3 design notes: "Title Select"
**Japanese techwear × cyberpunk, dark background with neon ice blue, laid out as a console game-select screen**

## Layout
On a desktop or laptop, the whole site is one screen with no page scroll, like a console menu.

```
| FRP // ポートフォリオ  [作品 TITLES] [PROFILE] [CREDITS] [CONTACT]   barcode |
|------------------------------------------------------------------------------|
| FARIS            | 01 |  //// CLW-2024                       ●  | CLW-2024     |
|                  |    |  +------------------------------------+ | CAT LIFE     |
| ファリス…         | C  |  | 仮想ペット   sliced diagonal art      | | WORLD        |
| タイトル選択  13   | A  |  |  ////  ////  ////  ////              | | Year / Role  |
| ▶01 CAT LIFE …   | T  |  |                         [FULL IMAGE] | | 担当 [01]…   |
|  02 INFLUENCER … |    |  +------------------------------------+ | 画面 thumbs  |
|  …13 POTION …    | 仮 |  LEAD PROGRAMMER                barcode | [App Store]  |
|------------------------------------------------------------------------------|
| [◀ 前へ PREV]  01 / 13 CAT LIFE WORLD  [NEXT 次へ ▶]    Arrow keys switch titles |
```

- **Left rail:** identity, then the list of 14 titles (an accessible tablist).
- **Ice band:** the selected title in giant vertical condensed type (from the TANJIRO poster reference), with the number and the katakana genre.
- **Stage:** the game art cut into 7 diagonal slices (from the negative-space slice reference). On every switch the slices slide in, staggered, which is the motion that answers the visitor's click. Clicking a screenshot thumbnail swaps the stage image. "Full image" opens a viewer.
- **Panel:** facts, what I built, screens and store links.
- **Bottom bar:** previous/next. Arrow keys also work.
- **Profile, Credits and Contact** are separate screens in the same frame.
- **On phones and tablets** it becomes one scrolling page:
  - the list turns into a horizontal row of chips
  - the band is horizontal
  - tapping a screenshot opens the viewer
  - prev/next stays fixed at the bottom
- **Deep links:** `#monkey-king`, `#profile` and so on, for linking from applications.

## Tokens
| Token | Value |
|---|---|
| bg | #04070D |
| line | #17344B |
| ice | #6BE4FF |
| text | #E6F3F7 |
| mute | #7E92A3 |
| red | #FF3B47 (sun dot only) |

**Type**
- Archivo variable: 62% width for titles, 75% for labels, 100% for body.
- Zen Kaku Gothic New Bold for small Japanese labels.
- Dela Gothic One for display kanji and katakana.

## Japanese labels (short, literal)
| Japanese | Meaning |
|---|---|
| 作品 | Titles |
| プロフィール | Profile |
| 経歴 | Credits |
| 連絡先 | Contact |
| タイトル選択 | Select title |
| 担当 | What I built |
| 特徴 | Game features |
| 画面 | Screens |
| 前へ / 次へ | Previous / Next |
| 現在 | Now |
| 未発表 | Unreleased |

Genre tags appear once per game. **Potion Permit** has no screenshots in the portfolio, so its stage shows an outlined 薬 ("medicine / potion") instead.

## Avoided on purpose
- Hero-section scroll page
- Rounded cards
- Gradients and glassmorphism
- "Hi, I'm…" heading
- Fade-up on scroll
- "→" on links
