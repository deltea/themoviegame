<script lang="ts">
  import { Tooltip } from "bits-ui";
  import { fly } from "svelte/transition";

  export let text: string;
  export let side: "top" | "right" | "bottom" | "left" | undefined = "top";
</script>

<Tooltip.Root openDelay={0}>
  <Tooltip.Trigger class="cursor-default flex items-center">
    <slot />
  </Tooltip.Trigger>
  <Tooltip.Content
    transition={fly}
    transitionConfig={{ y: -8, duration: 150 }}
    sideOffset={8}
    class="z-50"
    {side}
    {...$$restProps}
  >
    <div class="bg-black">
      <Tooltip.Arrow class="border-l-2 border-t-2 border-white rounded-[4px]" size={12} />
    </div>
    <div class="flex justify-center items-center border-2 border-white py-2 px-4 bg-black rounded-md">
      {text}
    </div>
  </Tooltip.Content>
</Tooltip.Root>
