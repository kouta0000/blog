<script lang='ts'>
    import {fade} from 'svelte/transition'
    let text:string = $state('');
    let copied:boolean = $state(false);
    let isadded:boolean = $state(false);
    let textarea: HTMLTextAreaElement | undefined = $state();
    const french:string[] = ['ɲ','ʁ','ʃ','ʒ','dʒ','tʃ','ŋ','ø','œ','ə','ɛ','ɔ','ɑ̃','ɛ̃','ɔ̃', 'ɥ','ː'];
    const english: string[] = ['kʰ','m̩','n̩','pʰ','tʰ','θ','ð','ʃ','ʒ','dʒ','tʃ','ŋ','ɹ','ɾ','aɪ','aʊ','ɔɪ','eɪ','oʊ','ː'];
    const german:string[] = [
  "ʃ", // シュ音 (sch)
  "ç", // ヒ音 (ich)
  "ʁ", // R音（喉の奥で発音）
  "ŋ", // ng音
  "ʒ", // ジ音（Genieなど）
  "ø", // Öの長母音
  "œ", // Öの短母音
  "ʏ", // Üの短母音
  "y", // Üの長母音（キーボードにはあるけどIPAとして使うときは特別）
  "ɐ", // 弱母音（erなど）
  "ə", // シュワー音（eの弱化）
  "aɪ̯", "aʊ̯", "ɔɪ̯", // 二重母音
  "t͡s", "p͡f", "t͡ʃ", "d͡ʒ" // 破擦音
];
    let keyboards:string[] = $state(french);
    


    const inputToTextarea = (input:string) => {
        if(textarea && textarea.selectionStart) {
            const index = textarea.selectionStart;
            text = text.slice(0,index) + input + text.slice(index);
            return
        }
        text += input;
    }
    const back = ()=>{
        text = text.slice(0,text.length-1);
    }
    const addkakko = (input:string)=>{

            text = input[0]+text+input[1];
        
    }
    const copy = async() => {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
      setTimeout(() => (copied = false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
      alert("コピーに失敗しました");
    }
  }
</script>
<h1>IPA入力機</h1>
<div role="tablist" class="tabs tabs-border bg-slate-100 dakr:bg-slate-900 w-full divide flex justify-end">
    <a role="tab active:tab-active" onclick={()=>keyboards = french} class="tab">仏</a>
    <a role="tab active:tab-active" onclick={()=>keyboards = english} class="tab">英</a>
    <a role="tab" onclick={()=>keyboards=german} class="tab disabled">独</a>
  </div>
<div class='bg-accent-base rounded-xl min-h-[50vh] flex flex-col items-center gap-10 p-10 sm:p-6 md:p-10'>
    
    <div class='w-full flex flex-col gap-6'>
    
        <textarea bind:this={textarea} class='textarea bg-slate-50 dark:bg-slate-900 w-full text-xl text-center md:text-2xl tracking-widest' bind:value={text} placeholder="キーボード入力もできます" ></textarea>
        <div id="buttons" class='w-full flex justify-between gap-1'>
            <button class='btn btn-base btn-xs sm:btn-md rounded-full relative' onclick={copy}>
                copy
                {#if copied}
                <div class='absolute bottom-[100%] -right-3 rounded-xl bg-teal-200/40 text-center text-xs p-1'>
                    <p>copied ☺</p>
                </div>
                {/if}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                    class='size-6'>
                    <path d="M10 13h.01" />
                    <path d="M14 13h.01" />
                    <path d="M10 16a3.5 3.5 0 0 0 4 0" />
                    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                    <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                </svg>
            </button>
            <div>
                <button class='btn btn-base btn-xs sm:btn-md rounded-full' onclick={()=>{addkakko('[]')}}>
                    {'[...]'}
                </button>
                <button class='btn btn-base btn-xs sm:btn-md rounded-full' onclick={()=>{addkakko('//')}}>
                    /.../
                </button>
                <button class='btn btn-base btn-xs sm:btn-md rounded-full' onclick={back}>
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="currentColor"  class="size-6 icon icon-tabler icons-tabler-filled icon-tabler-backspace">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M20 5a2 2 0 0 1 1.995 1.85l.005 .15v10a2 2 0 0 1 -1.85 1.995l-.15 .005h-11a1 1 0 0 1 -.608 -.206l-.1 -.087l-5.037 -5.04c-.809 -.904 -.847 -2.25 -.083 -3.23l.12 -.144l5 -5a1 1 0 0 1 .577 -.284l.131 -.009h11zm-7.489 4.14a1 1 0 0 0 -1.301 1.473l.083 .094l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.403 1.403l.094 -.083l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.403 -1.403l-.094 .083l-1.293 1.292l-1.293 -1.292l-.094 -.083l-.102 -.07z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <div class='flex justify-center w-full'>
        
        
        <div class='grid gap-3 grid-cols-4 md:grid-cols-5'>
        {#each keyboards as k, (i)}
        <div transition:fade class='size-14 sm:size-16 md:size-20 relative rounded-md pointer-events-auto group'>
        <span class="bg-black dark:bg-white absolute inset-0 rounded-lg group-active:scale-90"></span>
        <button class='inset-shadow shadow-xl bg-slate-600 text-white text-xl font-semibold dark:bg-slate-900 rounded-md cursor-pointer z-2 absolute inset-1.5 -translate-y-2 active:translate-y-0 transition-all duration-100 pointer-events-auto' onclick={()=>{inputToTextarea(k)}}>
            {k}
        </button>
        </div>
        {/each}
        </div>
        
    </div>
        
    
</div>
