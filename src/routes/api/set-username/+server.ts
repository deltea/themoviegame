import { json, type RequestHandler } from "@sveltejs/kit";
import { KV_REST_API_TOKEN, KV_REST_API_URL } from "$env/static/private";
import { createClient } from "@vercel/kv";

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

export const POST: RequestHandler = async ({ request }) => {
  const { oldUsername, username, score } = await request.json();
  await kv.zrem("rating_leaderboard", oldUsername);
  await kv.zrem("budget_leaderboard", oldUsername);
  await kv.zrem("time_leaderboard", oldUsername);

  await kv.zadd("rating_leaderboard", { score, member: username });
  await kv.zadd("budget_leaderboard", { score, member: username });
  await kv.zadd("time_leaderboard", { score, member: username });

  return json({ score, username });
}
