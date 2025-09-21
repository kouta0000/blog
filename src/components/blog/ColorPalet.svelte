<script lang='ts'>
    import { onMount } from "svelte";
    const initialValue = 220;
    let hue = $state(initialValue);
    let show:boolean = $state(false);
    onMount(()=>{
        const saved = localStorage.getItem('hue');
        if(saved !== null) {
            hue = parseInt(saved);
            document.documentElement.style.setProperty('--hue',`${hue}`);
        } else {
            document.documentElement.style.setProperty('--hue', `${hue}`);
        }
    })

    const updatehue = () => {
        document.documentElement.style.setProperty('--hue', `${hue}`);
        localStorage.setItem('hue', `${hue}`);
    }
    const initialize = () => {
        document.documentElement.style.setProperty('--hue', `${initialValue}`);
        localStorage.setItem('hue',`${initialValue}`);
    }
</script>

<div class='dropdown dropdown-end'>
    <button class='flex h-8 w-8 items-center justify-center rounded-lg drop-shadow-[0px_1.5px_1.5px_rgba(0,0,0,0.175)] hover:text-accent-two'>
    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="size-full p-1 icon icon-tabler icons-tabler-filled icon-tabler-palette">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2c5.498 0 10 4.002 10 9c0 1.351 -.6 2.64 -1.654 3.576c-1.03 .914 -2.412 1.424 -3.846 1.424h-2.516a1 1 0 0 0 -.5 1.875a1 1 0 0 1 .194 .14a2.3 2.3 0 0 1 -1.597 3.99l-.156 -.009l.068 .004l-.273 -.004c-5.3 -.146 -9.57 -4.416 -9.716 -9.716l-.004 -.28c0 -5.523 4.477 -10 10 -10m-3.5 6.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m8 0a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m-4 -3a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" />
    </svg>
    </button>
    <div class='dropdown-content mt-3 bg-base/20 flex flex-col items-end p-2 gap-3 bg-bgColor/30 w-40'>
        <input class="range [--range-fill:0] [--range-bg:white/0] bg-gradient-to-r from-amber-700 via-cyan-600/80 to-amber-700"  type="range" min="0" max="360" bind:value={hue} oninput={updatehue} />
        <button class='btn btn-outline btn-base btn-xs ' onclick={initialize}>戻す</button>
    </div>
</div>