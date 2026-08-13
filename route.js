import Replicate from "replicate";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req) {
  try {
    const { prompt, duration = 8 } = await req.json();

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is missing. Add it to .env.local or your hosting environment." },
        { status: 500 }
      );
    }

    if (!prompt || prompt.trim().length < 5) {
      return NextResponse.json({ error: "Please enter a more detailed prompt." }, { status: 400 });
    }

    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

    const finalPrompt = `${prompt.trim()}

Create a polished vertical social-media video. Keep the main characters visually consistent throughout.
Use clear cinematic composition, expressive motion, natural lighting, readable action, and good pacing.
Generate suitable spoken dialogue/voice and synchronized sound effects or background audio when appropriate.
No subtitles unless the user explicitly asks for them.`;

    const output = await replicate.run("google/veo-3", {
      input: {
        prompt: finalPrompt,
        duration: Number(duration),
        resolution: "1080p",
        aspect_ratio: "9:16",
        generate_audio: true
      }
    });

    const video = typeof output === "string" ? output : output?.url;
    if (!video) throw new Error("The video provider returned no video URL.");

    return NextResponse.json({ video });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message || "Video generation failed." },
      { status: 500 }
    );
  }
}