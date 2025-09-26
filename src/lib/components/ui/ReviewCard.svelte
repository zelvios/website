<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import { cn } from "$lib/utils";

    export let icon: typeof SvelteComponent;
    export let name: string;
    export let body: string;
</script>

<figure class={cn("relative w-64 cursor-pointer overflow-hidden rounded-2xl border p-4 border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]")} >
    <div class="flex flex-row items-center gap-2">
        <svelte:component this={icon} class="w-8 h-8" />
        <div class="flex flex-col">
            <figcaption class="text-accent text-sm font-medium">{name}</figcaption>
        </div>
    </div>
    <blockquote class="mt-2 text-sm">{body}</blockquote>
</figure>