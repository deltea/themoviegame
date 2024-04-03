<script lang="ts">
  export let icon: string | null = null;
</script>

<button
  class="border-2 border-imdb bg-black hover:bg-imdb duration-150 rounded-lg px-3 py-1 text-imdb hover:text-black font-impactt md:text-4xl text-3xl w-full flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
  on:click
>
  {#if icon}
    <iconify-icon
      icon={icon}
      class="scale-0 group-hover:scale-100 duration-150"
    ></iconify-icon>
  {/if}

  <slot />

  {#if icon}
    <iconify-icon
      icon={icon}
      class="scale-0 group-hover:scale-100 duration-150"
    ></iconify-icon>
  {/if}
</button>
