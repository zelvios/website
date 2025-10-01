<script lang="ts">
    import {cn} from "$lib/utils";
    import {onMount} from "svelte";

    export let number = 10;
    let meteorStyles: any = [];
    let changeMeteors = (num: number) => {
        meteorStyles = [];
        const width = window.innerWidth;

        meteorStyles = [...new Array(num)].map(() => {
            const random = (Math.random() + Math.random()) / 2;
            return {
                top: -20,
                left: Math.floor(random * width) + "px",
                animationDelay: Math.random() * 1 + 0.2 + "s",
                animationDuration: Math.floor(Math.random() * 8 + 2.9) + "s",
            };
        });
    };

    onMount(() => {
        changeMeteors(number);
    });
</script>

{#each meteorStyles as style, idx}
  <span
          id="meteor-{idx+1}"
          class={cn(
      "pointer-events-none absolute left-1/2 top-1/2 size-[2.4px] rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
    )}
          style="top: {style.top}px; left: {style.left}; animation-delay: {style.animationDelay}; animation-duration: {style.animationDuration};"
  >
    <div
            class="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 via-accent2 to-transparent"
    />
  </span>
{/each}
