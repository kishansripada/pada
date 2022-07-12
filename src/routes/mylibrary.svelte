<!-- <script>
import { onMount } from "svelte";
import { loggedIn } from "../store.js";
import { goto } from "$app/navigation";
import { supabase } from "../supabase";
import { getUserSavedTracks } from "../spotify.js";

let tabbedSavedTracks = [];

onMount(async () => {
   if (!$loggedIn) return goto("/");

   if (localStorage.tabbedSavedTracks) {
      tabbedSavedTracks = JSON.parse(localStorage.tabbedSavedTracks);
      console.log(tabbedSavedTracks);
   } else {
      let spotifySavedTracks = await getUserSavedTracks($loggedIn);
      console.log(chunks);
      let ids = spotifySavedTracks.map((track) => track.track.id);
      // let chunks = [...Array(Math.ceil(ids.length / 200))].map((_, i) => ids.slice(i * 200, i * 200 + 200));
      // chunks = await Promise.all(
      //    chunks.map((chunk) => {
      //       return supabase
      //          .from("tracks")
      //          .select(" spotifyId")
      //          .in("spotifyId", chunk)
      //          .then((r) => r.data);
      //    })
      // );

      console.log(chunks);
   }
});
</script>

<!-- <div class="grid grid-cols-3 gap-3 text-[#091834]">
   {#each tabbedSavedTracks as track}
      <a href="{`/track/${track.track.id}`}">
         <div class="  flex h-20 w-full flex-row rounded-xl bg-white/10  hover:bg-white/20">
            <img class="h-20 rounded-xl" src="{track.track.album.images[0].url}" alt="" />
            <div class="flex flex-col pl-2 pt-1">
               <p>{track.name}</p>
               <p class="text-xs">{track.primaryArtist}</p>
            </div>
         </div>
      </a>
   {/each}
</div> -->
-->
