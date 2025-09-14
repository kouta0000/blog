<script lang='ts'>

    interface Props {
        language:string;
    }

    let text:string = $state('');
    let copied:boolean = $state(false);
    let isadded:boolean = $state(false);
    let {language='fr'}:Props = $props();
    const consonants:string[][] = 
    language==='fr' ? 
    [['b','d','f','k','l','ɫ','m','n','p','s','t','v','z','g'],['ɲ','ʁ','ʃ','ʒ','dʒ','tʃ','ŋ']]:
    [['b','d','f','h','k','kʰ','l','m','m̩','n','n̩','p','pʰ','s','t','tʰ','v','z','g','r'],['θ','ð','ʃ','ʒ','dʒ','tʃ','ŋ','ɹ','ɾ']];
    const vowels:string[] = language==='fr'? 
    ['a','iɪ','uyøœə','eɛ','oɔ']:
    ['ɑæʌəɚɝ','iɪ','uʊ','eɛ','oɔ'];
    const others:string[][] = language==='fr' ? 
    [['ɑ̃','ɛ̃','ɔ̃'],['j','w','ɥ','ː']]:
    [['aɪ','aʊ','ɔɪ','eɪ','oʊ'],['ː','ˈ']];

    const inputToTextarea = (input:string) => {
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


<div class='bg-white rounded-xl flex flex-col items-center gap-6 p-5 sm:p-6 md:p-10'>
    <div class='w-full flex flex-col gap-5'>
    
    <textarea class='textarea bg-slate-50 w-full text-lg md:text-xl tracking-widest' bind:value={text} placeholder="キーボード入力もできます" />
    <div class='w-full flex justify-between'>
        <button class='btn btn-base rounded-full relative' onclick={copy}>
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
        <button class='btn btn-base rounded-full' onclick={()=>{addkakko('[]')}}>
            {'[...]'}
        </button>
        <button class='btn btn-base rounded-full' onclick={()=>{addkakko('//')}}>
            /.../
        </button>
        <button class='btn btn-base rounded-full' onclick={back}>
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="currentColor"  class="size-6 icon icon-tabler icons-tabler-filled icon-tabler-backspace">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 5a2 2 0 0 1 1.995 1.85l.005 .15v10a2 2 0 0 1 -1.85 1.995l-.15 .005h-11a1 1 0 0 1 -.608 -.206l-.1 -.087l-5.037 -5.04c-.809 -.904 -.847 -2.25 -.083 -3.23l.12 -.144l5 -5a1 1 0 0 1 .577 -.284l.131 -.009h11zm-7.489 4.14a1 1 0 0 0 -1.301 1.473l.083 .094l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.403 1.403l.094 -.083l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.403 -1.403l-.094 .083l-1.293 1.292l-1.293 -1.292l-.094 -.083l-.102 -.07z" />
            </svg>
        </button>
        </div>
    </div>
    </div>
    <div>
    <div class='flex justify-center'>
        <div class='flex flex-col justify-center gap-1 flex-wrap flex-1'>
        {#each consonants as cgroup}
        <div class='flex gap-1 flex-wrap justify-start'>
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
