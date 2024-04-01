<script lang="ts">
  import "@fontsource-variable/inter";
  import "@fontsource-variable/roboto-condensed";
  import "iconify-icon";
  import "../global.css";
  import { Toaster } from "svelte-french-toast";
</script>

<svelte:head>
  <title>The Movie Game</title>
</svelte:head>

<div class="h-screen">
  <slot />
</div>

<Toaster />
