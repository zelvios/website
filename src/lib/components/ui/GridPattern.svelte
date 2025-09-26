<script>
    export let width = 20;
    export let height = 20;
    export let x = '-12';
    export let y = '4';
    export let squares = null;

    const patternId = `grid-${Math.random().toString(36).slice(2)}`;
</script>

<svg {...$$restProps} aria-hidden="true">
    <defs>
        <pattern
                height={height}
                id={patternId}
                patternUnits="userSpaceOnUse"
                width={width}
                x={x}
                y={y}
        >
            <path d={`M.5 ${height}V.5H${width}`} fill="none"/>
        </pattern>
    </defs>

    <rect fill={`url(#${patternId})`} height="100%" stroke-width="0" width="100%"/>

    {#if squares}
        <svg x={x} y={y} class="overflow-visible">
            {#each squares as [sx, sy], idx (sx + '-' + sy + '-' + idx)}
                <rect stroke-width="0"
                      width={width + 1}
                      height={height + 1}
                      x={sx * width}
                      y={sy * height}
                />
            {/each}
        </svg>
    {/if}
</svg>
