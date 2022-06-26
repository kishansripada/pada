<script>
import { playbackData, loggedIn, spotifyPosition, logIn, chordPosition, spotifyIsPaused } from "../store";
import { page } from "$app/stores";
import playIcon from "../static/play.svg";
import pauseIcon from "../static/pause.svg";

let player;
let play;

// define player, play
window.onSpotifyWebPlaybackSDKReady = () => {
   player = new window.Spotify.Player({
      name: "Web Playback SDK",
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
$: if (player) {
   player.isLoaded.then(() => {
      player.seek($chordPosition.bar * 1000);
   });
}

// when play/pause button is clicled
async function playPause() {
   if (!$loggedIn) logIn();
   // check to make sure play and player and initialized
   //   if there isn't a track queued, don't do anything

   if (!play || !player || !$playbackData) return;

   //   get the current track id from store
   let id = $playbackData.id;
   let state = await player.getCurrentState();
   // if the current songs playing is the song that its in the store OR
   // if the user in on a page that is not /track/id THEN
   // play/pause the current song
   spotifyIsPaused.set(state ? !state.paused : true);

   if (state?.track_window?.current_track?.id == id || ($page.routeId !== "track/[id]/tabs" && $page.routeId !== "track/[id]/chords")) {
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

<div
   class="fixed bottom-4 left-1/2 z-50 flex h-12 w-[575px] -translate-x-1/2 transform flex-row items-center rounded-full	 bg-white/40 backdrop-blur-md">
   <button class=" w-12 pl-2" on:click="{playPause}"><img src="{$spotifyIsPaused ? playIcon : pauseIcon}" alt="" /></button>

   <div class="relative pb-2 pl-1" on:click="{handleChangeMsPosition}">
      <div class="absolute h-2 rounded-full bg-gray-500" style="width: 500px"></div>
      {#if $playbackData}
         {#await $playbackData then playbackData}
            <div class="absolute h-2 rounded-full bg-gray-700" style="width: {($spotifyPosition / playbackData.duration_ms) * 500}px"></div>
         {/await}
      {/if}
   </div>
</div>
