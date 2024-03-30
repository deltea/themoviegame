<script lang="ts">
  import type { PageData } from "./$types";
	import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { Separator } from "bits-ui";
  import {
    NumberFormatter,
    type Movie,
    type AnswerState,
  } from "$lib/utils";

  import MovieInfoDialog from "$lib/components/MovieInfoDialog.svelte";
  import MoviePoster from "$lib/components/MoviePoster.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data: PageData;

  const animationDuration = 500;

  let movie1: Movie;
  let movie2: Movie;
  let movieNext: Movie;
  let movieInfo: Movie;

  let round = 1;
  let state: "load" | "game" | "end" = "load";
  let answerState: AnswerState = null;
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
    while (checkSameStat(movie1, movie2)) movie2 = await fetchMovie();
    movieNext = await fetchMovie();
    while (checkSameStat(movie2, movieNext)) movieNext = await fetchMovie();

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
      case "rating":
        movie1value = movie1.rating;
        movie2value = movie2.rating;
      case "time":
        movie1value = new Date(movie1.release_date).getTime();
        movie2value = new Date(movie2.release_date).getTime();
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

    let movieNextPrev = movieNext;
    movieNext = await fetchMovie();
    while (checkSameStat(movie2, movieNext)) movieNext = await fetchMovie();

    setTimeout(async () => {
      movie1 = movie2;
      movie2 = movieNextPrev;

      answerState = null;
    }, animationDuration * 2);
  }

  function incorrect() {
    answerState = "incorrect";

    setTimeout(() => {
      state = "end";
    }, animationDuration * 2);
    console.log("incorrect");
  }

  function setMovieInfo(movie: Movie) {
    infoDialogOpen = true;
    movieInfo = movie;
  }

  function checkSameStat(movie1: Movie, movie2: Movie) {
    switch (data.gameMode) {
      case "budget": return movie1.budget === movie2.budget;
      case "rating": return movie1.rating === movie2.rating
      case "time": return new Date(movie1.release_date).getFullYear() === new Date(movie2.release_date).getFullYear()
    }
  }

  onMount(setMovies);
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
      <!-- Home -->
      <a
        href="/"
        class="flex justify-center items-center size-24 bg-imdb rounded-3xl duration-150 hover:scale-110 active:scale-95">
        <iconify-icon
          icon="mingcute:home-7-fill"
          class="text-6xl text-white"
        ></iconify-icon>
      </a>

      <!-- Play again -->
      <button
        on:click={() => location.reload()}
        class="flex justify-center items-center size-32 bg-imdb rounded-3xl duration-150 hover:scale-110 active:scale-95">
        <iconify-icon
          icon="mingcute:refresh-4-fill"
          class="text-6xl text-white duration-200 group-hover:rotate-180"
        ></iconify-icon>
      </button>

      <!-- Leaderboard -->
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
    <MoviePoster
      movie={movie1}
      animationDuration={animationDuration}
      state={answerState}
      infoButtonClick={() => setMovieInfo(movie1)}
    />

    <div class="flex flex-col items-center justify-evenly flex-grow">
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
          <h5 class="text-lg">was released in the year</h5>
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
            <Button on:click={() => guessPick("higher")} icon="material-symbols:arrow-upward-alt-rounded">Higher</Button>
            <Button on:click={() => guessPick("lower")} icon="material-symbols:arrow-downward-alt-rounded">Lower</Button>
          </div>

          <h5 class="text-lg">budget</h5>

        <!-- Rating mode -->
        {:else if data.gameMode === "rating"}
          <h5 class="text-lg">has a</h5>

          <div class="space-y-2 w-full px-8">
            <Button on:click={() => guessPick("higher")} icon="material-symbols:arrow-upward-alt-rounded">Higher</Button>
            <Button on:click={() => guessPick("lower")} icon="material-symbols:arrow-downward-alt-rounded">Lower</Button>
          </div>

          <h5 class="text-lg">rating</h5>

        <!-- Time mode -->
        {:else if data.gameMode === "time"}
          <h5 class="text-lg">is</h5>

          <div class="space-y-2 w-full px-8">
            <Button on:click={() => guessPick("higher")} icon="material-symbols:arrow-upward-alt-rounded">Newer</Button>
            <Button on:click={() => guessPick("lower")} icon="material-symbols:arrow-downward-alt-rounded">Older</Button>
          </div>
        {/if}
      </div>
    </div>

    <!-- Poster 2 -->
    <MoviePoster
      movie={movie2}
      animationDuration={animationDuration}
      state={answerState}
      infoButtonClick={() => setMovieInfo(movie2)}
    />
  </main>
{/if}

<MovieInfoDialog
  bind:open={infoDialogOpen}
  movie={movieInfo}
  gameMode={data.gameMode}
/>
