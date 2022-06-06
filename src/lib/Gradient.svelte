<script>
import { browser } from "$app/env";
import * as Vibrant from "node-vibrant";
import { fade } from "svelte/transition";
import { blur } from "svelte/transition";
import { spotifyIsPaused } from "../store.js";

export let albumUrl;

let colors = Vibrant.from(albumUrl)
   .maxColorCount(5)
   .getSwatches()
   .then((palette) => Object.entries(palette).filter((color) => color[1]._population > 0))
   .then((colors) => colors.map((color) => color[1].hex))
   .then((colors) => colors.join(","));

var createdStyleTag = document.createElement("style");
createdStyleTag.textContent = `@keyframes gradient {
   0% {
      background-position: 0% 50%;
   }
   50% {
      background-position: 100% 50%;
   }
   100% {
      background-position: 0% 50%;
   }
}`;

document.body.appendChild(createdStyleTag);

// $: if ($spotifyIsPaused) {
//    document.body.removeChild(createdStyleTag);
// } else {
//    document.body.appendChild(createdStyleTag);
// }
</script>

<div transition:fade>
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
</div>

<!-- transition:fade="{{ delay: 0, duration: 300 }}" -->
<style>
</style>
