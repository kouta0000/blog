<script lang='ts'>
    import { onMount } from "svelte";
    interface Props {
        size?:string;
    }
    const srcs = {
        s:'https://adm.shinobi.jp/s/e1e5398aa8ca972b65698449d0da0cfb',
        m:'https://adm.shinobi.jp/s/95f151d5688017250c7c95003abbbbd9',
        l:'https://adm.shinobi.jp/s/a1cebbffb885b81982438fe98b956a05',
    }
    let { size='s' }:Props = $props();
    onMount(()=>{
        const script = document.createElement('script');
        switch(size) {
            case 's':
                script.src = srcs.s;
                break;
            case 'm':
                script.src = srcs.m;
                break;
            case 'l':
                script.src = srcs.l;
                break;
        }
        script.onload = ()=>{
            if(container) {
                container.appendChild(script);
            }
        }
    })
    let container:HTMLDivElement | undefined = $state();
</script>
<div bind:this={container} class='w-full flex justify-center'>

</div>