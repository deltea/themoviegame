<script lang="ts">
  import type { PageData } from "./$types";
	import type { GameMode } from "$lib/utils";
  import { RadioGroup, Tabs } from "bits-ui";

  import Title from "$lib/components/Title.svelte";
  import LeaderboardContent from "$lib/components/LeaderboardContent.svelte";
  import Footer from "$lib/components/Footer.svelte";
	import GameModeSelect from "$lib/components/GameModeSelect.svelte";

  export let data: PageData;

  let gameMode: GameMode = "rating";

  console.log(data);
</script>

<main class="h-full w-full overflow-y-auto">
  <div class="h-screen flex flex-col">
    <div class="flex flex-col justify-center items-center gap-16 flex-grow">
      <Title />

      <!-- Game mode selection -->
      <GameModeSelect bind:gameMode={gameMode} />

      <!-- Play button -->
      <a
        href="/play/{gameMode}"
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
    </div>

    <div class="flex flex-col gap-2 items-center justify-center py-4">
      <span>Scroll down for leaderboard</span>
      <iconify-icon icon="mingcute:arrows-down-fill" class="text-3xl"></iconify-icon>
    </div>
  </div>

  <!-- Leaderboard -->
  <div class="h-screen bg-black text-white flex justify-center items-center">
    <Tabs.Root value="rating" class="p-8 pb-12 h-full w-full flex">
      <LeaderboardContent leaderboard={data.rating_leaderboard} value="rating">
        Rating Mode Leaderboard
      </LeaderboardContent>
      <LeaderboardContent leaderboard={data.budget_leaderboard} value="budget">
        Budget Mode Leaderboard
      </LeaderboardContent>
      <LeaderboardContent leaderboard={data.time_leaderboard} value="time">
        Time Mode Leaderboard
      </LeaderboardContent>

      <Tabs.List class="flex flex-col mt-4 gap-2">
        <Tabs.Trigger
          value="rating"
          class="py-4 px-6 text-white border-r-2 border-y-2 border-white rounded-r-xl duration-150 hover:bg-white hover:text-black hover:scale-110 active:scale-100 font-semibold text-lg"
        >
          Rating Mode
        </Tabs.Trigger>
        <Tabs.Trigger
          value="budget"
          class="py-4 px-6 text-white border-r-2 border-y-2 border-white rounded-r-xl duration-150 hover:bg-white hover:text-black hover:scale-110 active:scale-100 font-semibold text-lg"
        >
          Budget Mode
        </Tabs.Trigger>
        <Tabs.Trigger
          value="time"
          class="py-4 px-6 text-white border-r-2 border-y-2 border-white rounded-r-xl duration-150 hover:bg-white hover:text-black hover:scale-110 active:scale-100 font-semibold text-lg"
        >
          Time Mode
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </div>
</main>

<Footer />
