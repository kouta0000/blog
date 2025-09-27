<script lang="ts">
    import { actions } from "astro:actions";
    import { fromStore } from "svelte/store";
    let {href}:{href:string} = $props();
    let mail = $state('');
    let dummy = $state('');
    let submitting = $state(false);
    let alert = $state(false);
    let form:HTMLFormElement | undefined = $state();
    let isfinished = $state(false);
    let dialog:HTMLDialogElement | undefined = $state();

    // ダイアログが閉じられたときに実行される関数
    const resetState = () => {
        isfinished = false;
        alert = false;
    };

    const submit = async() => {
        submitting = true;
        const formData = new FormData(form);
        try{
            await fetch('/',{
                method: 'POST',
                body: formData
            })
            submitting = false;
            isfinished = true;
            setTimeout(()=>{
                dialog?.close();
            }, 3000)
        } catch(error) {
            submitting = false;
            isfinished = true;
            alert = true;
            setTimeout(()=>{
                dialog?.close();
            }, 3000)
        }
    }

    const showModal = (e:Event) => {
        e.preventDefault();
        if(dialog) dialog.showModal();
    }
</script>

<dialog onclose={resetState} bind:this={dialog} class="modal">
    {#if !isfinished}
        <div class="flex flex-col items-center">
            {#if submitting}
            <span class="loading loading-dots"></span>
            <p>送信中</p>
            {:else}
            <p>{'送信します　よろしいですか？'}</p>
            {/if}
          <div class="modal-action">
            <button onclick={submit} class="btn" disabled={submitting}>はい</button>
            <button onclick={()=> {dialog?.close();}} class="btn" disabled={submitting}>いいえ</button>
          </div>
        </div>
    {:else}

    <div class="flex flex-col items-center">
        <p>{alert ? '送信エラー' : '送信が完了しました'}</p>
    </div>
    {/if}
</dialog>
<form method="POST" name="contact" bind:this={form} onsubmit={showModal} class="space-y-6 w-full border border-accent-base/20 rounded-xl p-5" data-netlify="true">
    <div class="space-y-3 w-full p-3">
        <h4 class="">お名前・ニックネーム</h4>
        <label class="input input-base rounded-full mx-auto w-full">
            <span class="label">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="stroke-light size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </span>
              <input type="text" name="user" required/>              
        </label>
    </div>
    <div class="space-y-3 w-full p-3">
        <h4>メールアドレス</h4>
        <label class="input input-base rounded-full mx-auto w-full">
            <span class="label">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="stroke-light size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>    
            </span>          
            <input type="email" name="email" bind:value={mail} required/>
        </label>
        <p class="text-xs text-red-500">{mail.length >= 10 && !mail.includes('@') ? 'アドレスが不正です':''}</p>
        <label class="input input-base rounded-full mx-auto w-full">
            <span class="label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="size-6 stroke-lighter">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>                  
            </span>
            <input type="email" name="_dummy" bind:value={dummy} placeholder="確認のためもう一度ご入力ください" required/>
              
        </label>
        <p class="text-xs text-red-500">{dummy.length >= 10 && dummy !== mail ? 'アドレスが異なっています':'' }</p>              
    </div>
    <div class="space-y-3 w-full p-3">
        <h4>メッセージ</h4>
        <textarea name="message" class="textarea mx-auto w-full min-h-[30vh]" required></textarea>
    </div>
    <div class="flex flex-col items-end w-full">
    <button aria-label="submit button" type="submit" class="btn bg-white rounded-full dark:bg-slate-800 px-6 py-2 inine-flex items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  class="size-5 fill-accent-two/90">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
    </button>
    </div>
    <input type="text" name="_honey" style="display:none">
    <input type="hidden" name="subject" value="ブログメッセージ">

</form>
