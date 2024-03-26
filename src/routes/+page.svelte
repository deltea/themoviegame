<script lang="ts">
  import { Button } from "bits-ui";
</script>

<main class="h-full flex flex-col justify-center items-center space-y-16">
  <div class="flex flex-col space-y-4 items-center">
    <h1 class="flex items-center space-x-2.5 text text-5xl font-impactt">
      <span>The</span>
      <span class="flex items-center text-black py-1 px-3.5 tracking-wide rounded-lg bg-imdb">
        <iconify-icon icon="tabler:movie" class="text-5xl -ml-1"></iconify-icon>
        <span>MOVIE</span>
      </span>
      <span>Game</span>
    </h1>
    <h2 class="font-medium text-2xl">The game for movie lovers.</h2>
  </div>

  <Button.Root class="bg-imdb text-black py-2 px-24 text-2xl rounded-md hover:scale-105 active:scale-95 duration-150 font-bold">
    PLAY!
  </Button.Root>
</main>
