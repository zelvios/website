<script>
    export let name;
    export let active = false;

    const iconPath = `/images/icons/${name.toLowerCase()}.svg`;
</script>

<button class="card text-gray-300 w-[120px] transition-all cursor-pointer group
               bg-gradient-to-tl from-gray-900 to-gray-950
               border-r-2 border-t-2 border-gray-900 rounded-lg overflow-hidden relative
               hover:brightness-90 {active ? 'brightness-90' : ''}" on:click>
    <div class="px-3 py-4 flex flex-col items-center text-center">
        <img alt={`${name} Logo`}
             class={`w-8 h-8 mb-3 transition-all
             group-hover:-translate-y-1 ${active ? '-translate-y-1' : ''}
             group-hover:drop-shadow-[0_0_6px_rgba(203,166,247,0.5)]
             ${active ? 'drop-shadow-[0_0_6px_rgba(203,166,247,0.5)]' : ''}`}
             src={iconPath}/>

        <div class="lowercase font-bold text-lg text-text">{name}</div>
    </div>

    <div class="h-2 w-full bg-gradient-to-l via-accent rounded transition-all absolute bottom-0 {active ? 'blur-xl' : 'group-hover:blur-xl blur-2xl'}"
    ></div>

    <div class="h-0.5 m-auto rounded transition-all {active ? 'w-full bg-gradient-to-l via-accent' : 'w-[70%] bg-gradient-to-l via-accent2 group-hover:w-full group-hover:via-accent'}"></div>
</button>
