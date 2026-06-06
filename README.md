# dj-bot

An AI-powered local DJ station running on a Raspberry Pi 5. dj-bot generates dynamic voice introductions for songs using a local LLM and text-to-speech, creating a seamless, personalized listening experience — entirely offline.

## How It Works

```
Song queue → Script generation (Ollama) → TTS (Kokoro) → Seamless song playback
```

Each song in the queue gets an AI-generated intro script personalized with user info, read aloud by Kokoro TTS, then transitions smoothly into the track.

## Tech Stack

### Backend
- **FastAPI** — REST API and queue/playback orchestration
- **Ollama** — local LLM for DJ script generation
- **Kokoro** — local TTS for AI voice output
- **Supabase** — song library and user profile storage

### Frontend
- **React + TypeScript + Vite** — kiosk-mode display (non-interactive, v0)
- **Tailwind CSS + shadcn/ui** — UI styling

### Infrastructure
- **Raspberry Pi 5** — target deployment hardware (fully local, no cloud)
- **Docker Compose** — service orchestration
- **PostgreSQL** — local relational DB

## v0 Scope

- Song queue management
- AI script generation per song via Ollama
- Kokoro TTS audio generation and playback
- Seamless transitions between intro audio and song
- Ambient kiosk frontend display with simple animations
- Song library and user info stored in Supabase

## Development

Backend docs: [backend/README.md](./backend/README.md)

Frontend docs: [frontend/README.md](./frontend/README.md)

General development: [development.md](./development.md)

Deployment: [deployment.md](./deployment.md)

Template reference: [fullstack-api-template.md](./fullstack-api-template.md)

## License

MIT
