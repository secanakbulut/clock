# clock

analog and digital clock you can flip between. built this on a slow weekend.

the analog face is an SVG, hands rotate using the usual angles:
- hour hand: `(hours % 12) * 30 + minutes * 0.5`
- minute hand: `minutes * 6` (with a small per-second nudge)
- second hand: `seconds * 6` plus milliseconds so it sweeps smoothly instead of ticking

the digital readout has a 12h / 24h toggle and a timezone picker with a few cities. timezone math just shifts from local to utc and back to the picked offset.

## how to run it

no build step. just open `index.html` in a browser.

```
git clone https://github.com/secanakbulut/clock.git
cd clock
open index.html
```

## files

- `index.html` markup and the svg face
- `style.css` dark theme
- `script.js` time math, hand rotation, mode toggle, timezone shift

## license

released under PolyForm Noncommercial 1.0.0. fine for personal use, not for selling.
