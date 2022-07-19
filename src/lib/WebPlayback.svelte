<script>
import { playbackData, loggedIn, spotifyPosition, logIn, chordPosition, spotifyIsPaused, currentlyPlaying, isSearching } from "../store";
import { page } from "$app/stores";
import { shortcut } from "../shortcut.js";
import playIcon from "../static/play.svg";
import pauseIcon from "../static/pause.svg";
let player;
let play;
$: console.log($isSearching);

const formattedTime = (duration_ms) => {
   let time = duration_ms / 1000;
   var hrs = ~~(time / 3600);
   var mins = ~~((time % 3600) / 60);
   var secs = ~~time % 60;
   var ret = "";
   if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
   }
   ret += "" + mins + ":" + (secs < 10 ? "0" : "");
   ret += "" + secs;
   return ret;
};

function on_key_down(event) {
   if (document.activeElement.tagName != "BODY") return;
   if (event.repeat) return;
   if (event.code == "Space") {
      event.preventDefault();
      playPause();
   }
}

window.onSpotifyWebPlaybackSDKReady = () => {
   player = new window.Spotify.Player({
      name: "pada",
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
<svelte:window on:keydown="{on_key_down}" />
{#if $playbackData}
   {#await $playbackData then playbackData}
      <div class="fixed bottom-0 z-[70] flex h-24 w-full  flex-row items-center bg-white/80  backdrop-blur-md">
         {#if $currentlyPlaying}
            <a class=" flex flex-row items-center pl-3  w-1/3" href="/track/{$currentlyPlaying.id}/tabs">
               <img class=" w-16 h-16 rounded-xl" src="{$currentlyPlaying.album.images[0].url}" alt="" />
               <div class="flex flex-col p-4 pl-3 text-black h-[36px] whitespace-nowrap justify-center">
                  <p class="text-sm">{$currentlyPlaying.name}</p>
                  <p class="text-xs">{$currentlyPlaying.artists.map((artist) => artist.name).join(", ")}</p>
               </div>
            </a>
         {:else}
            <a class=" flex flex-row items-center pl-3  w-1/3" href="/track/{playbackData.id}/tabs">
               <img class=" w-16 h-16 rounded-xl" src="{playbackData.album.images[0].url}" alt="" />
               <div class="flex flex-col p-4 pl-3 text-black h-[36px] whitespace-nowrap justify-center">
                  <p class="text-sm">{playbackData.name}</p>
                  <p class="text-xs">{playbackData.artists.map((artist) => artist.name).join(", ")}</p>
               </div>
            </a>
         {/if}

         <div class="flex flex-col items-center w-1/3">
            <button class="text-3xl focus: outline-none " on:click="{playPause}">
               <img class="w-12" src="{$spotifyIsPaused ? playIcon : pauseIcon}" alt="" />
            </button>

            <div class="flex flex-row items-center mb-6">
               <p class="text-gray-600 pr-3 text-sm">{formattedTime($spotifyPosition)}</p>
               <div class="flex flex-col justify-center relative" on:click="{handleChangeMsPosition}">
                  <div class="h-2 rounded-full bg-gray-200" style="width: 500px"></div>

                  {#if $currentlyPlaying}
                     <div class="absolute h-2 rounded-full bg-purple-500" style="width: {($spotifyPosition / $currentlyPlaying.duration_ms) * 500}px">
                     </div>
                  {/if}
                  <div
                     class="absolute left-0  w-1 rounded-full bg-purple-500 h-5"
                     style="left: {$currentlyPlaying ? ($spotifyPosition / $currentlyPlaying.duration_ms) * 500 - 4 : 0}px">
                  </div>
               </div>
               <p class="text-gray-600 pl-3 text-sm">{$currentlyPlaying ? formattedTime($currentlyPlaying.duration_ms) : "0.00"}</p>
            </div>
         </div>

         <div class="ml-auto w-1/3"></div>
      </div>
   {/await}
{/if}
