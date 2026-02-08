const MAX_MESSAGE_LENGTH = 500
const MAX_AUTHOR_LENGTH = 80
const PROVIDER = process.env.NOTES_STORAGE_PROVIDER || 'memory'

/**
 * Temporary in-memory store.
 * Works for testing only, does not persist across cold starts/deploys.
 */
const memoryNotes = []

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  }
}

function makeId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function normalizeNote(input) {
  const message = String(input?.message ?? '').trim()
  if (!message) return null

  const author = String(input?.author ?? '').trim()
  const safeMessage = message.slice(0, MAX_MESSAGE_LENGTH)
  const safeAuthor = author.slice(0, MAX_AUTHOR_LENGTH)

  return {
    id: String(input?.id ?? makeId()),
    message: safeMessage,
    author: safeAuthor,
    createdAt: String(input?.createdAt ?? new Date().toISOString()),
  }
}

async function listNotesFromProvider() {
  if (PROVIDER === 'memory') {
    return [...memoryNotes].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  }

  /**
   * TODO: provider adapter
   * Replace this branch with your DB reads for Netlify production.
   * Keep the same return shape: Array<{id,message,author,createdAt}>.
   */
  throw new Error(`Unsupported NOTES_STORAGE_PROVIDER: ${PROVIDER}`)
}

async function saveNoteToProvider(note) {
  if (PROVIDER === 'memory') {
    const exists = memoryNotes.some((entry) => entry.id === note.id)
    if (!exists) {
      memoryNotes.push(note)
    }
    return note
  }

  /**
   * TODO: provider adapter
   * Replace this branch with your DB insert/upsert for Netlify production.
   * Return the saved note object.
   */
  throw new Error(`Unsupported NOTES_STORAGE_PROVIDER: ${PROVIDER}`)
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        Allow: 'GET,POST,OPTIONS',
      },
    }
  }

  try {
    if (event.httpMethod === 'GET') {
      const notes = await listNotesFromProvider()
      return json(200, { notes, source: PROVIDER })
    }

    if (event.httpMethod === 'POST') {
      const body = event.body ? JSON.parse(event.body) : {}
      const normalized = normalizeNote(body)
      if (!normalized) {
        return json(400, { error: 'message is required' })
      }
      const saved = await saveNoteToProvider(normalized)
      return json(201, { note: saved, source: PROVIDER })
    }

    return json(405, { error: 'Method not allowed' })
  } catch (error) {
    return json(500, {
      error: 'notes_api_error',
      detail: error instanceof Error ? error.message : 'unknown_error',
    })
  }
}
