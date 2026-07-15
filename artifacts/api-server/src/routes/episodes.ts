import { Router } from "express";
import { eq, and, asc, sql } from "drizzle-orm";
import { db, episodesTable } from "@workspace/db";
import {
  ListEpisodesQueryParams,
  UpdateEpisodeBody,
  GetEpisodeParams,
  UpdateEpisodeParams,
  ApproveEpisodeParams,
} from "@workspace/api-zod";

// The valid set of episode status strings (mirrors the Drizzle pgEnum)
type EpisodeStatusValue =
  | "draft"
  | "complete"
  | "review"
  | "approved"
  | "scheduled"
  | "published";

const router = Router();

// GET /episodes
router.get("/episodes", async (req, res): Promise<void> => {
  const parsed = ListEpisodesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { status, season } = parsed.data;

  const conditions = [];
  // status is already validated by Zod as a known enum value
  if (status) conditions.push(eq(episodesTable.status, status as EpisodeStatusValue));
  if (season) conditions.push(eq(episodesTable.season, season));

  const episodes = await db
    .select()
    .from(episodesTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(episodesTable.epNumber));

  res.json(episodes);
});

// GET /episodes/stats
router.get("/episodes/stats", async (req, res): Promise<void> => {
  const all = await db.select().from(episodesTable);

  const byStatus = {
    draft: 0,
    complete: 0,
    review: 0,
    approved: 0,
    scheduled: 0,
    published: 0,
  };

  for (const ep of all) {
    if (ep.status in byStatus) {
      byStatus[ep.status as keyof typeof byStatus]++;
    }
  }

  const now = new Date();
  const thisMonthPublished = all.filter((ep) => {
    if (!ep.publishedAt) return false;
    const d = new Date(ep.publishedAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const upcoming = all
    .filter((ep) => ep.status !== "published")
    .map((ep) => ep.postDate)
    .sort()[0] ?? null;

  res.json({
    total: all.length,
    byStatus,
    nextPostDate: upcoming,
    publishedThisMonth: thisMonthPublished,
  });
});

// GET /episodes/upcoming
router.get("/episodes/upcoming", async (req, res): Promise<void> => {
  const all = await db
    .select()
    .from(episodesTable)
    .where(
      sql`${episodesTable.status} NOT IN ('published')`
    )
    .orderBy(asc(episodesTable.epNumber))
    .limit(5);

  res.json(all);
});

// GET /episodes/:id
router.get("/episodes/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = GetEpisodeParams.safeParse({ id });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [episode] = await db
    .select()
    .from(episodesTable)
    .where(eq(episodesTable.id, id));

  if (!episode) {
    res.status(404).json({ error: "Episode not found" });
    return;
  }

  res.json(episode);
});

// PATCH /episodes/:id
router.patch("/episodes/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const paramParsed = UpdateEpisodeParams.safeParse({ id });
  if (!paramParsed.success) {
    res.status(400).json({ error: paramParsed.error.message });
    return;
  }

  const bodyParsed = UpdateEpisodeBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const { status, youtubeTitle, citationCta, hashtags, scheduledPublishAt } = bodyParsed.data;

  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (status !== undefined) updateData.status = status;
  if (youtubeTitle !== undefined) updateData.youtubeTitle = youtubeTitle;
  if (citationCta !== undefined) updateData.citationCta = citationCta;
  if (hashtags !== undefined) updateData.hashtags = hashtags;
  if (scheduledPublishAt !== undefined) {
    updateData.scheduledPublishAt = scheduledPublishAt ? new Date(scheduledPublishAt) : null;
  }

  const [updated] = await db
    .update(episodesTable)
    .set(updateData)
    .where(eq(episodesTable.id, id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Episode not found" });
    return;
  }

  res.json(updated);
});

// POST /episodes/:id/approve
router.post("/episodes/:id/approve", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const parsed = ApproveEpisodeParams.safeParse({ id });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [episode] = await db
    .select()
    .from(episodesTable)
    .where(eq(episodesTable.id, id));

  if (!episode) {
    res.status(404).json({ error: "Episode not found" });
    return;
  }

  const [updated] = await db
    .update(episodesTable)
    .set({ status: "approved", approvedAt: new Date(), updatedAt: new Date() })
    .where(eq(episodesTable.id, id))
    .returning();

  res.json(updated);
});

export default router;
