<script>
import { browser } from "$app/env";
import * as Vibrant from "node-vibrant";
import { fade } from "svelte/transition";
import { spotifyIsPaused, colors } from "../store.js";

// export let albumUrl;

// $: colors.set(
//    Vibrant.from(albumUrl)
//       .maxColorCount(5)
//       .getSwatches()
//       .then((palette) => Object.entries(palette).filter((color) => color[1]._population > 0))
//       .then((colors) => colors.map((color) => color[1].hex))
// );

// $: console.log($colors);
// var createdStyleTag = document.createElement("style");
// createdStyleTag.textContent = `@keyframes gradient {
//    0% {
//       background-position: 0% 50%;
//    }
//    50% {
//       background-position: 100% 50%;
//    }
//    100% {
//       background-position: 0% 50%;
//    }
// }`;

// document.body.appendChild(createdStyleTag);

// $: if ($spotifyIsPaused) {
//    document.body.removeChild(createdStyleTag);
// } else {
//    document.body.appendChild(createdStyleTag);
// }
</script>

<!-- <div transition:fade>
   {#await colors then colors}
      <div
         class="fixed top-0 -z-50 h-full w-full body bg-slate-600"
         style=" background: linear-gradient(-45deg, {colors});
     animation: gradient 45s ease infinite; 
      background-size: 400% 400%;
      height: 100vh;">
      </div>
   {/await}
   <div class="body fixed top-0 -z-40 h-full w-full bg-black/30"></div>
</div> -->

<!-- <div class="z-1 absolute  left-1/2 h-96   bg-black"></div> -->

<div transition:fade class="absolute left-1/2 top-[-300px] -z-50 w-[75rem] -translate-x-1/2">
   {#await colors then colors}
      <!-- <div
         class="absolute top-16 -z-30 h-96 w-full"
         style="   background:linear-gradient(90deg, rgba(255, 255, 255, 1) 1%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0.3) 85%, rgba(255, 255, 255, 1) 100%);
         ">
      </div> -->
      <!-- 
      <div
         class="absolute -z-30 h-[500px] w-[75rem]"
         style="background:linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.15) 85%, rgba(255, 255, 255, 1) 100%);
         ">
      </div>

      <div
         class="absolute -z-30 h-[500px] w-[75rem]"
         style="background:radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 95%);">
      </div>

      <div
         class="absolute  -z-50 h-[500px] w-[75rem] opacity-60"
         style=" background: linear-gradient(-45deg, {colors.join(',')});
  animation: gradient 30s ease infinite; 
  background-size: 400% 400%
   ">
      </div> -->
   {/await}
</div>

<!-- {#if $colors}
   {#await $colors then colors}
      <div transition:fade class="">
         <div
            class="absolute top-[-200px] right-[-600px]  h-[700px] w-[1000px] -z-50"
            style="background:radial-gradient(circle at 50% 50%, {colors[0]} 0%, rgba(255, 255, 255, 0) 50%);
">
         </div>
         <div
            class="absolute top-[-200px] left-[-600px] -z-50 h-[700px] w-[1000px]  bg-black "
            style="background:radial-gradient(circle at 50% 50%, {colors[1]} 0%, rgba(255, 255, 255, 0) 60%);
">
         </div>
         <div
            class="absolute top-[-500px] left-[40%] -z-50 h-[700px] w-[1000px]  bg-black "
            style="background:radial-gradient(circle at 50% 50%, {colors[2]} 0%, rgba(255, 255, 255, 0) 60%); opacity: 1;
">
         </div>
         <div
            class="absolute top-[-500px] right-[40%] -z-50 h-[700px] w-[1000px]  bg-black "
            style="background:radial-gradient(circle at 50% 50%, {colors[3] || colors[0]} 0%, rgba(255, 255, 255, 0) 60%);
">
         </div>
      </div>
   {/await}
{/if} -->

<!-- transition:fade="{{ delay: 0, duration: 300 }}" -->
<style>
</style>
