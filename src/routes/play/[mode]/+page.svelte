<script lang="ts">
	import { onMount } from "svelte";
  import { NumberFormatter, type Movie } from "$lib/utils";
  import type { PageData } from "./$types";
  import { slide } from "svelte/transition";

  export let data: PageData;

  const answerDuration = 1000;

  let movie1: Movie | null;
  let movie2: Movie | null;
  let nextMovie: Movie | null;

  let round = 1;
  let state: "load" | "game" | "end" = "load";
  let answerState: "correct" | "incorrect" | null = null;

  async function fetchMovie() {
    const response = await fetch("/api/random-movie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    return await response.json();
  }

  async function setMovies() {
    movie1 = await fetchMovie();
    movie2 = await fetchMovie();
    nextMovie = await fetchMovie();

    state = "game";
  }

  async function correct() {
    round++;
    answerState = "correct";

    setTimeout(async () => {
      movie1 = movie2;
      movie2 = nextMovie;
      nextMovie = await fetchMovie();
      answerState = null;
    }, answerDuration);
  }

  onMount(() => {
    setMovies();
  });
</script>

<!-- Loading movies -->
{#if state === "load"}
  <main class="h-full bg-imdb" transition:slide>
    <p>Loading...</p>
  </main>

<!-- Game over -->
{:else if state === "end"}
  <main class="h-full bg-white" transition:slide>
    <p>Game over!</p>
  </main>

<!-- Game -->
{:else if state === "game"}
  <main class="flex h-full w-full justify-between" transition:slide>
    <img src="https://image.tmdb.org/t/p/original{movie1?.poster_path}" alt={movie1?.title} class="h-full">

    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-medium font-impactt mt-8 mb-12">ROUND {round}</h1>

      {#if data.gameMode === "budget"}
        <h2 class="flex flex-col items-center gap-3 justify-center text-4xl">
          <span class="bg-imdb rounded-md px-3 py-1 text-black font-impactt flex items-center justify-center text-center gap-2 mx-4">
            <iconify-icon icon="material-symbols:arrow-circle-left-rounded"></iconify-icon>
            <span>"{movie1?.title}"</span>
          </span>
          <span class="text-2xl">has a budget of</span>
          <span class="bg-imdb rounded-md px-3 py-1 text-black font-impactt">${NumberFormatter.format(movie1?.budget || 0)}</span>
        </h2>
      {/if}
    </div>

    <img src="https://image.tmdb.org/t/p/original{movie2?.poster_path}" alt={movie2?.title} class="h-full">
  </main>
{/if}
