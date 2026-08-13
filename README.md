# AI Video Studio

A simple Next.js website that turns one prompt into a vertical AI video with generated audio.

## What it uses

- Next.js for the website/backend.
- Replicate API.
- Google Veo 3 for video generation with audio.

Replicate's current Veo 3 API supports prompt, duration, 9:16 aspect ratio, 1080p resolution, and generated audio.

## Run

1. Install Node.js 20.9+.
2. Open this folder in a terminal.
3. Run:
   npm install
   npm run dev
4. Copy `.env.example` to `.env.local`.
5. Put your Replicate API token in `.env.local`:
   REPLICATE_API_TOKEN=...
6. Open http://localhost:3000

## Deploy

Push this project to GitHub and import it into Vercel. Add `REPLICATE_API_TOKEN` in the Vercel project environment variables, then deploy.

## Important

The API key stays server-side. Do not put it in `NEXT_PUBLIC_...` variables.

Video generation is not free; the provider charges according to its current pricing. Start with short tests.
