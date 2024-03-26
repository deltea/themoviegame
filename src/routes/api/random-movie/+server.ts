import { json, type RequestHandler } from "@sveltejs/kit";
import { TMDB_API_KEY } from "$env/static/private";
import { random, type Movie } from "$lib/utils";

export const GET: RequestHandler = async () => {
  const results = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&with_original_language=en&include_video=false&sort_by=popularity.desc&page=${random(1, 20)}`);
  const popularMovies = await results.json();

  let movie: Movie | null = null;
  while (!movie || movie.budget == 0) {
    const result = await fetch(`https://api.themoviedb.org/3/movie/${popularMovies.results[random(0, 20)].id}?api_key=${TMDB_API_KEY}`);
    movie = await result.json()
    console.log(`trying ${movie?.title}`);
  }

  return json(movie);
}
