<script>
import { caroselData } from "../home.js";
import { onMount } from "svelte";
</script>

<!-- 
<div id="container">
   <div class="photobanner flex flex-row">
      {#each caroselData as track}
         <a class="" href="{`/track/${track.track.id}`}">
            <div class="relative mx-2 h-32 w-32 overflow-hidden ">
               <img class="h-32 rounded-xl" src="{track.track.album.images[0].url}" alt="" />
               <div
                  class=" text-md absolute inset-x-0 bottom-0 flex h-32 w-full flex-col rounded-xl bg-black/30 py-2.5 px-3 text-center  text-white backdrop-blur-sm hover:bg-black/10 ">
                  {track.name}
                  <p class="mt-auto text-xs">{track.primaryArtist}</p>
               </div>
            </div>
         </a>
      {/each}
      {#each caroselData.slice(0, 4) as track}
         <a href="{`/track/${track.track.id}`}">
            <div class="relative h-32 w-32 overflow-hidden ">
               <img class="h-32 rounded-xl" src="{track.track.album.images[0].url}" alt="" />
               <div
                  class=" text-md absolute inset-x-0 bottom-0 flex h-32 w-full flex-col rounded-xl bg-black/30 py-2.5 px-3 text-center  text-white  backdrop-blur-sm hover:bg-black/10">
                  {track.name}
                  <p class="mt-auto text-xs">{track.primaryArtist}</p>
               </div>
            </div>
         </a>
      {/each}
   </div>
</div> -->
<div class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text pt-16 text-7xl font-extrabold text-transparent">
   Interactive, Beautiful
   <p>Tablatures<span class="blink">.</span></p>
</div>

<div class="flex flex-row pt-48 ">
   <div class="ml-auto flex flex-col">
      <h1 class="  bg-gradient-to-r from-green-400 to-black bg-clip-text  text-7xl font-extrabold text-transparent">Synced With</h1>
      <h1 class=" bg-gradient-to-r from-green-400 to-black bg-clip-text text-7xl font-extrabold text-transparent">Spotify</h1>
   </div>
</div>

<div class="flex flex-row pt-48 ">
   <div class="mr-auto flex flex-col">
      <h1 class="  bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text  text-7xl font-extrabold text-transparent">AI Generated</h1>
      <h1 class=" bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-7xl font-extrabold text-transparent">Chords</h1>
   </div>
</div>

<style>
.blink {
   -webkit-animation: 1.5s linear infinite condemned_blink_effect; /* for Safari 4.0 - 8.0 */
   animation: 1.5s linear infinite condemned_blink_effect;
}

/* for Safari 4.0 - 8.0 */
@-webkit-keyframes condemned_blink_effect {
   0% {
      visibility: hidden;
   }
   50% {
      visibility: hidden;
   }
   100% {
      visibility: visible;
   }
}

@keyframes condemned_blink_effect {
   0% {
      visibility: hidden;
   }
   50% {
      visibility: hidden;
   }
   100% {
      visibility: visible;
   }
}
</style>
