import { json, type RequestHandler } from "@sveltejs/kit";
import { OMDB_API_KEY } from "$env/static/private";
import { random } from "$lib/utils";

function randomMovieId(): string {
  let randomNumber = random(0, 9999999).toString()
  while (randomNumber.length < 7) randomNumber = "0" + randomNumber
  return `tt${randomNumber}`
}

export const GET: RequestHandler = async () => {
  let data;
  while (data == null || data["Type"] != "movie") {
    const movieId = randomMovieId();
    console.log(`trying imdb id ${movieId}...`);
    const result = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}&type=movie`);
    data = await result.json();
  }

  return json({
    title: data["Title"],
    year: data["Year"],
    poster: data["Poster"],
    rating: data["imdbRating"]
  });
}
