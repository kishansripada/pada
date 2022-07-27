<script>
import { getPlaylist } from "../spotify.js";
import { browser } from "$app/env";
import { page } from "$app/stores";
import { supabase } from "../supabase.js";
import { onMount } from "svelte";
import ColorSplotch from "$lib/ColorSplotch.svelte";
import Chords from "./myprofile/chords.svelte";

let tabbedTracks = supabase
   .from("tracks")
   .select("name, tabs!inner( approvalstatus ), spotifyId")
   .filter("tabs.approvalstatus", "eq", "approved")
   .range(0, 50)
   .then((r) => r.data);

let chordedTracks = supabase
   .from("tracks")
   .select("name, chords!inner( approvalstatus ), spotifyId")
   .filter("chords.approvalstatus", "eq", "approved")
   .range(0, 50)
   .then((r) => r.data);

let spotifyTracks;
onMount(async () => {
   let token = await fetch(`/api/spotify/gettoken`).then((r) => r.json());
   spotifyTracks = await getPlaylist("37i9dQZEVXbLRQDuF5jeBp", token.token);

   let spotifyIds = spotifyTracks.tracks.items.map((track) => track.track.id);
});
</script>

<!-- <ColorSplotch stylePosition="top: -450px; right: 0px;" color="#F5CDFF" />
<ColorSplotch stylePosition="top: -450px; left: 0px; transform: rotate(180deg)" color="#ADD8E6" /> -->

<div class="h-[100vh]">
   {#await tabbedTracks}
      <div class="  z-[60]  w-full text-xl font-light">
         <p class="whitespace-nowrap text-xs">{Array(21).fill("loading...").join("⸺")}</p>

         <p class="rotate-180 whitespace-nowrap text-xs">{Array(21).fill("loading...").join("⸺")}</p>
      </div>
   {:then tabbedTracks}
      <div class="  z-[60]  w-full text-xl font-light" style="">
         <p class="whitespace-nowrap text-xs">{Array(21).fill("discover tabbed tracks").join("⸺")}</p>
         <div class="animate relative flex transform flex-row whitespace-nowrap ">
            {#each tabbedTracks as track}
               <a href="/track/{track.spotifyId}/tabs" class="hover:underline ">{track.name}</a>
               {"⸺ "}
            {/each}
         </div>
         <p class="rotate-180 whitespace-nowrap text-xs">{Array(21).fill("discover tabbed tracks").join("⸺")}</p>
      </div>
   {/await}

   <div class="flex flex-col justify-center">
      {#if spotifyTracks}
         {#await spotifyTracks then spotifyTracks}
            <div class=" left-0 z-[50]     overflow-hidden rounded-xl">
               <div class="flex flex-row justify-center text-xl font-light align-baseline items-center">
                  <div class="h-[2px] bg-black w-full"></div>
                  <p class="whitespace-nowrap px-2">top fourty songs in the us <span class="text-xs">let's get these tabbed and chorded</span></p>
                  <div class="h-[2px]  bg-black w-full"></div>
               </div>

               <div class="grid basis-1/4 grid-cols-10">
                  {#each spotifyTracks.tracks.items.slice(0, 40) as track, index}
                     <a href="/track/{track.track.id}/tabs" class="flex flex-col  items-center px-1 rounded-xl h-full">
                        <div class="relative text-center group">
                           <div
                              style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
                              class="transition ease-in-out duration-500 absolute group-hover:opacity-100 bg-black/60 text-white w-24 rounded opacity-0">
                              <p class="text-xs">{track.track.name}</p>
                           </div>
                           <img class="w-full hover:scale-[1.1] transition ease-in-out duration-300" src="{track.track.album.images[0].url}" alt="" />
                        </div>
                     </a>
                  {/each}
               </div>

               <div class="flex flex-row justify-center text-xl font-light align-baseline items-center rotate-180">
                  <div class="h-[2px] bg-black w-full"></div>
                  <p class="whitespace-nowrap px-2">top fourty songs in the us <span class="text-xs">let's get these tabbed and chorded</span></p>
                  <div class="h-[2px]  bg-black w-full"></div>
               </div>
            </div>
         {/await}
      {/if}
   </div>

   {#await chordedTracks}
      <div class="  z-[60]  w-full text-xl font-light" style="">
         <p class="whitespace-nowrap text-xs">{Array(21).fill("loading...").join("⸺")}</p>

         <p class="rotate-180 whitespace-nowrap text-xs">{Array(21).fill("loading...").join("⸺")}</p>
      </div>
   {:then chordedTracks}
      <div class="  z-[60]  w-full text-xl font-light" style="">
         <p class="whitespace-nowrap text-xs">{Array(21).fill("discover chorded tracks").join("⸺")}</p>
         <div class="animate relative flex transform flex-row whitespace-nowrap ">
            {#each [...chordedTracks, ...chordedTracks, ...chordedTracks, ...chordedTracks] as track}
               <a href="/track/{track.spotifyId}/chords" class="hover:underline ">{track.name}</a>
               {"⸺ "}
            {/each}
         </div>
         <p class="rotate-180 whitespace-nowrap text-xs">{Array(21).fill("discover chorded tracks").join("⸺")}</p>
      </div>
   {/await}
</div>

<style>
.animate {
   animation-duration: 2000s;
   animation-name: infiniteScroll;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
}
.animateRight {
   animation-duration: 2000s;
   animation-name: infiniteScrollRight;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
}
@keyframes infiniteScroll {
   from {
      left: 0px;
   }

   to {
      left: -100000px;
   }
}

@keyframes infiniteScrollRight {
   from {
      left: -10000px;
   }

   to {
      left: 0px;
   }
}
</style>
