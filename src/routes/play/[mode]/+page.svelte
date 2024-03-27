<script lang="ts">
  import type { PageData } from "./$types";
	import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { Separator, Dialog, Tooltip } from "bits-ui";
  import {
    DateFormatter,
    NumberFormatter,
    genreIcons,
    type Movie
  } from "$lib/utils";

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
  <main class="h-full bg-imdb flex justify-center items-center" transition:slide>
    <h1 class="text-4xl font-impactt flex items-center gap-2">
      LOADING MOVIES...
      <iconify-icon icon="humbleicons:spinner-earring" class="animate-spin"></iconify-icon>
    </h1>
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
      <div class="flex flex-col items-center gap-2 justify-center">
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
      <div class="flex flex-col items-center gap-2 justify-center w-full">
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
      transitionConfig={{ y: 500, duration: 150, opacity: 100 }}
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black rounded-2xl border-2 border-imdb p-6 w-[40rem] flex flex-col gap-5"
    >
      <!-- Top Bar -->
      <div class="flex justify-between items-center">
        <h1 class="font-impactt text-2xl">About "{movieInfo?.title}"</h1>
        <Dialog.Close class="right-6 top-6 flex justify-center items-center">
          <iconify-icon icon="mingcute:close-fill" class="text-2xl"></iconify-icon>
        </Dialog.Close>
      </div>

      <!-- Actual content -->
      <div class="text-xl">
        <!-- The movie genres -->
        {#if movieInfo?.genres}
          <div class="flex-grow flex items-center">
            <h2 class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="bx:camera-movie" class="text-xl"></iconify-icon>
              Genres:
            </h2>
            <div class="flex items-center gap-2">
              {#each movieInfo?.genres as genre}
                {#if Object.keys(genreIcons).includes(genre.name)}
                  <Tooltip.Root openDelay={0}>
                    <Tooltip.Trigger class="cursor-default flex items-center">
                      <iconify-icon icon={genreIcons[genre.name]}></iconify-icon>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      transition={fly}
                      transitionConfig={{ y: -8, duration: 150 }}
                      sideOffset={8}
                    >
                      <div class="bg-black">
                        <Tooltip.Arrow class="border-l-2 border-t-2 border-white rounded-[4px]" size={12} />
                      </div>
                      <div class="flex justify-center items-center border-2 border-white py-2 px-4 bg-black rounded-md">
                        {genre.name}
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                {/if}
              {/each}
            </div>
          </div>
        {/if}

        <!-- The release date -->
        {#if movieInfo?.release_date}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="material-symbols:calendar-clock-outline-rounded" class="text-xl"></iconify-icon>
              Release Date:
            </span>
            <span>{DateFormatter.format(new Date(movieInfo.release_date))}</span>
          </p>
        {/if}

        <!-- The budget -->
        {#if movieInfo?.budget}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="mingcute:pig-money-line" class="text-xl"></iconify-icon>
              Budget:
            </span>
            <span>
              {#if data.gameMode === "budget"}
                [REDACTED]
              {:else}
                ${NumberFormatter.format(movieInfo.budget)}
              {/if}
            </span>
          </p>
        {/if}

        <!-- The runtime -->
        {#if movieInfo?.runtime}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="tabler:ruler-measure" class="text-xl"></iconify-icon>
              Runtime:
            </span>
            <span>{movieInfo.runtime} mins</span>
          </p>
        {/if}

        <!-- The rating -->
        {#if movieInfo?.rating}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="material-symbols:star-outline-rounded" class="text-xl"></iconify-icon>
              Rating:
            </span>
            <span>{movieInfo.rating}</span>
          </p>
        {/if}

        <!-- The movie plot -->
        {#if movieInfo?.overview}
          <div class="">
            <h2 class="font-semibold flex items-center gap-1.5">
              <iconify-icon icon="mingcute:book-6-line" class="text-xl"></iconify-icon>
              Overview:
            </h2>
            <p>{movieInfo?.overview}</p>
          </div>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
