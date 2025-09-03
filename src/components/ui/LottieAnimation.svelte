
<script lang='ts'>
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
    interface Props {
        src:string;
        height:string;
        width:string;
    }
    let {src, height, width}: Props = $props();
    let controlsLayout = [
      'previousFrame',
      'playpause',
      'stop',
      'nextFrame',
      'progress',
      'frame',
      'loop',
      'spacer',
      'background',
      'snapshot',
      'zoom',
      'info',
    ];
  </script>
  
  <LottiePlayer
    src={src}
    autoplay={true}
    loop={true}
    controls={true}
    renderer="svg"
    background="transparent"
    height={height}
    width={width}
    controlsLayout={controlsLayout}
  />