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

  <div tabindex="0" class="collapse collapse-arrow realtive mx-auto w-full md:w-9/10 lg:w-4/5 rounded-t-xl p-5 bg-slate-50">
    <input type="checkbox" />
    <div class="collapse-title font-semibold bg-white rounded-t-xl text-sm">
        コメント： {comments.length}
    </div>
    <div class="collapse-content w-full bg-white p-2 rounded-b-xl">
        {#each comments as comment}
    <div class="chat chat-start">
        <div class="chat-image avatar flex flex-col text-xs mt-10 text-center">
            <div class="size-8 mask mask-squircle bg-teal-500">
            </div>
            {comment.author_name}
        </div>
        <div class="chat-header">
            
            <time class="text-xs opacity-50">{comment.created_at}</time>
        </div>
        <div class="chat-bubble p-3 mb-3 ml-5 break-words text-sm opacity-80">
            <p>{comment.content}</p>
        </div>
    </div>
    {/each}
    </div>
    
  </div>
  
  <div class="rounded-b-xl relative mx-auto bg-slate-50 w-full md:w-9/10 lg:w-4/5 p-5 flex flex-col items-center" >
    <input type="hidden" name="post_slug" bind:value={post_id} />

    <div class="mb-4 w-full">
      <label for="author_name" class="block text-sm font-medium">お名前</label>
      <input type="text" class="input input-accent w-full" id="author_name" required bind:value={author_name} />
    </div>

    <div class="mb-4 w-full">
      <label for="content" class="block text-sm font-medium">コメント</label>
      <textarea id="content" class="textarea textarea-accent w-full" rows="4" required bind:value={content}></textarea>
    </div>

    <button type="button" class="btn btn-accent w-full" disabled={submitting} onclick={handleSubmit}>
      {submitting ? '送信中...' : '送信'}
    </button>
</div>
