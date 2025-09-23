<script lang='ts'>
    import { onMount } from "svelte";
    let hue = $state(220);
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
        document.documentElement.style.setProperty('--hue', `${220}`);
        localStorage.setItem('hue',`${220}`);
    }
</script>

<div class='dropdown dropdown-left dropdown-center size-full'>
    <div tabindex="0" role="button" class='flex size-full items-center justify-center rounded-lg drop-shadow-[0px_1.5px_1.5px_rgba(0,0,0,0.175)] hover:text-accent-two'>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><title>palette_fill</title><g id="palette_fill" fill='none' fill-rule='evenodd'><path d='M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z'/><path fill='#09244BFF' d='M12 2c5.523 0 10 4.477 10 10 0 .649-.062 1.284-.18 1.9-.373 1.935-2.26 2.791-3.907 2.595l-.175-.025-1.74-.29a1.29 1.29 0 0 0-1.124.36c-.37.37-.547.879-.298 1.376.423.846.429 1.812.055 2.603C14.131 21.58 13.11 22 12 22 6.477 22 2 17.523 2 12S6.477 2 12 2m-4.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m7-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3'/></g></svg>
</div>
    <div class='dropdown-content mt-3 bg-bgColor shadow-lg  rounded-xl  flex p-5 gap-3 w-60 mr-5'>
        
        <input class="range [--range-fill:0] [--range-bg:white/0] bg-gradient-to-r from-amber-700 via-cyan-600/80 to-amber-700"  type="range" min="0" max="360" bind:value={hue} oninput={updatehue} />
        <button class='btn btn-ghost btn-base btn-xs ' onclick={initialize}>戻す</button>
        
    </div>
</div>