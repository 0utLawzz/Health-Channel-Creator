import React, { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { Loader2, Upload, ArrowLeft, FileText, X } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { customFetch } from "@workspace/api-client-react";

const SEASONS = [
  "S1: Morning Habits",
  "S2: Movement & Body",
  "S3: Sleep & Recovery",
  "S4: Stress & Mind",
  "S5: Nutrition & Myths",
  "S6: Healthy Aging & Longevity",
];

const DURATIONS = ["30s", "45s", "60s", "90s"];

const DEFAULT_FORM = {
  epNumber: "",
  postDate: "",
  season: SEASONS[0],
  duration: "60s",
  hookTitle: "",
  youtubeTitle: "",
  voScript: "",
  visualDirection: "",
  // NOTE: bgSound removed from UI intentionally — audio/sound is for reel generation only. DO NOT add it back here.
  thumbnailPrompt: "",
  citationCta: "",
  ctaComment: "",
  hashtags: "",
  aspectRatio: "9:16",
};

type FormState = typeof DEFAULT_FORM;

type UploadEpisode = Partial<{
  epNumber: number | string;
  postDate: string;
  season: string;
  duration: string;
  hookTitle: string;
  youtubeTitle: string;
  voScript: string;
  visualDirection: string;
  thumbnailPrompt: string;
  citationCta: string;
  ctaComment: string;
  hashtags: string;
  aspectRatio: string;
}>;

export default function NewEpisode() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function applyUpload(data: UploadEpisode) {
    setForm((prev) => ({
      ...prev,
      epNumber: data.epNumber !== undefined ? String(data.epNumber) : prev.epNumber,
      postDate: data.postDate ?? prev.postDate,
      season: data.season ?? prev.season,
      duration: data.duration ?? prev.duration,
      hookTitle: data.hookTitle ?? prev.hookTitle,
      youtubeTitle: data.youtubeTitle ?? prev.youtubeTitle,
      voScript: data.voScript ?? prev.voScript,
      visualDirection: data.visualDirection ?? prev.visualDirection,
      thumbnailPrompt: data.thumbnailPrompt ?? prev.thumbnailPrompt,
      citationCta: data.citationCta ?? prev.citationCta,
      ctaComment: data.ctaComment ?? prev.ctaComment,
      hashtags: data.hashtags ?? prev.hashtags,
      aspectRatio: data.aspectRatio ?? prev.aspectRatio,
    }));
  }

  const parseFile = useCallback(async (file: File) => {
    setError(null);
    const text = await file.text();
    const ext = file.name.split(".").pop()?.toLowerCase();
    let data: UploadEpisode = {};
    try {
      if (ext === "json") {
        data = JSON.parse(text) as UploadEpisode;
      } else if (ext === "md" || ext === "txt") {
        // Try to extract a JSON block from markdown, or treat whole file as JSON if it starts with "{".
        const trimmed = text.trim();
        const jsonBlock = trimmed.match(/```(?:json)?\n?([\s\S]*?)```/);
        const payload = jsonBlock?.[1]?.trim() ?? trimmed;
        if (payload.startsWith("{")) {
          data = JSON.parse(payload) as UploadEpisode;
        } else {
          // Fallback: assume markdown headers and treat voScript as body.
          data = parseMarkdownFields(text);
        }
      } else {
        throw new Error("Unsupported file type. Use .md, .txt, or .json.");
      }
      applyUpload(data);
      setUploadedFileName(file.name);
    } catch (e: any) {
      setError(e?.message ?? "Failed to parse uploaded file");
      setUploadedFileName(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) parseFile(file);
    },
    [parseFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) parseFile(file);
      e.target.value = "";
    },
    [parseFile]
  );

  function clearUpload() {
    setUploadedFileName(null);
  }

  async function handleSave() {
    const epNum = parseInt(form.epNumber, 10);
    if (isNaN(epNum) || epNum <= 0) {
      setError("Episode number must be a positive integer");
      return;
    }
    if (!form.postDate || !form.hookTitle || !form.voScript) {
      setError("Post date, hook title, and VO script are required");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const created = await customFetch<{ id: number }>("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          epNumber: epNum,
          postDate: form.postDate,
          season: form.season,
          duration: form.duration,
          hookTitle: form.hookTitle,
          youtubeTitle: form.youtubeTitle || form.hookTitle,
          voScript: form.voScript,
          visualDirection: form.visualDirection,
          thumbnailPrompt: form.thumbnailPrompt,
          citationCta: [form.citationCta, form.ctaComment].filter(Boolean).join(" "),
          hashtags: form.hashtags,
          aspectRatio: form.aspectRatio,
        }),
      });
      navigate(`/episodes/${created.id}`);
    } catch (e: any) {
      setError(e?.message ?? "Failed to create episode");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#EDEAE0] pb-20">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-mono text-xs font-bold text-[#555] hover:text-[#0C0C0C] uppercase"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div className="h-[2px] bg-[#0C0C0C] flex-1" />
          <div className="font-mono text-xs font-bold px-3 py-1 border-[2px] border-[#0C0C0C] bg-[#C9A800] text-[#0C0C0C] uppercase">
            New Episode
          </div>
        </div>

        <h1 className="font-display text-5xl text-[#0C0C0C] uppercase mb-2">New Episode</h1>
        <p className="font-mono text-xs text-[#555] uppercase mb-8 max-w-2xl">
          Fill the form directly, or upload an existing script file (.md / .txt / .json) to pre-fill it. Either way, this enters the building pipeline at stage “script_ready.”
        </p>

        {error && (
          <div className="bg-[#FFE8E8] border-[2px] border-[#C94A00] text-[#C94A00] font-mono text-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Upload drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`mb-8 border-[3px] p-8 transition-all ${
            dragOver
              ? "border-[#C9A800] bg-[#F5F2E8] shadow-[5px_5px_0_#C9A800]"
              : "border-[#0C0C0C] bg-[#FAF7EE] shadow-[5px_5px_0_#0C0C0C]"
          }`}
        >
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 bg-[#0C0C0C] flex items-center justify-center shrink-0">
              <Upload size={28} className="text-[#C9A800]" />
            </div>
            <div className="flex-1">
              <p className="font-mono text-xs font-bold text-[#0C0C0C] uppercase mb-2">
                Option A — Upload a script file
              </p>
              <p className="font-mono text-xs text-[#555] leading-relaxed mb-4">
                Drag & drop a .md, .txt, or .json file here, or click to browse. If the file matches the BioMinute episode structure, we’ll auto-fill the form below. You can still edit everything before saving.
              </p>
              <label className="inline-flex items-center gap-2 font-mono text-xs font-bold px-4 py-2 border-[2px] border-[#0C0C0C] bg-[#C9A800] text-[#0C0C0C] shadow-[3px_3px_0_#0C0C0C] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase cursor-pointer">
                <FileText size={13} /> Choose file
                <input type="file" accept=".md,.txt,.json" className="hidden" onChange={handleFileInput} />
              </label>
              {uploadedFileName && (
                <div className="mt-3 inline-flex items-center gap-2 font-mono text-xs bg-[#0C0C0C] text-[#FAF7EE] px-3 py-1.5">
                  <span className="text-[#C9A800]">✓</span> {uploadedFileName}
                  <button onClick={clearUpload} className="ml-1 hover:text-[#C9A800]">
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] bg-[#0C0C0C] flex-1" />
          <span className="font-mono text-xs font-bold text-[#0C0C0C] uppercase">Option B — Type directly</span>
          <div className="h-[2px] bg-[#0C0C0C] flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Episode Number */}
          <Field label="Episode Number" required>
            <input
              type="number"
              min={1}
              value={form.epNumber}
              onChange={(e) => set("epNumber", e.target.value)}
              className={INPUT}
              placeholder="e.g. 37"
            />
          </Field>

          {/* Post Date */}
          <Field label="Post Date" required>
            <input
              type="date"
              value={form.postDate}
              onChange={(e) => set("postDate", e.target.value)}
              className={INPUT}
            />
          </Field>

          {/* Season */}
          <Field label="Season" required>
            <select value={form.season} onChange={(e) => set("season", e.target.value)} className={INPUT}>
              {SEASONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          {/* Duration target */}
          <Field label="Duration Target" required>
            <select value={form.duration} onChange={(e) => set("duration", e.target.value)} className={INPUT}>
              {DURATIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          {/* Hook Title */}
          <Field label="Topic / Hook Title" required className="md:col-span-2">
            <input
              type="text"
              value={form.hookTitle}
              onChange={(e) => set("hookTitle", e.target.value)}
              className={INPUT}
              placeholder="The truth about X nobody tells you"
            />
          </Field>

          {/* YouTube Title */}
          <Field label="YouTube Title" className="md:col-span-2">
            <input
              type="text"
              value={form.youtubeTitle}
              onChange={(e) => set("youtubeTitle", e.target.value)}
              className={INPUT}
              placeholder="Auto-filled from hook title if empty"
            />
          </Field>

          {/* VO Script */}
          <Field label="VO Script" required className="md:col-span-2">
            <textarea
              rows={12}
              value={form.voScript}
              onChange={(e) => set("voScript", e.target.value)}
              className={`${INPUT} resize-y`}
              placeholder="[HOOK — 0:00-0:05]&#10;Your hook line here…"
            />
          </Field>

          {/* Visual Direction */}
          <Field label="Visual Direction" className="md:col-span-2">
            <textarea
              rows={5}
              value={form.visualDirection}
              onChange={(e) => set("visualDirection", e.target.value)}
              className={`${INPUT} resize-y`}
              placeholder="Describe the visual style, colors, and key imagery for the editor…"
            />
          </Field>

          {/* Thumbnail Prompt */}
          <Field label="Thumbnail Prompt" className="md:col-span-2">
            <textarea
              rows={3}
              value={form.thumbnailPrompt}
              onChange={(e) => set("thumbnailPrompt", e.target.value)}
              className={`${INPUT} resize-y`}
              placeholder="AI image generation prompt for thumbnail…"
            />
          </Field>

          {/* Aspect Ratio */}
          <Field label="Aspect Ratio">
            <select value={form.aspectRatio} onChange={(e) => set("aspectRatio", e.target.value)} className={INPUT}>
              <option value="9:16">9:16 (Vertical / Shorts)</option>
              <option value="16:9">16:9 (Landscape)</option>
              <option value="1:1">1:1 (Square)</option>
            </select>
          </Field>

          {/* Citation */}
          <Field label="Citation / Source" className="md:col-span-2">
            <input
              type="text"
              value={form.citationCta}
              onChange={(e) => set("citationCta", e.target.value)}
              className={INPUT}
              placeholder="Source reference and safety disclaimer"
            />
          </Field>

          {/* CTA / Comment Prompt */}
          <Field label="CTA / Comment Prompt" className="md:col-span-2">
            <input
              type="text"
              value={form.ctaComment}
              onChange={(e) => set("ctaComment", e.target.value)}
              className={INPUT}
              placeholder="Drop a ✓ in the comments if you’ll try this…"
            />
          </Field>

          {/* Hashtags */}
          <Field label="Hashtags" className="md:col-span-2">
            <input
              type="text"
              value={form.hashtags}
              onChange={(e) => set("hashtags", e.target.value)}
              className={INPUT}
              placeholder="#BioMinute #HealthScience …"
            />
          </Field>
        </div>

        {/* Save */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() => navigate("/")}
            className="font-mono text-xs font-bold px-6 py-3 border-[2px] border-[#0C0C0C] bg-[#FAF7EE] shadow-[3px_3px_0_#0C0C0C] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 font-mono text-xs font-bold px-8 py-3 border-[2px] border-[#0C0C0C] bg-[#C9A800] text-[#0C0C0C] shadow-[3px_3px_0_#0C0C0C] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
            {saving ? "Saving…" : "Save & Enter Pipeline"}
          </button>
        </div>
      </main>
    </div>
  );
}

const INPUT = "w-full bg-white border-[2px] border-[#0C0C0C] font-mono text-sm px-3 py-2 focus:border-[#C9A800] outline-none";

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block font-mono text-xs font-bold text-[#555] uppercase mb-1.5">
        {label} {required && <span className="text-[#C94A00]">*</span>}
      </label>
      {children}
    </div>
  );
}

function parseMarkdownFields(text: string): UploadEpisode {
  const data: UploadEpisode = {};
  const lines = text.split("\n");
  let currentKey: keyof UploadEpisode | null = null;
  const buffer: Record<string, string[]> = {};

  const keyMap: Record<string, keyof UploadEpisode> = {
    "episode number": "epNumber",
    "post date": "postDate",
    season: "season",
    duration: "duration",
    "topic / hook title": "hookTitle",
    "hook title": "hookTitle",
    "topic": "hookTitle",
    "youtube title": "youtubeTitle",
    "vo script": "voScript",
    "script": "voScript",
    "visual direction": "visualDirection",
    "thumbnail prompt": "thumbnailPrompt",
    "citation / source": "citationCta",
    citation: "citationCta",
    "cta / comment prompt": "ctaComment",
    cta: "ctaComment",
    hashtags: "hashtags",
    "aspect ratio": "aspectRatio",
  };

  for (const line of lines) {
    const headerMatch = line.match(/^#+\s*(.+)$/i);
    if (headerMatch) {
      const header = headerMatch[1].trim().toLowerCase().replace(/[:*]/g, "");
      currentKey = keyMap[header] ?? null;
      if (currentKey) buffer[currentKey] = [];
      continue;
    }
    if (currentKey && line.trim() !== "---") {
      buffer[currentKey].push(line);
    }
  }

  for (const [key, value] of Object.entries(buffer)) {
    const clean = value.join("\n").trim();
    if (clean) data[key as keyof UploadEpisode] = clean;
  }
  return data;
}
