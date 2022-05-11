<script>
import { browser } from "$app/env";
import * as Vibrant from "node-vibrant";
import { fade } from "svelte/transition";
import { blur } from "svelte/transition";

export let albumUrl;

let colors = Vibrant.from(albumUrl)
   .maxColorCount(5)
   .getSwatches()
   .then((palette) => Object.entries(palette).filter((color) => color[1]._population > 0))
   .then((colors) => colors.map((color) => color[1].hex))
   .then((colors) => colors.join(","));

console.log(colors);

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
// document.body.removeChild(createdStyleTag);
</script>

{#if browser}
   {#await colors then colors}
      <div
         class="fixed top-0 -z-50 h-full w-full body"
         style=" background: linear-gradient(-45deg, {colors});
     animation: gradient 45s ease infinite; 

      background-size: 400% 400%;
      height: 100vh;">
      </div>
   {/await}
{/if}

<!-- transition:fade="{{ delay: 0, duration: 300 }}" -->
<style>
</style>
