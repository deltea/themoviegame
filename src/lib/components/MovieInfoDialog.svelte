<script lang="ts">
  import { Dialog } from "bits-ui";
  import { fade, fly } from "svelte/transition";
  import {
    genreIcons,
    DateFormatter,
    NumberFormatter,
    type Movie,
    type GameMode,
  } from "$lib/utils";

  import Tooltip from "./Tooltip.svelte";

  export let open = false;
  export let movie: Movie;
  export let gameMode: GameMode;
</script>

<Dialog.Root bind:open={open}>
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
        <h1 class="font-impactt text-2xl">About "{movie.title}"</h1>
        <Dialog.Close class="right-6 top-6 flex justify-center items-center">
          <iconify-icon icon="mingcute:close-fill" class="text-2xl"></iconify-icon>
        </Dialog.Close>
      </div>

      <!-- Actual content -->
      <div class="text-xl">
        <!-- The movie genres -->
        {#if movie.genres}
          <div class="flex-grow flex items-center">
            <h2 class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="bx:camera-movie" class="text-xl"></iconify-icon>
              Genres:
            </h2>
            <div class="flex items-center gap-2">
              {#if movie.genres.length > 0}
                {#each movie.genres as genre}
                  {#if Object.keys(genreIcons).includes(genre.name)}
                    <Tooltip text={genre.name}>
                      <iconify-icon icon={genreIcons[genre.name]}></iconify-icon>
                    </Tooltip>
                  {/if}
                {/each}
              {:else}
                None
              {/if}
            </div>
          </div>
        {/if}

        <!-- The release date -->
        {#if movie.release_date && gameMode !== "time"}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="material-symbols:calendar-clock-outline-rounded" class="text-xl"></iconify-icon>
              Release Date:
            </span>
            <span>
              {DateFormatter.format(new Date(movie.release_date))}
            </span>
          </p>
        {/if}

        <!-- The budget -->
        {#if movie.budget && gameMode !== "budget"}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="mingcute:pig-money-line" class="text-xl"></iconify-icon>
              Budget:
            </span>
            <span>
              ${NumberFormatter.format(movie.budget)}
            </span>
          </p>
        {/if}

        <!-- The runtime -->
        {#if movie.runtime}
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="tabler:ruler-measure" class="text-xl"></iconify-icon>
              Runtime:
            </span>
            <span>{movie.runtime} mins</span>
          </p>
        {/if}

        <!-- The rating -->
        <!-- {#if movie.rating && gameMode !== "rating"} -->
          <p class="flex items-center">
            <span class="font-semibold mr-2 flex items-center gap-1.5">
              <iconify-icon icon="mingcute:star-line" class="text-xl"></iconify-icon>
              Rating:
            </span>
            <span>
              {movie.rating}
            </span>
          </p>
        <!-- {/if} -->

        <!-- The movie plot -->
        {#if movie.overview}
          <div class="">
            <h2 class="font-semibold flex items-center gap-1.5">
              <iconify-icon icon="mingcute:book-6-line" class="text-xl"></iconify-icon>
              Overview:
            </h2>
            <p>{movie.overview}</p>
          </div>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
