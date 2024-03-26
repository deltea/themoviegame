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
    movie1 = await fetchMovie()
    movie2 = await fetchMovie()
  }
</script>

<button on:click={async () => await click()}>Movie</button>
{#if movie1 && movie2}
  <div class="flex w-full h-screen">
    <img src="https://image.tmdb.org/t/p/original{movie1.poster_path}" alt={movie1.title} class="h-full">
    <img src="https://image.tmdb.org/t/p/original{movie2.poster_path}" alt={movie2.title} class="h-full">
  </div>
{/if}
