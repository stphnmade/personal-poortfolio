# personal-poortfolio
My personal portfolio project

## Notes Storage (Netlify-ready)

Sky notes are implemented with a storage adapter in `src/app/services/storyNotes.ts`.

### Modes

- `VITE_NOTES_STORAGE_MODE=auto` (default)
  - tries `/api/notes` first
  - falls back to browser `localStorage` if API is unavailable
- `VITE_NOTES_STORAGE_MODE=local`
  - stores only in browser `localStorage`
- `VITE_NOTES_STORAGE_MODE=remote`
  - requires `/api/notes` to be available

### Netlify Function

- API endpoint: `/api/notes`
- Function file: `netlify/functions/notes.js`
- Redirect config: `netlify.toml`
- Provider:
  - `NOTES_STORAGE_PROVIDER=neon` (recommended on Netlify)
  - uses `NETLIFY_DATABASE_URL` automatically with `@netlify/neon`

Current provider auto-selects:
- `neon` when `NETLIFY_DATABASE_URL` is present
- otherwise `memory` for local scaffolding

`memory` is not durable storage in production.

### Production provider hookup

For Netlify + Neon:

1. Add dependency:
   - `npm install @netlify/neon`
2. Set env vars in Netlify:
   - `NOTES_STORAGE_PROVIDER=neon`
   - `NETLIFY_DATABASE_URL` (from Netlify DB)
3. Deploy. Function auto-creates table `community_notes`.
4. Response shape stays:
   - `GET /api/notes` -> `{ notes: StoryNote[] }`
   - `POST /api/notes` -> `{ note: StoryNote }`

With that contract, no frontend refactor is needed.
