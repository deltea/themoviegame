import { KV_REST_API_TOKEN, KV_REST_API_URL } from "$env/static/private";
import { createClient } from "@vercel/kv";
import { formatLeaderboard, type Leaderboards } from "$lib/utils";
import { json, type RequestHandler } from "@sveltejs/kit";

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

const zrange_opts = {
  withScores: true,
  rev: true,
}

export const GET: RequestHandler = async () => {
  const budget_leaderboard = await kv.zrange("budget_leaderboard", 0, 10, zrange_opts);
  const rating_leaderboard = await kv.zrange("rating_leaderboard", 0, 10, zrange_opts);
  const time_leaderboard = await kv.zrange("time_leaderboard", 0, 10, zrange_opts);

  return json({
    budget_leaderboard: formatLeaderboard(budget_leaderboard),
    rating_leaderboard: formatLeaderboard(rating_leaderboard),
    time_leaderboard: formatLeaderboard(time_leaderboard),
  } satisfies Leaderboards);
}
