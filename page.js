"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(8);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setVideo("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, duration })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setVideo(data.video);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="card">
        <div className="badge">AI VIDEO STUDIO</div>

        <h1>One Prompt → Full Video</h1>

        <p className="sub">
          Video + graphics + AI audio in one generation.
        </p>

        <label>Your idea</label>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Example: "10 second funny video of an orange cat working at an Indian chai shop, cinematic 3D cartoon style, Hindi dialogue, funny sound effects, vertical YouTube Short."'
        />

        <div className="row">
          <div>
            <label>Duration</label>

            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={8}>8 seconds</option>
              <option value={10}>10 seconds</option>
            </select>
          </div>

          <div className="format">
            <label>Format</label>
            <div className="fixed">9:16 Vertical</div>
          </div>
        </div>

        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
        >
          {loading
            ? "Generating… please wait"
            : "✨ Generate Video"}
        </button>

        {error && <div className="error">{error}</div>}

        {video && (
          <section className="result">
            <h2>Your video</h2>

            <video
              src={video}
              controls
              playsInline
            />

            <a
              href={video}
              target="_blank"
              rel="noreferrer"
            >
              Open / save video
            </a>
          </section>
        )}

        <p className="note">
          API usage can cost money. Keep your API key on the server and never
          paste it into browser code.
        </p>
      </div>
    </main>
  );
                }
