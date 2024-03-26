<script lang="ts">
  import type { Movie } from "$lib/utils";

  let movie1: Movie;
  let movie2: Movie;

  async function fetchMovie() {
    const response = await fetch("/api/random-movie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    return await response.json();
  }

  async function click() {
    const movie = await fetchMovie()
    movie1 = movie
    console.table(movie);
  }
</script>

<button on:click={async () => await click()}>Movie</button>
{#if movie1}
  <img src="https://image.tmdb.org/t/p/original{movie1.poster_path}" alt={movie1.title}>
{/if}
