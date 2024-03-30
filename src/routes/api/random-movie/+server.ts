import { json, type RequestHandler } from "@sveltejs/kit";
import { OMDB_API_KEY, TMDB_API_KEY } from "$env/static/private";
import { random, type Movie } from "$lib/utils";

export const GET: RequestHandler = async () => {
  // Get 1 random page of popular movies
  const pages = 25;
  const random_page = random(1, pages);
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&include_adult=false&with_original_language=en&include_video=false&sort_by=popularity.desc&page=${random_page}`);
  const popular_movies = await response.json();

  let movie: Movie | null = null;
  let rating: number | null = null;

  while (!movie || movie.budget == 0 || !rating) {
    // Pick a random valid movie in the page
    const random_id = popular_movies.results[random(0, 20)].id;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${random_id}?api_key=${TMDB_API_KEY}&append_to_response=external_ids,watch/providers`);
    movie = await response.json()
    // console.log(movie);

    // Get IMDB rating using OMDB
    const omdb_response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie?.imdb_id}`);
    rating = +(await omdb_response.json())["imdbRating"];
  }

  return json({...movie, rating});
}
