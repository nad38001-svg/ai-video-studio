
"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(8);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");
    setVideo("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          duration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Video generation failed.");
      }

      setVideo(data.video || data.url || "");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "white",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          AI Video Studio
        </h1>

        <p style={{ color: "#aaa", marginBottom: "30px" }}>
          Create videos from your ideas with AI.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the video you want to create..."
          rows={6}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#15151b",
            color: "white",
            fontSize: "16px",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <div style={{ marginTop: "20px" }}>
          <label>Duration: {duration} seconds</label>

          <input
            type="range"
            min="4"
            max="12"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: "100%", marginTop: "10px" }}
          />
        </div>

        <button
          onClick={generate}
          disabled={loading}
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            background: "white",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Video"}
        </button>

        {error && (
          <p style={{ color: "#ff6b6b", marginTop: "20px" }}>
            {error}
          </p>
        )}

        {video && (
          <div style={{ marginTop: "30px" }}>
            <h2>Your Video</h2>
            <video
              src={video}
              controls
              style={{
                width: "100%",
                borderRadius: "12px",
                marginTop: "10px",
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
