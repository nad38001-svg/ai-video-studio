import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export const maxDuration = 300;

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!process.env.HF_TOKEN) {
      return NextResponse.json(
        { error: "HF_TOKEN is missing." },
        { status: 500 }
      );
    }

    if (!prompt || prompt.trim().length < 5) {
      return NextResponse.json(
        { error: "Please enter a more detailed prompt." },
        { status: 400 }
      );
    }

    const client = new InferenceClient(process.env.HF_TOKEN);

    const finalPrompt = `${prompt.trim()}

Create a polished vertical social-media video.
Keep the main subject visually consistent.
Use cinematic composition, natural lighting,
smooth motion and clear action.
No subtitles unless explicitly requested.`;

    const video = await client.textToVideo(finalPrompt, {
      model: "Lightricks/LTX-Video-0.9.8-13B-distilled",
    });

    if (!video) {
      throw new Error("No video was returned.");
    }

    // Convert returned video into a browser-friendly data URL
    const buffer = Buffer.from(await video.arrayBuffer());
    const base64 = buffer.toString("base64");

    return NextResponse.json({
      video: `data:video/mp4;base64,${base64}`,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Video generation failed.",
      },
      { status: 500 }
    );
  }
}
