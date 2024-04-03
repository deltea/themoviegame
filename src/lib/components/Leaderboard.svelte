<script lang="ts">
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
	import { fade, fly } from "svelte/transition";
  import { Dialog, Tabs } from "bits-ui";
  import { localUsername, type Leaderboards, localScore } from "$lib/utils";

  import LeaderboardContent from "$lib/components/LeaderboardContent.svelte";

  let username = localUsername();
  let leaderboards: Leaderboards | null;
  export let open = false;

  async function saveUsername() {
    const response = await fetch("/api/set-username", {
      method: "POST",
      body: JSON.stringify({
        username,
        oldUsername: localUsername(),
        rating_score: localScore("rating") || 0,
        budget_score: localScore("budget") || 0,
        time_score: localScore("time") || 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Username saved!", {
        style: "background: black; border: 2px solid white; shadow: none; color: white;",
        iconTheme: {
          primary: "#e2b616",
          secondary: "#000",
        }
      });
      localUsername(username);
    } else {
      toast.error("Could not save username.", {
        style: "background: black; border: 2px solid white; shadow: none; color: white;",
        iconTheme: {
          primary: "#e2b616",
          secondary: "#000",
        }
      });
    }
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

<Dialog.Root bind:open={open}>
  <Dialog.Portal>
    <Dialog.Overlay
      transition={fade}
      transitionConfig={{ duration: 150 }}
      class="fixed bg-black/80 z-50 inset-0"
    />
    <Dialog.Content
      transition={fly}
      transitionConfig={{ y: 600, duration: 150, opacity: 100 }}
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-white flex justify-center items-center w-full h-full pointer-events-none"
    >
      <Dialog.Close class="right-8 top-8 flex justify-center items-center absolute pointer-events-auto">
        <iconify-icon icon="mingcute:close-fill" class="text-3xl"></iconify-icon>
      </Dialog.Close>

      <div class="flex flex-col justify-center items-center md:gap-4 gap-8 md:w-auto w-full">
        <Tabs.Root value="rating" class="h-full w-full flex md:flex-row flex-col flex-grow md:items-start items-center">
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

          <Tabs.List class="flex md:flex-col flex-row md:justify-normal justify-center md:mt-4 gap-2 md:w-32 flex-grow">
            <Tabs.Trigger
              value="rating"
              class="md:py-4 py-2 text-white md:border-r-2 md:border-y-2 md:border-x-0 border-b-2 border-x-2 border-white md:rounded-r-xl md:rounded-l-none rounded-b-xl duration-150 hover:bg-white hover:text-black hover:scale-110 active:scale-100 font-semibold text-lg bg-black pointer-events-auto md:w-auto w-28"
            >
              Rating Mode
            </Tabs.Trigger>
            <Tabs.Trigger
              value="budget"
              class="md:py-4 py-2 text-white md:border-r-2 md:border-y-2 md:border-x-0 border-b-2 border-x-2 border-white md:rounded-r-xl md:rounded-l-none rounded-b-xl duration-150 hover:bg-white hover:text-black hover:scale-110 active:scale-100 font-semibold text-lg bg-black pointer-events-auto md:w-auto w-28"
            >
              Budget Mode
            </Tabs.Trigger>
            <Tabs.Trigger
              value="time"
              class="md:py-4 py-2 text-white md:border-r-2 md:border-y-2 md:border-x-0 border-b-2 border-x-2 border-white md:rounded-r-xl md:rounded-l-none rounded-b-xl duration-150 hover:bg-white hover:text-black hover:scale-110 active:scale-100 font-semibold text-lg bg-black pointer-events-auto md:w-auto w-28"
            >
              Time Mode
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <form
          on:submit|preventDefault={saveUsername}
          class="flex justify-center gap-2 items-center text-white text-xl"
        >
          <input
            type="text"
            bind:value={username}
            placeholder="Username"
            class="outline-none rounded-lg border-2 border-white focus:border-imdb duration-150 bg-black py-2 px-3 placeholder:text-imdb md:w-96 w-60 pointer-events-auto"
            maxlength={40}
          />
          <button
            class="px-4 py-2 bg border-2 border-imdb duration-150 enabled:hover:scale-105 enabled:active:scale-95 enabled:hover:text-black font-impactt flex items-center gap-1 rounded-lg bg-black enabled:hover:bg-imdb text-imdb disabled:text-white disabled:border-white pointer-events-auto"
            disabled={!username}
          >
            <iconify-icon icon="mingcute:save-2-fill"></iconify-icon>
            Save
          </button>
        </form>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
