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
        const result = await actions.getLikes.orThrow({ slug });
        likes = result.likes;
      } catch (e) {
        console.error('Failed to fetch likes:', e);
        error = 'いいね数を取得できませんでした。';
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
        error = 'いいねできませんでした。';
      } finally {
        updating=false;
      }
    };
  </script>
  
  <div class="like-container">
    <button class="bg-pink-50 rounded-full w-20 h-7 p-1 active:bg-pink-200 transition-all duration-800 flex items-center" onclick={handleLike}>
      <div class="rounded-full size-6 bg-pink-200 text-teal-800">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-full">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
      </svg>
      </div>
    {#if loading}
      <p class="text-sm text-center grow">...</p>
    {:else if updating}
    <p class="text-sm text-center grow">...</p>
    {:else if error}
    <p class="text-sm text-center grow">{error}</p>
    {:else}
    <p class="text-sm text-center grow ">{likes}</p>
    {/if}
  </button>
  </div>
  
 