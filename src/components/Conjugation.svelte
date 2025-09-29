<script lang='ts'>
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas-pro';
  let table:HTMLDivElement | undefined = $state();
  let modesf = $state([
    {mode:'現在', show:true},{mode:'半過去', show:true},{mode:'複合過去', show:true},{mode:'大過去', show:false},{mode:'単純未来', show:true},{mode:'条件法現在', show:false},{mode:'接続法', show:false}
  ]);
  const subjectsf = [
    'je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'
  ]
  let generating = $state(false);
  let verbf = $state('')
  const handleClick = async () => {
    generating=true;
    if (!table) {
      console.error('要素が見つかりません');
      generating=false;
      return;
    }
    try {
      
      const canvas = await html2canvas(table, {
        scale:2,
        width:1684,
        height:1190
      });
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'landscape', // 横向き
        unit: 'px',
        format: [842,595]
      });
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // 4. PDFを保存
      doc.save('conjugaison_' + verbf + '.pdf');

    } catch (error) {
      console.error('PDF生成に失敗しました:', error);
    } finally {
      generating=false;
    }
  };
</script>
   
    <div class="text-textColor">
      <h1 class="font-headings mt-20 mb-5">動詞活用テスト作成機</h1>
      <label class='input input-accent'>
        <span class='label'>動詞</span>
        <input type='text' bind:value={verbf} class="">
      </label>
      <h2 class="font-headings my-4">追加したい法・時制をチェックしてください</h2>
      <div class='flex gap-2 my-4 flex-wrap'>
      {#each modesf as m}
      <label class='label'>
      <input type="checkbox" class="checkbox checkbox-accent"  bind:checked={m.show} >
      {m.mode}
      </label>
      {/each}
      </div>
    </div>
    <div class="overflow-x-auto bg-bgColor rounded-xl my-6">
        <table class="table">
          <!-- head -->
          <thead class='bg-accent-base/20'>
            <tr>
              <th class='font-bold text-lg text-center'>{verbf}</th>
              {#each modesf as m}
              {#if m.show}<th class='border-x-2 border-accent-base/10 text-center'>{m.mode}</th>{/if}
              {/each}
            </tr>
          </thead>
          <tbody class=''>
            {#each subjectsf as subject}
            <tr class=''>
              
              <th class='border-y-2 border-accent-base/20 text-center bg-accent-base/20'>{subject}</th>
              {#each modesf as m}
              {#if m.show}<th class='border-2 border-accent-base/10'></th>{/if}
              {/each}
            </tr>
            {/each}
            <tr class=''>
              <th class='border-2 border-gray-200 bg-accent-base/20'>現在分詞</th>
              <th class='border-2 border-accent-base/10 '></th>
              <th class='border-2 border-gray-200 bg-accent-base/20'>過去分詞</th>
              <th class='border-2 border-accent-base/10'></th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class='flex justify-end my-6'>
      <button class="btn btn-accent p-6 inline-flex gap-4 shadow-xl" onclick={handleClick}>
        pdfをダウンロード
        {#if !generating}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 bg-teal-200 rounded-lg p-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
        </svg>
       {:else}
       <span class='size-9 loading loading-spinner'></span>
       {/if}
      </button>
      </div>


<div class="w-full h-10 overflow-hidden">
      <div class="bg-white rounded-xl my-6  absolute left-[9999px] w-[1684px] h-[1190px]" bind:this={table}>
        <table class="table ">
          <!-- head -->
          <thead class='bg-gray-100'>
            <tr class='flex'>
              <th class='font-bold text-5xl text-black text-center h-[160px] flex-1 flex items-center justify-center'>{verbf}</th>
              {#each modesf as m}
              {#if m.show}<th class='border-x-2 text-3xl h-[160px] text-black border-gray-2 text-center flex-1 flex items-center justify-center'>{m.mode}</th>{/if}
              {/each}
            </tr>
          </thead>
          <tbody class=''>
            {#each subjectsf as subject}
            <tr class='flex'>
              
              <th class='border-y-2 border-gray-300 text-3xl text-center h-[150px] bg-gray-100 flex-1 flex items-center justify-center'>{subject}</th>
              {#each modesf as m}
              {#if m.show}<th class='border-2 border-gray-200 h-[150px] flex-1 flex items-center justify-center'></th>{/if}
              {/each}
            </tr>
            {/each}
            <tr class='flex'>
              <th class='border-2 border-gray-200 h-[130px] flex-1 flex items-center justify-center text-3xl bg-gray-100'>現在分詞</th>
              <th class='border-2 border-gray-200 h-[130px] flex-1 flex items-center justify-center'></th>
              <th class='border-2 border-gray-200 h-[130px] flex-1 flex items-center justify-center text-3xl bg-gray-100'>過去分詞</th>
              <th class='border-2 border-gray-200 h-[130px] flex-1 flex items-center justify-center'></th>
            </tr>
          </tbody>
        </table>
      </div>

</div>
      
  