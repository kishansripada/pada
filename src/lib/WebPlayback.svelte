<script>
import { playbackData, loggedIn, spotifyPosition, logIn, chordPosition, spotifyIsPaused, currentlyPlaying } from "../store";
import { page } from "$app/stores";
import { shortcut } from "../shortcut.js";

let player;
let play;

window.onSpotifyWebPlaybackSDKReady = () => {
   player = new window.Spotify.Player({
      name: "Bop Tabs",
      getOAuthToken: (cb) => {
         cb($loggedIn);
      },
      volume: 0.5,
   });
   player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      play = ({
         spotify_uri,
         playerInstance: {
            _options: { getOAuthToken },
         },
      }) => {
         getOAuthToken((access_token) => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
               method: "PUT",
               body: JSON.stringify({ uris: [spotify_uri] }),
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${access_token}`,
               },
            });
         });
      };
   });
   player.connect();
};
// when click on chord change position to that bar
$: if (player && play) {
   player.isLoaded.then(() => {
      player.seek($chordPosition.bar * 1000);
   });
}

// let rest of program know what song is currently playing
$: if (player && play) {
   player.addListener("player_state_changed", ({ track_window: { current_track } }) => {
      currentlyPlaying.set(current_track);
   });
}

// when play/pause button is clicled
async function playPause() {
   if (!$loggedIn) logIn();
   // check to make sure play and player and initialized
   //   if there isn't a track queued, don't do anything
   // console.log({ play });
   // console.log({ player });
   // console.log({ $playbackData });

   if (!play || !player || !$playbackData) return;
   //   get the current track id from store
   let id = $playbackData.id;
   let state = await player.getCurrentState();
   // if the current songs playing is the song that its in the store OR
   // if the user in on a page that is not /track/id THEN
   // play/pause the current song
   spotifyIsPaused.set(state ? !state.paused : true);

   if (
      state?.track_window?.current_track?.id == id ||
      ($page.routeId !== "track/[id]/tabs/[...tabId]" &&
         $page.routeId !== "track/[id]/chords/[...chordId]" &&
         $page.routeId !== "track/[id]/chords/write" &&
         $page.routeId !== "track/[id]/tabs/upload")
   ) {
      //    paused = !state.paused;

      spotifyIsPaused.set(state ? !state.paused : true);
      player.togglePlay();
   } else {
      // otherwise, the user is viewing a differnt song than is in the database OR the state is null so the new song should be queued
      play({
         playerInstance: player,
         spotify_uri: `spotify:track:${id}`,
      });
      spotifyIsPaused.set(false);
   }
}
// every 50ms get the position of the song and send it to the store
let interval = window.setInterval(async () => {
   if (!play || !player) return;
   let state = await player.getCurrentState();
   if (state && !state.paused) {
      spotifyPosition.set(state.position);
   }
}, 50);

async function handleChangeMsPosition(event) {
   if (!play || !player) return;
   let length = $playbackData.duration_ms;
   player.isLoaded.then(() => {
      player.seek((event.offsetX / 500) * length);
   });
}
</script>

<svelte:head>
   <script src="https://sdk.scdn.co/spotify-player.js"></script>
</svelte:head>

{#if $playbackData}
   {#await $playbackData then playbackData}
      <div class="fixed bottom-0 z-[70] flex h-24 w-full  flex-row items-center bg-black/70  backdrop-blur-md">
         {#if $currentlyPlaying}
            <a class=" flex flex-row items-center pl-3  w-1/3" href="/track/{$currentlyPlaying.id}/tabs">
               <img class=" w-16 h-16 rounded-xl" src="{$currentlyPlaying.album.images[0].url}" alt="" />
               <div class="flex flex-col p-4 pl-3 text-white h-[36px] whitespace-nowrap justify-center">
                  <p class="text-sm">{$currentlyPlaying.name}</p>
                  <p class="text-xs">{$currentlyPlaying.artists.map((artist) => artist.name).join(", ")}</p>
               </div>
            </a>
         {:else}
            <a class=" flex flex-row items-center pl-3  w-1/3" href="/track/{playbackData.id}/tabs">
               <img class=" w-16 h-16 rounded-xl" src="{playbackData.album.images[0].url}" alt="" />
               <div class="flex flex-col p-4 pl-3 text-white h-[36px] whitespace-nowrap justify-center">
                  <p class="text-sm">{playbackData.name}</p>
                  <p class="text-xs">{playbackData.artists.map((artist) => artist.name).join(", ")}</p>
               </div>
            </a>
         {/if}
         <div class="flex flex-col items-center w-1/3">
            <button use:shortcut="{{ code: 'Space' }}" class="text-3xl" on:click="{playPause}">{$spotifyIsPaused ? "▶️" : "⏸"}</button>
            <div class=" pb-2" on:click="{handleChangeMsPosition}">
               <div class="h-2 rounded-full bg-gray-300" style="width: 500px"></div>
               <div class="absolute top-[58px] h-2 rounded-full bg-gray-700" style="width: {($spotifyPosition / playbackData.duration_ms) * 500}px">
               </div>
            </div>
         </div>
         <div class="ml-auto w-1/3"></div>
      </div>
   {/await}
{/if}
