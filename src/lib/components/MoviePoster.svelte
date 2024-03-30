<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { AnswerState, Movie } from "$lib/utils";
  import { slide } from "svelte/transition";

  export let movie: Movie;
  export let infoButtonClick: MouseEventHandler<HTMLButtonElement>;
  export let animationDuration: number;
  export let state: AnswerState;
</script>

<div class="h-full relative aspect-[2/3]">
  <img src="https://image.tmdb.org/t/p/original{movie.poster_path}" alt={movie.title} class="h-full">

  <!-- Answer overlay -->
  {#if state}
    <div
      class="absolute w-full h-full top-0 left-0 bg-imdb flex justify-center items-center"
      transition:slide={{ duration: animationDuration, axis: "y" }}
    >
      {#if state === "correct"}
        <iconify-icon icon="mingcute:check-fill" class="text-6xl text-black"></iconify-icon>
      {:else if state === "incorrect"}
        <iconify-icon icon="mingcute:close-fill" class="text-6xl text-black"></iconify-icon>
      {/if}
    </div>
  {/if}

  <!-- Info button -->
  <button
    on:click={infoButtonClick}
    class="absolute left-8 bottom-6 hover:scale-110 active:scale-90 duration-150"
  >
    <iconify-icon icon="material-symbols:info-rounded" class="text-4xl"></iconify-icon>
  </button>
</div>
