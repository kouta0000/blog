<script lang="ts">
    import { actions } from 'astro:actions';
    import {onMount} from 'svelte';
  
    let {post_id} = $props();
  
    let author_name = $state('');
    let content = $state('');
    let submitting = $state(false);
    let fetching = $state(true);
    let comments:comments[] = $state([])
    interface comments {
        id: number;
        created_at: string;
        author_name: string;
        post_id: string;
        content:string;
  }

    onMount(async () => {
        try {
            const { result }:{result:comments[]} = await actions.getComments.orThrow({post_id});
            comments = result;
        } catch(e) {
            alert('コメントの取得に失敗しました')
        } finally {
            fetching = false;
        }
    });
    async function handleSubmit() {
      submitting = true;
      try {
        const { success } = await actions.addComment.orThrow({
          post_id: post_id,
          author_name: author_name,
          content: content,
        });
  
        if (success) {
          alert('コメントを送信しました！');
          author_name = '';
          content = '';
          // ページをリロードして新しいコメントを表示
          window.location.reload();
        } else {
          alert('コメントの送信に失敗しました。');
        }
      } catch (error) {
        alert('コメントの送信に失敗しました。');
        console.error(error);
      } finally {
        submitting = false;
      }
    }
  </script>

  
  
<section class="rounded-b-xl relative mx-auto dark:bg-slate-900 w-full md:w-9/10 lg:w-4/5 p-5 flex flex-col mt-20 text-textColor/60 border border-accent-base/20 rounded-xl" >
    <h4 class="text-left my-3 flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>      
      コメント
    </h4>
    <input type="hidden" name="post_slug" bind:value={post_id} />

    <div class="mb-4 w-full ">
      <label for="author_name" class="rounded-xl block text-sm font-medium my-2 input input-base w-full dark:bg-slate-950 dark:text-slate-200"> 
        お名前
      <input type="text" class="" id="author_name" required bind:value={author_name} />
     </label>
    </div>

    <div class="mb-4 w-full">
      <label for="content" class="block text-sm font-medium my-2">コメント</label>
      <textarea id="content" class="textarea textarea-base w-full  rounded-xl" rows="4" required bind:value={content}></textarea>
    </div>

    <button type="button" class="btn btn-base w-1/2 ms-auto my-3" disabled={submitting} onclick={handleSubmit}>
      {submitting ? '送信中...' : '送信'}
    </button>
<hr class="bg-accent-base/20 mt-5"/>
<div tabindex="0" class="collapse collapse-arrow realtive mx-auto w-full  rounded-t-xl">
  <input type="checkbox" />
  <div class="collapse-title font-semibold rounded-t-xl text-sm">
      コメント： {comments.length}
  </div>
  <div class="collapse-content max-h-[50vh] overflow-y-auto w-full  p-2 rounded-b-xl">
      {#each comments as comment}
      <article class="p-6 text-base  rounded-lg ">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-light font-semibold gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                  </svg>
                  
                  
                  {comment.author_name}
                </p>
                <p class="text-sm text-light"><time datetime={comment.created_at}
                        title="February 8th, 2022">{new Date(comment.created_at).getFullYear()}年{new Date(comment.created_at).getMonth()+1}月{new Date(comment.created_at).getDate()}日</time></p>
            </div>
           
        </footer>
        <p class="text-gray-500 dark:text-gray-400 mt-4">{comment.content}</p>
        
    </article>
  {/each}
  </div>
  
</div>
</section>
