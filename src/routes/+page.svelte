<script lang="ts">
	import type { GameMode } from "$lib/utils";

  import Title from "$lib/components/Title.svelte";
  import Footer from "$lib/components/Footer.svelte";
	import GameModeSelect from "$lib/components/GameModeSelect.svelte";
  import Leaderboard from "$lib/components/Leaderboard.svelte";

  let gameMode: GameMode = "rating";
  let leaderboardOpen = false;
</script>

<main class="h-full w-full">
  <div class="h-screen flex flex-col">
    <div class="flex flex-col justify-center items-center md:gap-16 gap-8 flex-grow">
      <Title />

      <!-- Game mode selection -->
      <GameModeSelect bind:gameMode={gameMode} />

      <div class="flex md:flex-col flex-row items-center gap-4 w-full px-6">
        <!-- Play button -->
        <a
          href="/play/{gameMode}"
          class="group bg-black text-white border-2 border-white py-2 text-2xl rounded-md hover:scale-105 hover:bg-white hover:text-black active:scale-95 duration-150 font-bold flex items-center gap-3 md:w-80 w-1/2 justify-center"
        >
          <iconify-icon
            icon="bx:camera-movie"
            class="text-[26px] group-hover:scale-x-100 -scale-x-100 duration-150 md:block hidden"
          ></iconify-icon>
          <span>PLAY!</span>
          <iconify-icon
            icon="bx:camera-movie"
            class="text-[26px] group-hover:-scale-x-100 duration-150 md:block hidden"
          ></iconify-icon>
        </a>

        <!-- Leaderboard button -->
        <button
          on:click={() => (leaderboardOpen = true)}
          class="group bg-black text-imdb border-2 border-imdb py-2 text-2xl rounded-md hover:scale-105 hover:bg-imdb hover:text-black active:scale-95 duration-150 font-bold flex items-center gap-3 md:w-80 w-1/2 justify-center"
        >
          <iconify-icon
            icon="material-symbols:trophy-rounded"
            class="text-[26px] group-hover:scale-x-100 -scale-x-100 duration-150 md:block hidden"
          ></iconify-icon>
          <span>LEADERBOARD</span>
          <iconify-icon
            icon="material-symbols:trophy-rounded"
            class="text-[26px] group-hover:-scale-x-100 duration-150 md:block hidden"
          ></iconify-icon>
        </button>
      </div>
    </div>

    <Footer />
  </div>
</main>

<Leaderboard bind:open={leaderboardOpen} />
