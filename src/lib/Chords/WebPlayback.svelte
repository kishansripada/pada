<script>
import { trackDetails, loggedIn, spotifyPosition, logIn } from "../../store.js";
import { page } from "$app/stores";
import playIcon from "../../static/play.svg";
import pauseIcon from "../../static/pause.svg";

// $: console.log({ $page });
let player;
let play;
let paused = true;

$: console.log({ paused });
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

// when play/pause button is clicled
async function playPause() {
   if (!$loggedIn) logIn();

   // check to make sure play and player and initialized
   if (play && player) {
      //   if there isn't a track queued, don't do anything
      if (!$trackDetails) return;
      //   get the current track id from store
      let id = (await $trackDetails.then((trackDetails) => trackDetails)).id;
      player.getCurrentState().then((state) => {
         // if the current songs playing is the song that its in the store OR
         // if the user in on a page that is not /track/id THEN
         // play/pause the current song
         paused = state ? !state.paused : true;

         if (state?.track_window?.current_track?.id == id || $page.routeId !== "track/[id]") {
            //    paused = !state.paused;
            paused = state ? !state.paused : true;

            player.togglePlay();
         } else {
            // otherwise, the user is viewing a differnt song than is in the database OR the state is null so the new song should be queued
            play({
               playerInstance: player,
               spotify_uri: `spotify:track:${id}`,
            });
            paused = false;
         }
      });
   }
}

let interval = window.setInterval(() => {
   //   console.log("checked state");
   if (play && player) {
      player.getCurrentState().then((state) => {
         if (state && !state.paused) {
            //    console.log("set position");
            spotifyPosition.set(state.position);
         }
      });
   }
}, 50);
</script>

<svelte:head>
   <script src="https://sdk.scdn.co/spotify-player.js"></script>
</svelte:head>

<button class="fixed bottom-2 left-1/2 w-16 -translate-x-1/2 transform" on:click="{playPause}"
   ><img src="{paused ? playIcon : pauseIcon}" alt="" /></button>
