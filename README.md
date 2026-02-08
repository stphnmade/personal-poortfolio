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

Current function provider defaults to `memory` for scaffolding and contract testing.
This is not durable storage in production.

### Production provider hookup

When you are ready to connect Netlify + database:

1. Set `NOTES_STORAGE_PROVIDER` in Netlify environment.
2. Replace the provider branches in `netlify/functions/notes.js`:
   - `listNotesFromProvider()`
   - `saveNoteToProvider()`
3. Keep response shape unchanged:
   - `GET /api/notes` -> `{ notes: StoryNote[] }`
   - `POST /api/notes` -> `{ note: StoryNote }`

With that contract, no frontend refactor is needed.
