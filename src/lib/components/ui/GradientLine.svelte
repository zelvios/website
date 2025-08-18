<script lang="ts">
    export let height = 0.5;
    export let glowOpacity = 0.7;
    export let glowBlur = "blur-md";

    const color1 = "#701EFC";
    const color2 = "#CBB3F3";

    const [startColor, endColor] = Math.random() > 0.5 ? [color1, color2] : [color2, color1];

    const leftPercent = Math.random() * 20 + 5; // 5% - 25%
    const rightPercent = 100 - (Math.random() * 20 + 5); // 75% - 95%
</script>

<div class="w-full flex justify-center mt-4">
    <div class="w-full max-w-3xl" style="height: {height}px; position: relative;">
        <div class={`absolute inset-0 rounded-full ${glowBlur}`}
             style="opacity: {glowOpacity}; background: linear-gradient(to right, rgba(128,128,128,0) 0%, {startColor} {leftPercent}%, {endColor} {rightPercent}%, rgba(128,128,128,0) 100%);"
        ></div>
        <div class="absolute inset-0 rounded-full"
             style="background: linear-gradient(to right, rgba(128,128,128,0) 0%, {startColor} {leftPercent}%, {endColor} {rightPercent}%, rgba(128,128,128,0) 100%);"
        ></div>
    </div>
</div>
