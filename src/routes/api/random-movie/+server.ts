import { json, type RequestHandler } from "@sveltejs/kit";
import { TMDB_API_KEY } from "$env/static/private";
import { random } from "$lib/utils";

export const GET: RequestHandler = async () => {
  const result = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&with_original_language=en&include_video=false&sort_by=popularity.desc&page=${random(1, 20)}`);
  const data = await result.json();

  return json(data.results[random(0, 20)])
}
