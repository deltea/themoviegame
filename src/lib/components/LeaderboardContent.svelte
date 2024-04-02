<script lang="ts">
  import { Tabs } from "bits-ui";
  import { localUsername, type Leaderboard } from "$lib/utils";
  import Tooltip from "./Tooltip.svelte";

  export let leaderboard: Leaderboard | undefined;
  export let value: string;
  export let refresh: () => void;
</script>

<Tabs.Content {value} class="border-2 border-white rounded-2xl md:p-6 p-4 z-10 bg-black md:w-[35rem] w-[25rem] h-fit pointer-events-auto">
  <h1 class="font-impactt md:text-3xl text-2xl text-center border-b-2 border-white w-full flex items-center justify-between mb-5 pb-1">
    <slot/>
    <Tooltip text="Refresh leaderboard">
      <button class="flex items-center hover:scale-125 duration-150 hover:rotate-180 active:scale-100" on:click={refresh}>
        <iconify-icon icon="mingcute:refresh-4-fill" class="text-3xl"></iconify-icon>
      </button>
    </Tooltip>
  </h1>

  {#if leaderboard}
    {#if leaderboard.length > 0}
      <div class="flex flex-col gap-2 md:h-80 h-40">
        {#each leaderboard as entry, i}
          <div class="bg-imdb px-2 py-1 rounded-md flex justify-between">
            <div class="flex-grow flex items-center gap-1">
              {#if entry.username === localUsername()}
                <Tooltip text="You">
                  <iconify-icon icon="mingcute:user-2-fill" class="text-lg"></iconify-icon>
                </Tooltip>
              {/if}
              {#if i === 0}
                <Tooltip text="#1">
                  <iconify-icon icon="mingcute:trophy-fill" class="text-lg"></iconify-icon>
                </Tooltip>
              {/if}
              <span>{entry.username}</span>
            </div>
            <span>{entry.score}</span>
          </div>
        {/each}
      </div>
    {:else}
      <div class="font-impactt text-3xl text-white flex justify-center items-center w-full md:h-80 h-40">
        <h1>There are no scores</h1>
      </div>
    {/if}
  {:else}
    <div class="font-impactt text-3xl text-white flex justify-center items-center w-full md:h-80 h-40">
      <h1>LOADING LEADERBOARD...</h1>
    </div>
  {/if}
</Tabs.Content>
