<script>
import { caroselData } from "../home.js";
import { onMount } from "svelte";
</script>

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
</div>

<style>
#container {
   height: 500px;
   /* position: relative; */
   overflow: hidden;
   width: 100%;
}

.photobanner {
   position: absolute;
   top: 115px;
   left: 0px;
   overflow: hidden;
   animation: bannermove 60s linear infinite;
}

@keyframes bannermove {
   0% {
      transform: translate(0, 0);
   }
   100% {
      transform: translate(-76%, 0);
   }
}
</style>
