<script lang="ts">
  import { Tabs } from "bits-ui";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
	import {
    localUsername,
    type GameMode,
    type Leaderboards,

    localScore

  } from "$lib/utils";

  import Title from "$lib/components/Title.svelte";
  import LeaderboardContent from "$lib/components/LeaderboardContent.svelte";
  import Footer from "$lib/components/Footer.svelte";
	import GameModeSelect from "$lib/components/GameModeSelect.svelte";

  let gameMode: GameMode = "rating";
  let username = localUsername();
  let leaderboards: Leaderboards | null;

  function saveUsername() {
    toast.promise(
      fetch("/api/set-username", {
        method: "POST",
        body: JSON.stringify({
          username,
          oldUsername: localUsername(),
          score: localScore() || 0,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Saving...",
        success: "Username saved!",
        error: "Could not save.",
      },
      {
        style: "background: black; border: 2px solid white; shadow: none; color: white;",
        iconTheme: {
          primary: "#e2b616",
          secondary: "#000",
        }
      },
    );

    localUsername(username);
  }

  async function loadLeaderboard() {
    leaderboards = null;

    const response = await fetch("/api/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    leaderboards = await response.json();
  }

  onMount(loadLeaderboard);
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
  <div class="h-screen w-full bg-black text-white flex justify-center items-center p-6 pb-12" id="leaderboard">
    <div class="flex flex-col justify-center items-center gap-4">
      <Tabs.Root value="rating" class="h-full flex flex-grow">
        <LeaderboardContent
          leaderboard={leaderboards?.rating_leaderboard}
          value="rating"
          refresh={loadLeaderboard}
        >
          Rating Mode Leaderboard
        </LeaderboardContent>
        <LeaderboardContent
          leaderboard={leaderboards?.budget_leaderboard}
          value="budget"
          refresh={loadLeaderboard}
        >
          Budget Mode Leaderboard
        </LeaderboardContent>
        <LeaderboardContent
          leaderboard={leaderboards?.time_leaderboard}
          value="time"
          refresh={loadLeaderboard}
        >
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

      <form
        on:submit|preventDefault={saveUsername}
        class="py6 flex justify-center gap-2 items-center text-white text-xl"
      >
        <input
          type="text"
          bind:value={username}
          placeholder="Username"
          class="outline-none rounded-lg border-2 border-white focus:border-imdb duration-150 bg-black py-2 px-3 placeholder:text-imdb w-96"
        />
        <button
          class="px-4 py-2 bg border-2 border-imdb duration-150 hover:scale-105 active:scale-95 hover:text-black font-impactt flex items-center gap-1 rounded-lg bg-black hover:bg-imdb text-imdb"
        >
          <iconify-icon icon="mingcute:save-2-fill"></iconify-icon>
          Save
        </button>
      </form>
    </div>
  </div>
</main>

<Footer />
