<script>
import { getPlaylist } from "../spotify.js";
import { browser } from "$app/env";
import TrackDetails from "../lib/TrackDetails.svelte";
import { page } from "$app/stores";
import { supabase } from "../supabase.js";
import client from "../client.js";
import { queryStore, gql } from "@urql/svelte";
import { onMount } from "svelte";
import ColorSplotch from "$lib/ColorSplotch.svelte";

let tabTracks;
(async function getTabbedTracks() {
   tabTracks = await supabase
      .from("tracks")
      .select("name, tabs ( approvalStatus ), spotifyId")
      .filter("tabs.approvalStatus", "eq", "approved")
      .range(0, 50)
      .then((r) => r.data);

   console.log(tabTracks);
})();

const trackExistsQuery = gql`
   query ($spotifyIds: [String!]!) {
      trackExists(spotifyIds: $spotifyIds)
   }
`;

const tabbedTracksQuery = gql`
   query {
      tracks {
         data {
            name
            spotifyId
         }
      }
   }
`;

let tabbedTracks = queryStore({ client, query: tabbedTracksQuery });

let tracksWithTabs;
let spotifyTracks;
onMount(async () => {
   let token = await fetch(`/api/spotify/gettoken`).then((r) => r.json());
   spotifyTracks = await getPlaylist("37i9dQZEVXbLRQDuF5jeBp", token.token);

   let spotifyIds = spotifyTracks.tracks.items.map((track) => track.track.id);
   tracksWithTabs = queryStore({ client, query: trackExistsQuery, variables: { spotifyIds } });
});
</script>

<ColorSplotch stylePosition="top: -450px; right: 0px;" color="#F5CDFF" />
<ColorSplotch stylePosition="top: -450px; left: 0px; transform: rotate(180deg)" color="#ADD8E6" />

{#if $tabbedTracks?.fetching == false}
   <div class="absolute left-0 top-[75px] z-[60]  w-full overflow-hidden text-xl font-light" style="">
      <p class="whitespace-nowrap text-xs">{Array(21).fill("discover tabbed tracks").join("⸺")}</p>
      <div class="animate relative flex transform flex-row whitespace-nowrap ">
         {#each $tabbedTracks.data.tracks.data as track}
            <a href="/track/{track.spotifyId}/tabs" class="hover:underline ">{track.name}</a>
            {"⸺ "}
         {/each}
      </div>
      <p class="rotate-180 whitespace-nowrap text-xs">{Array(21).fill("discover tabbed tracks").join("⸺")}</p>
   </div>
{/if}

<div class="flex h-[600px] flex-col justify-center">
   {#await spotifyTracks then spotifyTracks}
      <div class=" left-0 z-[50]   w-full  overflow-hidden rounded-xl">
         <div class="flex flex-row justify-center text-xl font-light align-baseline items-center">
            <div class="h-[2px] bg-black w-full"></div>
            <p class="whitespace-nowrap px-2">top twelve songs in the us <span class="text-xs">and if they're tabbed</span></p>
            <div class="h-[2px]  bg-black w-full"></div>
         </div>

         <div class="flex flex-row">
            {#if $tracksWithTabs?.fetching == false}
               {#each spotifyTracks.tracks.items.slice(0, 12) as track, index}
                  <a href="/track/{track.track.id}/tabs" class="flex flex-col  items-center px-1 rounded-xl h-full">
                     <div class="relative text-center">
                        <div style="top: 50%; left: 50%; transform: translate(-50%, -50%);" class="text-[50px] absolute peer-hover:opacity-0">
                           {$tracksWithTabs.data.trackExists[index] ? "✔️" : "❌"}
                        </div>

                        <img class="min-w-24 rounded-xl mr-3 peer" src="{track.track.album.images[0].url}" alt="" />
                     </div>
                  </a>
                  <hr />
               {/each}
            {:else}
               <p>Loading ...</p>
            {/if}
         </div>
         <div class="flex flex-row justify-center text-xl font-light align-baseline items-center rotate-180">
            <div class="h-[2px] bg-black w-full"></div>
            <p class="whitespace-nowrap px-2">top twelve songs in the us <span class="text-xs">and if they're tabbed</span></p>
            <div class="h-[2px]  bg-black w-full"></div>
         </div>
      </div>
   {/await}
</div>

{#if $tabbedTracks?.fetching == false}
   <div class="absolute bottom-[115px] left-0 z-[60]  w-full overflow-hidden text-xl font-light" style="">
      <p class="whitespace-nowrap text-xs">{Array(21).fill("discover chorded tracks").join("⸺")}</p>
      <div class="animateRight relative flex transform flex-row whitespace-nowrap ">
         {#each $tabbedTracks.data.tracks.data as track}
            <a href="/track/{track.spotifyId}/tabs" class="hover:underline ">{track.name}</a>
            {"⸺ "}
         {/each}
      </div>
      <p class="rotate-180 whitespace-nowrap text-xs">{Array(21).fill("discover chorded tracks").join("⸺")}</p>
      <hr />
   </div>
{/if}

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
