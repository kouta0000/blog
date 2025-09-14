<script lang='ts'>
    let text:string = $state('');
    let copied:boolean = $state(false);
    const consonants:string[][] = [['b','d','f','k','l','ɫ','m','n','p','s','t','v','z','g'],['ɲ','ʁ','ʃ','ʒ','dʒ','tʃ','ŋ']];
    const vowels:string[] = ['a','iɪ','uyøœə','eɛ','oɔ'];
    const others:string[][] = [['ɑ̃','ɛ̃','ɔ̃'],['j','w','ɥ','ː']];

    const inputToTextarea = (input:string) => {
        text += input;
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


<div class='bg-white rounded-xl flex flex-col items-center gap-10 p-10'>
    <button class='btn btn-base rounded-full self-end relative' onclick={copy}>
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
    <textarea class='textarea bg-slate-50 w-full text-xl tracking-widest' bind:value={text} placeholder="キーボード入力も可能です" />
    <div>
    <div class='flex justify-center'>
        <div class='flex flex-col justify-center gap-2 flex-wrap flex-1'>
        {#each consonants as cgroup}
        <div class='flex gap-2 flex-wrap justify-start'>
        {#each cgroup as c}
        <button class='kbd size-10 cursor-pointer' onclick={()=>{inputToTextarea(c)}}>
            {c}
        </button>
        {/each}
        </div>
        {/each}
        </div>
        <div class='flex justify-center gap-1 flex-wrap flex-1'>
            {#each vowels as vgroup}
            <div class='flex gap-1 flex-wrap justify-center'>
            {#each vgroup as v}
            <button class='kbd size-10 cursor-pointer' onclick={()=>{inputToTextarea(v)}}>
                {v}
            </button>
            {/each}
            </div>
            {/each}
            {#each others as vgroup}
            <div class='flex gap-1 flex-wrap justify-center'>
            {#each vgroup as v}
            <button class='kbd size-10 cursor-pointer' onclick={()=>{inputToTextarea(v)}}>
                {v}
            </button>
            {/each}
            </div>
            {/each}
        </div>
        <div class='flex justify-center flex-wrap grid-col-1 grid-row-2'>
            
        </div>
    </div>
    </div>
</div>