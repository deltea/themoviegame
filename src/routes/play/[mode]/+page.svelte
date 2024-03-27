<script lang="ts">
  import type { PageData } from "./$types";
	import { onMount } from "svelte";
  import { NumberFormatter, type Movie } from "$lib/utils";
  import { fade, fly, slide } from "svelte/transition";
  import { Separator, Dialog } from "bits-ui";

  export let data: PageData;

  const answerDuration = 1000;

  let movie1: Movie | null;
  let movie2: Movie | null;
  let nextMovie: Movie | null;
  let movieInfo: Movie | null;

  let round = 1;
  let state: "load" | "game" | "end" = "load";
  let answerState: "correct" | "incorrect" | null = null;
  let infoDialogOpen = false;

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

  function setMovieInfo(movie: Movie | null) {
    infoDialogOpen = true;
    movieInfo = movie;
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
    <!-- Poster 1 -->
    <div class="w-full relative">
      <img src="https://image.tmdb.org/t/p/original{movie1?.poster_path}" alt={movie1?.title} class="h-full">
      <button
        on:click={() => setMovieInfo(movie1)}
        class="absolute left-8 bottom-6 hover:scale-110 active:scale-90 duration-150"
      >
        <iconify-icon icon="material-symbols:info-rounded" class="text-4xl"></iconify-icon>
      </button>
    </div>

    <div class="flex flex-col items-center justify-evenly w-full">
      <!-- First movie info -->
      <div class="flex flex-col items-center gap-3 justify-center">
        <!-- Movie title -->
        <h3 class="border-2 border-white rounded-lg px-3 py-1 font-impactt flex items-center justify-center text-center gap-2 mx-4 text-2xl">
          <iconify-icon icon="material-symbols:arrow-circle-left-rounded"></iconify-icon>
          <span>{movie1?.title}</span>
        </h3>

        <!-- Budget mode -->
        {#if data.gameMode === "budget"}
          <h5 class="text-lg">has a budget of</h5>
          <h2 class="bg-imdb rounded-md px-3 py-1 text-black font-impactt text-5xl">${NumberFormatter.format(movie1?.budget || 0)}</h2>
        {/if}
      </div>

      <div class="flex gap-4 items-center justify-center w-full px-8">
        <Separator.Root class="h-[2px] flex-grow bg-white" />
        <iconify-icon icon="bxs:camera-movie" class="text-3xl -scale-x-100"></iconify-icon>
        <h1 class="text-3xl font-medium font-impactt">ROUND {round}</h1>
        <iconify-icon icon="bxs:camera-movie" class="text-3xl"></iconify-icon>
        <Separator.Root class="h-[2px] flex-grow bg-white" />
      </div>

      <!-- Second movie -->
      <div class="flex flex-col items-center gap-3 justify-center w-full">
        <!-- Movie title -->
        <h3 class="border-2 border-white rounded-lg px-3 py-1 font-impactt flex items-center justify-center text-center gap-2 mx-4 text-2xl">
          <span>{movie2?.title}</span>
          <iconify-icon icon="material-symbols:arrow-circle-right-rounded"></iconify-icon>
        </h3>

        <!-- Budget mode -->
        {#if data.gameMode === "budget"}
          <h5 class="text-lg">has a</h5>

          <div class="space-y-2 w-full px-8">
            <button class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95">
              <iconify-icon icon="material-symbols:arrow-upward-alt-rounded" class="scale-0 group-hover:scale-100 duration-150"></iconify-icon>
              Higher
              <iconify-icon icon="material-symbols:arrow-upward-alt-rounded" class="scale-0 group-hover:scale-100 duration-150"></iconify-icon>
            </button>

            <button class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95">
              <iconify-icon icon="material-symbols:arrow-downward-alt-rounded" class="scale-0 group-hover:scale-100 duration-150"></iconify-icon>
              Lower
              <iconify-icon icon="material-symbols:arrow-downward-alt-rounded" class="scale-0 group-hover:scale-100 duration-150"></iconify-icon>
            </button>
          </div>

          <h5 class="text-lg">budget</h5>
        {/if}
      </div>
    </div>

    <!-- Poster 2 -->
    <div class="w-full relative">
      <img src="https://image.tmdb.org/t/p/original{movie2?.poster_path}" alt={movie2?.title} class="h-full">
      <button
        on:click={() => setMovieInfo(movie2)}
        class="absolute left-8 bottom-6 hover:scale-110 active:scale-90 duration-150"
      >
        <iconify-icon icon="material-symbols:info-rounded" class="text-4xl"></iconify-icon>
      </button>
    </div>
  </main>
{/if}

<!-- Movie info dialog -->
<Dialog.Root bind:open={infoDialogOpen}>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay
      transition={fade}
      transitionConfig={{ duration: 150 }}
      class="fixed bg-black/80 z-50 inset-0"
    />
    <Dialog.Content
      transition={fly}
      transitionConfig={{ y: 350, duration: 150, opacity: 100 }}
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black rounded-2xl border-2 border-imdb p-6 w-[40rem] flex flex-col gap-4"
    >
      <!-- Top Bar -->
      <div class="flex justify-between items-center">
        <h1 class="font-impactt text-2xl">ABOUT THE MOVIE "{movieInfo?.title}"</h1>
        <Dialog.Close class="right-6 top-6 flex justify-center items-center">
          <iconify-icon icon="mingcute:close-fill" class="text-3xl"></iconify-icon>
        </Dialog.Close>
      </div>

      <!-- Actual content -->
      <p class="flex-grow">yo wat up</p>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
