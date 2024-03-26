<script lang="ts">
	import { type GameMode } from "$lib/utils";
  import { RadioGroup } from "bits-ui";

  let gameMode: GameMode = "budget";
</script>

<main class="h-full flex flex-col justify-center items-center gap-16">
  <div class="flex flex-col gap-3 items-center">
    <h1 class="flex items-center gap-2.5 text text-6xl font-impactt">
      <span>The</span>
      <span class="flex items-center text-black py-1 px-4 tracking-wide rounded-lg bg-imdb">
        <iconify-icon icon="tabler:movie" class="-ml-1"></iconify-icon>
        <span>MOVIE</span>
      </span>
      <span>Game</span>
    </h1>
    <h2 class="font-medium text-2xl">The game for movie lovers.</h2>
  </div>

  <RadioGroup.Root class="flex items-center justify-center gap-8" bind:value={gameMode}>
    <RadioGroup.Item
      value="budget"
      id="budget"
      class="p-6 rounded-2xl border-2 border-white data-[state=checked]:border-imdb data-[state=checked]:scale-110 duration-150 w-80"
    >
      <h3 class="text-2xl font-impactt tracking-wider flex justify-center items-center">
        <iconify-icon icon="ic:round-attach-money" class=""></iconify-icon>
        <span>BUDGET MODE</span>
      </h3>
      <p class="text-lg">Which movie had the higher budget?</p>
    </RadioGroup.Item>
    <RadioGroup.Item
      value="time"
      id="time"
      class="p-6 rounded-2xl border-2 border-white data-[state=checked]:border-imdb data-[state=checked]:scale-110 duration-150 w-80"
    >
      <h3 class="text-2xl font-impactt tracking-wider flex justify-center items-center gap-1">
        <iconify-icon icon="material-symbols:event-outline-rounded" class=""></iconify-icon>
        <span>TIME MODE</span>
      </h3>
      <p class="text-lg">Which movie is newer?</p>
    </RadioGroup.Item>
  </RadioGroup.Root>

  <a
    href="/play?mode={gameMode}"
    class="group bg-black text-white border-2 border-white py-2 px-24 text-2xl rounded-md hover:scale-105 hover:bg-white hover:text-black active:scale-95 duration-150 font-bold flex items-center gap-3"
  >
    <iconify-icon
      icon="bx:camera-movie"
      class="text-[26px] group-hover:-scale-x-100 duration-150"
    ></iconify-icon>

    <span>PLAY!</span>

    <iconify-icon
      icon="bx:camera-movie"
      class="text-[26px] group-hover:scale-x-100 -scale-x-100 duration-150"
    ></iconify-icon>
  </a>
</main>

<footer class="absolute bottom-0 w-screen p-2 text-sm flex gap-1 items-center">
  Made with
  <a href="https://svelte.dev" target="_blank" class="h-4">
    <iconify-icon icon="ri:svelte-fill"></iconify-icon>
  </a>
  and
  <iconify-icon icon="mdi:cards-heart"></iconify-icon>
  by
  <a href="https://github.com/thcheetah777" class="underline" target="_blank">thcheetah777</a>
</footer>
