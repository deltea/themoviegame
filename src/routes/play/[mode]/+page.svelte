<script lang="ts">
  import type { PageData } from "./$types";
	import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import { Separator, Dialog, Tooltip } from "bits-ui";
  import { goto } from "$app/navigation";
  import {
    DateFormatter,
    NumberFormatter,
    genreIcons,
    type Movie
  } from "$lib/utils";

  export let data: PageData;

  const answerDuration = 1000;

  let movie1: Movie;
  let movie2: Movie;
  let nextMovie: Movie;
  let movieInfo: Movie;

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

  function guessPick(value: "higher" | "lower") {
    if (answerState) return;

    let movie1value: number;
    let movie2value: number;

    switch (data.gameMode) {
      case "budget":
        movie1value = movie1.budget;
        movie2value = movie2.budget;
        break;
      case "rating":
        movie1value = movie1.rating;
        movie2value = movie2.rating;
        break;
      case "time":
        movie1value = new Date(movie1.release_date).getTime();
        movie2value = new Date(movie2.release_date).getTime();
        break;
    }

    if (value === "higher") {
      if (movie2value > movie1value) correct();
      else incorrect();
    } else {
      if (movie2value < movie1value) correct();
      else incorrect();
    }
  }

  async function correct() {
    round++;
    answerState = "correct";
    console.log("correct");

    setTimeout(async () => {
      movie1 = movie2;
      movie2 = nextMovie;
      nextMovie = await fetchMovie();
      answerState = null;
    }, answerDuration);
  }

  function incorrect() {
    answerState = "incorrect";

    setTimeout(() => {
      state = "end";
    }, answerDuration);
    console.log("incorrect");
  }

  function setMovieInfo(movie: Movie) {
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
    <h1 class="text-5xl font-impactt flex items-center gap-2">
      LOADING MOVIES...
      <iconify-icon icon="humbleicons:spinner-earring" class="animate-spin"></iconify-icon>
    </h1>
  </main>

<!-- Game over -->
{:else if state === "end"}
  <main class="h-full bg-black flex flex-col justify-center items-center gap-8" transition:slide>
    <h1 class="bg-imdb px-2.5 py-1 rounded-md text-black font-impactt text-5xl">GAME OVER!</h1>
    <h2 class="text-2xl">
      You made it to
      <span class="border-2 border-white rounded-lg px-1.5 py-0.5 ">ROUND {round}</span>
    </h2>
    <div class="flex justify-center items-center gap-6">
      <a
        href="/"
        class="flex justify-center items-center size-24 bg-imdb rounded-3xl duration-150 hover:scale-110 active:scale-95">
        <iconify-icon
          icon="mingcute:home-7-fill"
          class="text-6xl text-white"
        ></iconify-icon>
      </a>
      <button
        on:click={() => location.reload()}
        class="flex justify-center items-center size-32 bg-imdb rounded-3xl duration-150 hover:scale-110 active:scale-95">
        <iconify-icon
          icon="mingcute:refresh-4-fill"
          class="text-6xl text-white duration-200 group-hover:rotate-180"
        ></iconify-icon>
      </button>
      <button
        on:click={() => (console.log("leaderboard"))}
        class="flex justify-center items-center size-24 bg-imdb rounded-3xl duration-150 hover:scale-110 active:scale-95">
        <iconify-icon
          icon="mingcute:trophy-fill"
          class="text-6xl text-white duration-200"
        ></iconify-icon>
      </button>
    </div>
  </main>

<!-- Game -->
{:else if state === "game"}
  <main class="flex h-full w-full justify-between relative" transition:slide>
    <!-- Home button -->
    <a
      href="/"
      class="text-white bg-transparent border-2 border-white rounded-full flex justify-end items-end size-32 absolute -left-16 -top-16 duration-150 hover:bg-white z-50 hover:text-black"
    >
      <iconify-icon icon="mingcute:home-7-fill" class="text-2xl mr-6 mb-6"></iconify-icon>
    </a>

    <!-- Poster 1 -->
    <div class="w-full h-full relative">
      <img src="https://image.tmdb.org/t/p/original{movie1.poster_path}" alt={movie1.title} class="h-full">

      <!-- Answer overlay -->
      {#if answerState}
        <div
          class="absolute w-full h-full top-0 left-0 bg-imdb flex justify-center items-center"
          transition:slide={{ duration: answerDuration / 2, axis: "y" }}
        >
          {#if answerState === "correct"}
            <iconify-icon icon="mingcute:check-fill" class="text-6xl text-black"></iconify-icon>
          {:else if answerState === "incorrect"}
            <iconify-icon icon="mingcute:close-fill" class="text-6xl text-black"></iconify-icon>
          {/if}
        </div>
      {/if}

      <!-- Info button -->
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
          <span>{movie1.title}</span>
        </h3>

        <!-- Budget mode -->
        {#if data.gameMode === "budget"}
          <h5 class="text-lg">has a budget of</h5>
          <h2 class="bg-imdb rounded-md px-3 py-1 text-black font-impactt text-5xl">
            ${NumberFormatter.format(movie1.budget)}
          </h2>

        <!-- Rating mode -->
        {:else if data.gameMode === "rating"}
          <h5 class="text-lg">has a rating of</h5>
          <h2 class="bg-imdb rounded-md px-3 py-1 text-black font-impactt flex items-center text-3xl">
            <div class="relative w-full h-full">
              <div
                class="absolute h-full text-clip whitespace-nowrap overflow-hidden"
                style:width="{movie1.rating / 10 * 300}px"
              >
                {#each [0,1,2,3,4,5,6,7,8,9] as i}
                  <iconify-icon icon="mingcute:star-fill" class="absolute" style:left="{i * 30}px"></iconify-icon>
                {/each}
              </div>
            </div>
            <div class="flex w-full h-full justify-center items-center">
              {#each [0,1,2,3,4,5,6,7,8,9] as _}
                <iconify-icon icon="mingcute:star-line"></iconify-icon>
              {/each}
            </div>
          </h2>

        {:else if data.gameMode === "time"}
          <h5 class="text-lg">was released in</h5>
          <h2 class="bg-imdb rounded-md px-3 py-1 text-black font-impactt text-5xl">
            {new Date(movie1.release_date).getFullYear()}
          </h2>
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
          <span>{movie2.title}</span>
          <iconify-icon icon="material-symbols:arrow-circle-right-rounded"></iconify-icon>
        </h3>

        <!-- Budget mode -->
        {#if data.gameMode === "budget"}
          <h5 class="text-lg">has a</h5>

          <div class="space-y-2 w-full px-8">
            <!-- Higher button -->
            <button
              class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              on:click={() => guessPick("higher")}>
              <iconify-icon
                icon="material-symbols:arrow-upward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
              Higher
              <iconify-icon
                icon="material-symbols:arrow-upward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
            </button>

            <!-- Lower button -->
            <button
              class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              on:click={() => guessPick("lower")}>
              <iconify-icon
                icon="material-symbols:arrow-downward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
              Lower
              <iconify-icon
                icon="material-symbols:arrow-downward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
            </button>
          </div>

          <h5 class="text-lg">budget</h5>

        <!-- Rating mode -->
        {:else if data.gameMode === "rating"}
          <h5 class="text-lg">has a</h5>

          <div class="space-y-2 w-full px-8">
            <!-- Higher button -->
            <button
              class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              on:click={() => guessPick("higher")}>
              <iconify-icon
                icon="material-symbols:arrow-upward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
              Higher
              <iconify-icon
                icon="material-symbols:arrow-upward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
            </button>

            <!-- Lower button -->
            <button
              class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              on:click={() => guessPick("lower")}>
              <iconify-icon
                icon="material-symbols:arrow-downward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
              Lower
              <iconify-icon
                icon="material-symbols:arrow-downward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
            </button>
          </div>

          <h5 class="text-lg">rating</h5>

        <!-- Time mode -->
        {:else if data.gameMode === "time"}
          <h5 class="text-lg">is</h5>

          <div class="space-y-2 w-full px-8">
            <!-- Higher button -->
            <button
              class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              on:click={() => guessPick("higher")}>
              <iconify-icon
                icon="material-symbols:arrow-upward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
              Newer
              <iconify-icon
                icon="material-symbols:arrow-upward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
            </button>

            <!-- Lower button -->
            <button
              class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt text-4xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
              on:click={() => guessPick("lower")}>
              <iconify-icon
                icon="material-symbols:arrow-downward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
              Older
              <iconify-icon
                icon="material-symbols:arrow-downward-alt-rounded"
                class="scale-0 group-hover:scale-100 duration-150"
              ></iconify-icon>
            </button>
          </div>

          <!-- <h5 class="text-lg">budget</h5> -->
        {/if}
      </div>
    </div>

    <!-- Poster 2 -->
    <div class="w-full h-full relative">
      <img src="https://image.tmdb.org/t/p/original{movie2.poster_path}" alt={movie2.title} class="h-full">

      <!-- Answer overlay -->
      {#if answerState}
        <div
          class="absolute w-full h-full top-0 left-0 bg-imdb flex justify-center items-center"
          transition:slide={{ duration: answerDuration / 2, axis: "y" }}
        >
          {#if answerState === "correct"}
            <iconify-icon icon="mingcute:check-fill" class="text-6xl text-black"></iconify-icon>
          {:else if answerState === "incorrect"}
            <iconify-icon icon="mingcute:close-fill" class="text-6xl text-black"></iconify-icon>
          {/if}
        </div>
      {/if}

      <!-- Info button -->
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
        <h1 class="font-impactt text-2xl">About "{movieInfo.title}"</h1>
        <Dialog.Close class="right-6 top-6 flex justify-center items-center">
          <iconify-icon icon="mingcute:close-fill" class="text-2xl"></iconify-icon>
        </Dialog.Close>
      </div>

      <!-- Actual content -->
      <div class="text-xl">
        <!-- The movie genres -->
        {#if movieInfo.genres}
          <div class="flex-grow flex items-center">
            <h2 class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="bx:camera-movie" class="text-xl"></iconify-icon>
              Genres:
            </h2>
            <div class="flex items-center gap-2">
              {#if movieInfo.genres.length > 0}
                {#each movieInfo.genres as genre}
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
              {:else}
                None
              {/if}
            </div>
          </div>
        {/if}

        <!-- The release date -->
        {#if movieInfo.release_date}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="material-symbols:calendar-clock-outline-rounded" class="text-xl"></iconify-icon>
              Release Date:
            </span>
            <span>{DateFormatter.format(new Date(movieInfo.release_date))}</span>
          </p>
        {/if}

        <!-- The budget -->
        {#if movieInfo.budget}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="mingcute:pig-money-line" class="text-xl"></iconify-icon>
              Budget:
            </span>
            <span>
              {#if data.gameMode === "budget"}
                [REDACTED ON BUDGET MODE]
              {:else}
                ${NumberFormatter.format(movieInfo.budget)}
              {/if}
            </span>
          </p>
        {/if}

        <!-- The runtime -->
        {#if movieInfo.runtime}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="tabler:ruler-measure" class="text-xl"></iconify-icon>
              Runtime:
            </span>
            <span>{movieInfo.runtime} mins</span>
          </p>
        {/if}

        <!-- The rating -->
        {#if movieInfo.rating}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="mingcute:star-line" class="text-xl"></iconify-icon>
              Rating:
            </span>
            <span>
              {#if data.gameMode === "rating"}
                [REDACTED ON RATING MODE]
              {:else}
                {movieInfo.rating}
              {/if}
            </span>
          </p>
        {/if}

        <!-- The movie plot -->
        {#if movieInfo.overview}
          <div class="">
            <h2 class="font-semibold flex items-center gap-1.5">
              <iconify-icon icon="mingcute:book-6-line" class="text-xl"></iconify-icon>
              Overview:
            </h2>
            <p>{movieInfo.overview}</p>
          </div>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
