<script lang='ts'>
    import { onMount } from "svelte";
    
    interface Props {
        size?: string;
    }

    const srcs = {
        s: 'https://adm.shinobi.jp/s/e1e5398aa8ca972b65698449d0da0cfb',
        m: 'https://adm.shinobi.jp/s/95f151d5688017250c7c95003abbbbd9',
        l: 'https://adm.shinobi.jp/s/a1cebbffb885b81982438fe98b956a05',
    };

    let { size }:Props = $props();
    let container: HTMLDivElement | undefined = $state();

    onMount(() => {
        if (container) {
            const script = document.createElement('script');
            const scriptSrc = srcs[size as keyof typeof srcs] || srcs.s;
            script.src = scriptSrc;
            
            // スクリプトのロードが完了したことを確認してから要素を挿入
            // これにより、DOMが準備完了した状態でのみ実行される
            script.onload = () => {
                if(container) {
                    container.appendChild(script);
                }
            };
            
            // script.onloadイベントをトリガーするために、DOMのどこかに仮でスクリプトを挿入
            // ただし、これだと二重に挿入される可能性があるので、以下に別の方法を提案
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(script);

            // この方法がうまく行かない場合、直接 body に挿入する方法を試す
            // document.body.appendChild(script);
        }
    });
</script>

<div bind:this={container} class='w-full flex justify-center'></div>