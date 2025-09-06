<script lang='ts'>
    interface Props {
        size?:string;
    }
    let { size='s' }:Props = $props();
</script>
{#if size ==='s'} 
<div class="w-full flex justify-center">
    <div class="admax-ads" data-admax-id="e1e5398aa8ca972b65698449d0da0cfb" style="display:inline-block;"></div>
<script type="text/javascript">(admaxads = window.admaxads || []).push({admax_id: "e1e5398aa8ca972b65698449d0da0cfb",type: "banner"});</script>
<script type="text/javascript" charset="utf-8" src="https://adm.shinobi.jp/st/t.js" async></script>
</div>
{/if}
{#if size === 'm'}
<div class="w-full flex justify-center">
<div class="admax-ads" data-admax-id="95f151d5688017250c7c95003abbbbd9" style="display:inline-block;"></div>
<script type="text/javascript">(admaxads = window.admaxads || []).push({admax_id: "95f151d5688017250c7c95003abbbbd9",type: "banner"});</script>
<script type="text/javascript" charset="utf-8" src="https://adm.shinobi.jp/st/t.js" async></script>
</div>
{/if}
{#if size==='l'}
<div class="w-full flex justify-center">
<div class="admax-ads" data-admax-id="a1cebbffb885b81982438fe98b956a05" style="display:inline-block;"></div>
<script type="text/javascript">(admaxads = window.admaxads || []).push({admax_id: "a1cebbffb885b81982438fe98b956a05",type: "banner"});</script>
<script type="text/javascript" charset="utf-8" src="https://adm.shinobi.jp/st/t.js" async></script>
</div>
{/if}