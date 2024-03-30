<script lang="ts">
	import { slide } from "svelte/transition";
  import type { PageData } from "./$types";
	import type { GameMode } from "$lib/utils";
  import { RadioGroup, Tabs } from "bits-ui";

  export let data: PageData;

  let gameMode: GameMode = "rating";

  console.log(data);
</script>

<main class="h-full w-full overflow-y-auto">
  <div class="h-screen flex flex-col">
    <div class="flex flex-col justify-center items-center gap-16 flex-grow">
      <!-- Title -->
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

      <!-- Game mode selection -->
      <RadioGroup.Root class="flex items-center justify-center gap-8 w-full" bind:value={gameMode}>
        <RadioGroup.Item
          value="budget"
          id="budget"
          class="p-6 rounded-2xl border-2 border-white data-[state=checked]:border-imdb data-[state=checked]:scale-110 duration-150 w-[21rem]"
        >
          <h3 class="text-2xl font-impactt tracking-wider flex justify-center items-center">
            <iconify-icon icon="ic:round-attach-money" class=""></iconify-icon>
            <span>BUDGET MODE</span>
          </h3>
          <p class="text-lg">Does this movie have a higher budget?</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          value="rating"
          id="rating"
          class="p-6 rounded-2xl border-2 border-white data-[state=checked]:border-imdb data-[state=checked]:scale-110 duration-150 w-[21rem]"
        >
          <h3 class="text-2xl font-impactt tracking-wider flex justify-center items-center gap-1">
            <iconify-icon icon="material-symbols:star-rounded" class=""></iconify-icon>
            <span>RATING MODE</span>
          </h3>
          <p class="text-lg">Does this movie have a higher rating?</p>
        </RadioGroup.Item>
        <RadioGroup.Item
          value="time"
          id="time"
          class="p-6 rounded-2xl border-2 border-white data-[state=checked]:border-imdb data-[state=checked]:scale-110 duration-150 w-[21rem]"
        >
          <h3 class="text-2xl font-impactt tracking-wider flex justify-center items-center gap-1">
            <iconify-icon icon="material-symbols:event-outline-rounded" class=""></iconify-icon>
            <span>TIME MODE</span>
          </h3>
          <p class="text-lg">Is this movie newer or older?</p>
        </RadioGroup.Item>
      </RadioGroup.Root>

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
    <!-- <h1 class="font-impactt text-4xl">YO whats up</h1> -->
    <Tabs.Root value="rating" class="p-8 pb-12 h-full w-full flex">
      <Tabs.Content value="rating" class="border-2 border-white rounded-2xl p-6 flex-grow z-10 bg-black">
        <h1 class="font-impactt text-3xl text-center border-b-2 border-white w-full pb-4">
          Rating Mode Leaderboard
        </h1>

        <div class="flex justify-center items-end p-4 gap-16">
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl">{data.rating_leaderboard[1].username}</h2>
            <div class="w-28 h-[4.5rem] border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.rating_leaderboard[1].score}
            </div>
          </div>
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl flex items-center gap-1">
              <iconify-icon icon="mingcute:trophy-fill" class="text-2xl"></iconify-icon>
              {data.rating_leaderboard[0].username}
            </h2>
            <div class="w-28 h-24 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.rating_leaderboard[0].score}
            </div>
          </div>
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl">{data.rating_leaderboard[2].username}</h2>
            <div class="w-28 h-12 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.rating_leaderboard[2].score}
            </div>
          </div>
        </div>

        <div class="grid grid-rows-10 grid-cols-2">
          {#each data.rating_leaderboard as entry}
            <p>{entry.username}: {entry.score}</p>
          {/each}
        </div>
      </Tabs.Content>
      <Tabs.Content value="budget" class="border-2 border-white rounded-2xl p-6 flex-grow z-10 bg-black">
        <h1 class="font-impactt text-3xl text-center border-b-2 border-white w-full pb-4">
          Budget Mode Leaderboard
        </h1>

        <div class="flex justify-center items-end p-4 gap-16">
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl">{data.budget_leaderboard[1].username}</h2>
            <div class="w-28 h-[4.5rem] border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.budget_leaderboard[1].score}
            </div>
          </div>
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl flex items-center gap-1">
              <iconify-icon icon="mingcute:trophy-fill" class="text-2xl"></iconify-icon>
              {data.budget_leaderboard[0].username}
            </h2>
            <div class="w-28 h-24 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.budget_leaderboard[0].score}
            </div>
          </div>
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl">{data.budget_leaderboard[2].username}</h2>
            <div class="w-28 h-12 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.budget_leaderboard[2].score}
            </div>
          </div>
        </div>

        <div class="grid grid-rows-10 grid-cols-2">
          {#each data.budget_leaderboard as entry}
            <p>{entry.username}: {entry.score}</p>
          {/each}
        </div>
      </Tabs.Content>
      <Tabs.Content value="time" class="border-2 border-white rounded-2xl p-6 flex-grow z-10 bg-black">
        <h1 class="font-impactt text-3xl text-center border-b-2 border-white w-full pb-4">
          Time Mode Leaderboard
        </h1>

        <div class="flex justify-center items-end p-4 gap-16">
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl">{data.time_leaderboard[1].username}</h2>
            <div class="w-28 h-[4.5rem] border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.time_leaderboard[1].score}
            </div>
          </div>
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl flex items-center gap-1">
              <iconify-icon icon="mingcute:trophy-fill" class="text-2xl"></iconify-icon>
              {data.time_leaderboard[0].username}
            </h2>
            <div class="w-28 h-24 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.time_leaderboard[0].score}
            </div>
          </div>
          <div class="flex flex-col justify-end items-center">
            <h2 class="text-xl">{data.time_leaderboard[2].username}</h2>
            <div class="w-28 h-12 border-x-2 border-t-2 border-imdb rounded-sm flex justify-center items-center rounded-t-lg">
              {data.time_leaderboard[2].score}
            </div>
          </div>
        </div>

        <div class="grid grid-rows-10 grid-cols-2">
          {#each data.time_leaderboard as entry}
            <p>{entry.username}: {entry.score}</p>
          {/each}
        </div>
      </Tabs.Content>

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

<!-- Info -->
<footer class="absolute bottom-0 w-screen p-2 text-sm flex gap-1 items-center z-20">
  Made with
  <a href="https://svelte.dev" target="_blank" class="h-4">
    <iconify-icon icon="ri:svelte-fill"></iconify-icon>
  </a>
  and
  <iconify-icon icon="mdi:cards-heart"></iconify-icon>
  by
  <a href="https://github.com/thcheetah777" class="underline" target="_blank">thcheetah777</a>
</footer>
