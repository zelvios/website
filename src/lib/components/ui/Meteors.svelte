<script>
    import { onMount } from "svelte";

    export let number = 10;
    let meteorStyles = [];

    onMount(() => {
        meteorStyles = Array.from({ length: number }, () => ({
            top: `${-100 + Math.random() * 70}px`,
            left: `${Math.floor(Math.random() * window.innerWidth)}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
        }));
    });
</script>

{#each meteorStyles as style, idx}
  <span
          class="pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={`
      top: ${style.top};
      left: ${style.left};
      animation-delay: ${style.animationDelay};
      animation-duration: ${style.animationDuration};
    `}
  >
    <div
            class="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent"
    ></div>
  </span>
{/each}
