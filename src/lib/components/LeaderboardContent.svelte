<script lang="ts">
  import { Tabs } from "bits-ui";
  import type { Leaderboard } from "$lib/utils";
  import Tooltip from "./Tooltip.svelte";

  export let leaderboard: Leaderboard;
  export let value: string;
</script>

<Tabs.Content {value} class="border-2 border-white rounded-2xl p-6 flex-grow z-10 bg-black">
  <h1 class="font-impactt text-3xl text-center border-b-2 border-white w-full pb-4 flex items-center justify-between">
    <slot/>
    <Tooltip text="Refresh leaderboard">
      <button class="flex items-center hover:scale-125 duration-150 hover:rotate-180 active:scale-100">
        <iconify-icon icon="mingcute:refresh-4-fill" class="text-3xl"></iconify-icon>
      </button>
    </Tooltip>
  </h1>

  <div class="flex justify-center items-end p-4 gap-16">
    <div class="flex flex-col justify-end items-center">
      <h2 class="text-xl">{leaderboard[1].username}</h2>
      <div class="w-28 h-[4.5rem] border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
        {leaderboard[1].score}
      </div>
    </div>
    <div class="flex flex-col justify-end items-center">
      <h2 class="text-xl flex items-center gap-1">
        <iconify-icon icon="mingcute:trophy-fill" class="text-2xl"></iconify-icon>
        {leaderboard[0].username}
      </h2>
      <div class="w-28 h-24 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
        {leaderboard[0].score}
      </div>
    </div>
    <div class="flex flex-col justify-end items-center">
      <h2 class="text-xl">{leaderboard[2].username}</h2>
      <div class="w-28 h-12 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
        {leaderboard[2].score}
      </div>
    </div>
  </div>

  <div class="grid grid-rows-10 grid-cols-2">
    {#each leaderboard as entry}
      <p>{entry.username}: {entry.score}</p>
    {/each}
  </div>
</Tabs.Content>
