<script lang="ts">
    import { onMount } from 'svelte';
    // Astro Actionsをインポート
    import { actions } from 'astro:actions';
    interface Props {
        slug:string
    }
  
    let {slug}:Props = $props();
  
    let smiles:number = $state(0);
    let updating:boolean = $state(false);
    let loading: boolean = $state(true);
    let error:string = $state('');
  
    // ページ読み込み時にいいね数を取得
    onMount(async () => {
        setTimeout(async ()=>{
            try {
        const result = await actions.getSmiles.orThrow({slug});
        smiles = result.smiles;
      } catch (e) {
        console.error('Failed to fetch likes:', e);
        error = 'fetch error';
      } finally {
        loading = false;
      }
        }, 1000);
    });
  
    // いいねボタンがクリックされた時の処理
    const handleSmile = async () => {
      updating=true;
      error='';
      try {
        const result = await actions.addSmile.orThrow({ slug });
        smiles = result.smiles;
      } catch (e) {
        console.error('Failed to add like:', e);
        error = 'error';
      } finally {
        updating=false;
      }
    };
  </script>
  
  <div class="like-container text-yellow-600">
    <button class="bg-yellow-50 rounded-full w-20 h-7 p-1 active:bg-pink-200 transition-all duration-800 flex items-center" onclick={handleSmile}>
      <div class="rounded-full size-6 bg-yellow-200 ">
        😍
    </div>
    {#if loading || updating}
      <p class="text-sm text-center grow"><span class="loading loading-bars size-3"></span></p>
    {:else if error}
    <p class="text-sm text-center grow">{error}</p>
    {:else}
    <p class="text-sm text-center grow ">{smiles}</p>
    {/if}
  </button>
  </div>
  
 