import { error, json, type RequestHandler } from "@sveltejs/kit";
import { KV_REST_API_TOKEN, KV_REST_API_URL } from "$env/static/private";
import { createClient } from "@vercel/kv";

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

export const POST: RequestHandler = async ({ request }) => {
  const {
    oldUsername,
    username,
    rating_score,
    budget_score,
    time_score
  } = await request.json();

  if ((await kv.zscore("rating_leaderboard", username)) !== null) {
    return error(404, "Username taken");
  } else {
    await kv.zrem("rating_leaderboard", oldUsername);
    await kv.zrem("budget_leaderboard", oldUsername);
    await kv.zrem("time_leaderboard", oldUsername);

    await kv.zadd("rating_leaderboard", { score: rating_score, member: username });
    await kv.zadd("budget_leaderboard", { score: budget_score, member: username });
    await kv.zadd("time_leaderboard", { score: time_score, member: username });

    return json("success");
  }
}
