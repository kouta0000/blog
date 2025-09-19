<script lang="ts">
    import { onMount } from 'svelte';
    // Astro Actionsをインポート
    import { actions } from 'astro:actions';
    interface Props {
        slug:string
    }
  
    let {slug}:Props = $props();
    let likes:number = $state(0);
    let updating:boolean = $state(false);
    let loading: boolean = $state(true);
    let error:string = $state('');
  
    // ページ読み込み時にいいね数を取得
    onMount(async () => {
      try {
        const result = await actions.getLikes.orThrow({slug});
        likes = result.likes;
      } catch (e) {
        console.error('Failed to fetch likes:', e);
        error = 'fetch error';
      } finally {
        loading = false;
      }
    });
  
    // いいねボタンがクリックされた時の処理
    const handleLike = async () => {
      updating=true;
      try {
        const result = await actions.addLike.orThrow({ slug });
        likes = result.likes;
      } catch (e) {
        console.error('Failed to add like:', e);
        error = 'error';
      } finally {
        updating=false;
      }
    };
  </script>
  
  <div class="like-container ">
    <button class="bg-accent-one/10 text-accent-one/50 rounded-full size-10 p-2  transition-all duration-800" onclick={handleLike}>
      
      {#if loading || updating}
      <span class="loading loading-dots loading-xs size-full"></span>
      {:else}
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-heart size-full">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      </svg>
      {/if}
      </button>
  <p class="text-sm text-center text-light grow mt-1">{!error ? likes:'error'}</p>
  </div>
  
 