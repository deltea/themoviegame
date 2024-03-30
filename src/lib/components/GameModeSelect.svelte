<script lang="ts">
  import { RadioGroup } from "bits-ui";
  import type { GameMode } from "$lib/utils";

  export let gameMode: GameMode;
</script>

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
