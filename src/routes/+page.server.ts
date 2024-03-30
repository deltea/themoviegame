import type { PageServerLoad } from "./$types";
import { KV_REST_API_TOKEN, KV_REST_API_URL } from "$env/static/private";
import { createClient } from "@vercel/kv";

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

const zrange_opts = {
  withScores: true,
  rev: true,
}

export const load = (async () => {
  return {
    budget_mode_leaderboard: await kv.zrange("budget_leaderboard", 0, 10, zrange_opts),
    rating_mode_leaderboard: await kv.zrange("rating_leaderboard", 0, 10, zrange_opts),
    time_mode_leaderboard: await kv.zrange("time_leaderboard", 0, 10, zrange_opts),
  }
}) satisfies PageServerLoad;
