export interface StoryNote {
  id: string
  message: string
  author: string
  createdAt: string
}

type NotesStorageMode = 'auto' | 'local' | 'remote'

interface NotesListResponse {
  notes: StoryNote[]
}

interface NoteCreateResponse {
  note: StoryNote
}

const STORAGE_MODE: NotesStorageMode =
  (import.meta.env.VITE_NOTES_STORAGE_MODE as NotesStorageMode | undefined) ??
  'auto'
const LOCAL_STORAGE_KEY = 'portfolio-sky-notes-v1'
const REMOTE_ENDPOINT = '/api/notes'
const REQUEST_TIMEOUT_MS = 3500

function normalizeNote(note: Partial<StoryNote>): StoryNote | null {
  const message = String(note.message ?? '').trim()
  if (!message) return null

  return {
    id: String(note.id ?? crypto.randomUUID()),
    message,
    author: String(note.author ?? '').trim(),
    createdAt: String(note.createdAt ?? new Date().toISOString()),
  }
}

function sortNotes(notes: StoryNote[]): StoryNote[] {
  return [...notes].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

function readLocalNotes(): StoryNote[] {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const normalized = parsed
      .map((entry) => normalizeNote(entry))
      .filter((entry): entry is StoryNote => entry !== null)
    return sortNotes(normalized)
  } catch {
    return []
  }
}

function writeLocalNotes(notes: StoryNote[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortNotes(notes)))
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    window.clearTimeout(timeout)
  }
}

async function listRemoteNotes(): Promise<StoryNote[]> {
  const response = await fetchWithTimeout(REMOTE_ENDPOINT, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`Notes GET failed with status ${response.status}`)
  }
  const data = (await response.json()) as NotesListResponse
  const normalized = (data.notes ?? [])
    .map((entry) => normalizeNote(entry))
    .filter((entry): entry is StoryNote => entry !== null)
  return sortNotes(normalized)
}

async function createRemoteNote(note: StoryNote): Promise<StoryNote> {
  const response = await fetchWithTimeout(REMOTE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(note),
  })
  if (!response.ok) {
    throw new Error(`Notes POST failed with status ${response.status}`)
  }
  const data = (await response.json()) as NoteCreateResponse
  const normalized = normalizeNote(data.note ?? note)
  if (!normalized) return note
  return normalized
}

export async function loadNotes(): Promise<StoryNote[]> {
  if (STORAGE_MODE === 'local') {
    return readLocalNotes()
  }

  if (STORAGE_MODE === 'remote') {
    const remoteNotes = await listRemoteNotes()
    writeLocalNotes(remoteNotes)
    return remoteNotes
  }

  try {
    const remoteNotes = await listRemoteNotes()
    writeLocalNotes(remoteNotes)
    return remoteNotes
  } catch {
    return readLocalNotes()
  }
}

export async function saveNote(note: StoryNote): Promise<StoryNote> {
  const normalized = normalizeNote(note)
  if (!normalized) {
    throw new Error('Cannot save empty note')
  }

  if (STORAGE_MODE === 'local') {
    const localNotes = readLocalNotes()
    writeLocalNotes([...localNotes, normalized])
    return normalized
  }

  if (STORAGE_MODE === 'remote') {
    const persisted = await createRemoteNote(normalized)
    const localNotes = readLocalNotes().filter((item) => item.id !== normalized.id)
    writeLocalNotes([...localNotes, persisted])
    return persisted
  }

  try {
    const persisted = await createRemoteNote(normalized)
    const localNotes = readLocalNotes().filter((item) => item.id !== normalized.id)
    writeLocalNotes([...localNotes, persisted])
    return persisted
  } catch {
    const localNotes = readLocalNotes()
    writeLocalNotes([...localNotes, normalized])
    return normalized
  }
}
