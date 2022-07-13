<script>
import { onMount } from "svelte";
import { loggedIn } from "../store.js";
import { goto } from "$app/navigation";
import { supabase } from "../supabase";
import { getUserSavedTracks } from "../spotify.js";

let tabbedSavedTracks = [];
let loading = false;

onMount(async () => {
   if (!$loggedIn) return goto("/");

   if (localStorage.tabbedSavedTracks) {
      tabbedSavedTracks = JSON.parse(localStorage.tabbedSavedTracks);
      console.log(tabbedSavedTracks);
   } else {
      loading = true;
      let spotifySavedTracks = await getUserSavedTracks($loggedIn);

      let ids = spotifySavedTracks.map((track) => track.track.id);
      let chunks = [...Array(Math.ceil(ids.length / 200))].map((_, i) => ids.slice(i * 200, i * 200 + 200));
      chunks = await Promise.all(
         chunks.map((chunk) => {
            return supabase
               .from("tracks")
               .select(" spotifyId")
               .in("spotifyId", chunk)
               .then((r) => r.data);
         })
      );
      chunks = chunks.flat().map((track) => track.spotifyId);

      let tabbedSpotifyTracks = spotifySavedTracks.filter((track) => chunks.includes(track.track.id));
      localStorage.tabbedSavedTracks = JSON.stringify(tabbedSpotifyTracks);
      tabbedSavedTracks = tabbedSpotifyTracks;
      loading = false;
   }
});
</script>

{#if loading}
   Loading... this may take a while
{:else if tabbedSavedTracks.length}
   <div class="grid grid-cols-3 gap-3 text-[#091834]">
      {#each tabbedSavedTracks as track}
         <a href="{`/track/${track.track.id}/tabs`}">
            <div class="  flex h-20 w-full flex-row rounded-xl bg-white/10  hover:bg-white/20">
               <img class="h-20 rounded-xl" src="{track.track.album.images[0].url}" alt="" />
               <div class="flex flex-col pl-2 pt-1">
                  <p>{track.track.name}</p>
                  <p class="text-xs">{track.track.artists.map((artist) => artist.name).join(", ")}</p>
               </div>
            </div>
         </a>
      {/each}
   </div>
{:else}
   Seems like your library doesn't have any saved tracks that we tabbed!
{/if}
