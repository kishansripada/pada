<script>
import { App, Credentials } from "realm-web";
import { writable } from "svelte/store";
import { onMount } from "svelte";
import { loggedIn } from "../store.js";
import { goto } from "$app/navigation";

let tabbedSavedTracks = [];
/////////////create mongo db client
const app = new App({ id: "boptabs-wwrqq" });
const credentials = Credentials.anonymous();
let user = app.logIn(credentials);
/////////////create mongo db client
// let token = fetch(`/api/spotify/gettoken`).then((r) => r.json());

onMount(() => {
   if (!$loggedIn) {
      goto(`/`);
      return;
   }
   if (localStorage.tabbedSavedTracks) {
      tabbedSavedTracks = JSON.parse(localStorage.tabbedSavedTracks);
      console.log(tabbedSavedTracks);
   } else {
      getUserSavedTracks($loggedIn);
   }
});

const getUserSavedTracks = async (access_token) => {
   let spotifySavedTracks = await fetch(`/api/spotify/getUserSavedTracks/${access_token}`).then((r) => r.json());

   user = await user;
   let mongoSearchResults = await user.functions.matchSavedTracks(spotifySavedTracks.map((track) => track.track.id));

   // filter spotify saved tracks to only include those that are on mongodb then attach mongodb data to spotify tracks
   tabbedSavedTracks = spotifySavedTracks
      .filter((track) => {
         return mongoSearchResults.map((track) => track.spotifyId).includes(track.track.id);
      })
      .map((spotifyTrack) => {
         return {
            ...spotifyTrack,
            ...mongoSearchResults.find((mongoTrack) => mongoTrack.spotifyId == spotifyTrack.track.id),
         };
      });

   localStorage.tabbedSavedTracks = JSON.stringify(tabbedSavedTracks);
};
</script>

<div class="grid grid-cols-3 gap-3 text-[#091834]">
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
</div>
