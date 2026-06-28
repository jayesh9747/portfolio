# Project screenshots

Drop real screenshots here and they'll appear automatically on the project
cards + case-study modals (replacing the live preview / gradient fallback).

Expected filenames (already wired in `src/lib/data.ts` via the `shot` field):

| File | Project | Currently |
|------|---------|-----------|
| `wxw.png`          | Delivery Delight    | gradient fallback — **needs your screenshot** |
| `mountaintop.png`  | PepsiCo · MountainTop | gradient fallback — **needs your screenshot** |
| `intelligize.png`  | Intelligize+ AI     | live screenshot (optional override) |
| `visalay.png`      | Visalay             | live screenshot (optional override) |
| `yellowschool.png` | Yellow School       | live screenshot (optional override) |

**Tips**
- Use a wide shot (~1600×1000) for the sharpest result.
- PNG or JPG both work. If you use `.jpg`, update the path in `data.ts`.
- To override a live preview with your own image, set
  `shot: "/projects/<id>.png"` on that project in `src/lib/data.ts`.
