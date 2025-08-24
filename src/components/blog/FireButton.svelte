<script lang="ts">
    import { onMount } from 'svelte';
    // Astro Actionsをインポート
    import { actions } from 'astro:actions';
    interface Props {
        slug:string
    }
  
    let {slug}:Props = $props();
  
    let fires:number = $state(0);
    let updating:boolean = $state(false);
    let loading: boolean = $state(true);
    let error:string = $state('');
  
    // ページ読み込み時にいいね数を取得
    onMount(async () => {
        setTimeout(async ()=>{
            try {
        const result = await actions.getFires.orThrow({slug});
        fires = result.fires;
      } catch (e) {
        console.error('Failed to fetch likes:', e);
        error = 'fetch error';
      } finally {
        loading = false;
      }
        }, 1000);
    });
  
    // いいねボタンがクリックされた時の処理
    const handleFire = async () => {
      updating=true;
      error='';
      try {
        const result = await actions.addFire.orThrow({ slug });
        fires = result.fires;
      } catch (e) {
        console.error('Failed to add like:', e);
        error = 'error';
      } finally {
        updating=false;
      }
    };
  </script>
  
  <div class="like-container text-orange-600">
    <button class="bg-rose-50 rounded-full w-20 h-7 p-1 active:bg-pink-200 transition-all duration-800 flex items-center" onclick={handleFire}>
      <div class="rounded-full size-6 bg-rose-200 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
        </svg>
    </div>
    {#if loading || updating}
      <p class="text-sm text-center grow"><span class="loading loading-dots size-3"></span></p>
    {:else if error}
    <p class="text-sm text-center grow">{error}</p>
    {:else}
    <p class="text-sm text-center grow">{fires}</p>
    {/if}
  </button>
  </div>
  
 