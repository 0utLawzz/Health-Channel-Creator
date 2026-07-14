// One-off seed: populates the `episodes` table from the master plan XLSX plus
// exports/production-log.md (for actual build/export status), so the API
// server and publishing dashboard have real data to work with.
import ExcelJS from "exceljs";
import fs from "node:fs";
import path from "node:path";
import { db, episodesTable } from "@workspace/db";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "../..");
const MASTER_SHEET = path.join(
  PROJECT_ROOT,
  "attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx",
);
const PRODUCTION_LOG = path.join(PROJECT_ROOT, "exports/production-log.md");
const EXPORTS_DIR = path.join(PROJECT_ROOT, "exports");

type DbStatus = "draft" | "complete" | "review" | "approved" | "scheduled" | "published";

function parseProductionLog(): Map<number, { dateCompleted: string | null }> {
  const content = fs.readFileSync(PRODUCTION_LOG, "utf8");
  const map = new Map<number, { dateCompleted: string | null }>();
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|") || trimmed.includes("Episode #") || trimmed.startsWith("|---")) {
      continue;
    }
    const match = trimmed.match(
      /^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|\s*(.+?)\s*\|$/,
    );
    if (!match) continue;
    const [, numStr, , , dateCompleted] = match;
    const number = parseInt(numStr, 10);
    if (Number.isNaN(number)) continue;
    map.set(number, {
      dateCompleted: dateCompleted.trim() === "—" ? null : dateCompleted.trim(),
    });
  }
  return map;
}

function hasExportedVideo(epNumber: number): boolean {
  const padded = String(epNumber).padStart(2, "0");
  if (!fs.existsSync(EXPORTS_DIR)) return false;
  const folder = fs.readdirSync(EXPORTS_DIR).find((f) => f.startsWith(`Episode-${padded}-`));
  if (!folder) return false;
  return fs.existsSync(path.join(EXPORTS_DIR, folder, "episode.mp4"));
}

function normalizePostDate(raw: string): string {
  // "Mon, Jul 13, 2026" -> "2026-07-13"
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toISOString().slice(0, 10);
}

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MASTER_SHEET);
  const ws = wb.getWorksheet("Content_Master");
  if (!ws) throw new Error("Content_Master sheet not found");

  const logStatuses = parseProductionLog();

  const rows: (typeof episodesTable.$inferInsert)[] = [];

  ws.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // header
    const epNumber = Number(row.getCell(1).value);
    if (!epNumber || Number.isNaN(epNumber)) return;

    const postDateRaw = String(row.getCell(3).value ?? "");
    const season = String(row.getCell(4).value ?? "");
    const hookTitle = String(row.getCell(5).value ?? "");
    const youtubeTitle = String(row.getCell(6).value ?? "");
    const voScript = String(row.getCell(7).value ?? "");
    const visualDirection = String(row.getCell(8).value ?? "");
    const hashtags = String(row.getCell(11).value ?? "");
    const ctaPrompt = String(row.getCell(12).value ?? "");
    const thumbnailPrompt = String(row.getCell(13).value ?? "");

    const exported = hasExportedVideo(epNumber);
    const status: DbStatus = exported ? "complete" : "draft";
    const dateBuilt = logStatuses.get(epNumber)?.dateCompleted ?? null;

    rows.push({
      epNumber,
      status,
      dateBuilt,
      postDate: postDateRaw ? normalizePostDate(postDateRaw) : "",
      season,
      aspectRatio: "9:16",
      duration: "~35-60s",
      hookTitle,
      youtubeTitle,
      voScript,
      visualDirection,
      bgSound: "Background music + scene SFX",
      thumbnailPrompt,
      citationCta: ctaPrompt,
      hashtags,
    });
  });

  if (rows.length === 0) throw new Error("No episode rows parsed from master sheet");

  const existing = await db.select({ epNumber: episodesTable.epNumber }).from(episodesTable);
  if (existing.length > 0) {
    console.log(`episodes table already has ${existing.length} rows — skipping seed.`);
    process.exit(0);
  }

  await db.insert(episodesTable).values(rows);
  console.log(`Seeded ${rows.length} episodes.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
