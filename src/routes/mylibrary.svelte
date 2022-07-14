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

   if (sessionStorage.getItem("tabbedSavedTracks")) {
      tabbedSavedTracks = JSON.parse(sessionStorage.getItem("tabbedSavedTracks"));
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
      sessionStorage.setItem("tabbedSavedTracks", JSON.stringify(tabbedSpotifyTracks));
      tabbedSavedTracks = tabbedSpotifyTracks;
      loading = false;
   }
});
</script>

{#if loading}
   <div class="mt-6 flex items-center justify-center">
      <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
   </div>
{:else if tabbedSavedTracks.length}
   <div class="grid grid-cols-8 gap-3 text-[#091834] mt-6">
      {#each tabbedSavedTracks as track}
         <a href="{`/track/${track.track.id}/tabs`}" class="hover:scale-[1.1] transition ease-in-out duration-300">
            <img class="h-36 w-36 rounded-xl" src="{track.track.album.images[0].url}" alt="" />
         </a>
      {/each}
   </div>
{:else}
   Seems like your library doesn't have any saved tracks that we tabbed!
{/if}
