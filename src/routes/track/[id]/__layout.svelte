<script context="module">
import { getToken, getTrack, getArtists, getTrackFeatures } from "../../../spotify.js";

export async function load({ params }) {
   let token = await getToken().then((token) => token.access_token);

   let trackAndArtists = getTrack(params.id, token).then((track) => {
      let artists = getArtists(
         track.artists.map((artist) => artist.id),
         token
      );
      return Promise.all([track, artists]);
   });

   let features = getTrackFeatures(params.id, token);

   return Promise.all([features, trackAndArtists]).then(([features, trackAndArtists]) => {
      let trackDetails = {
         ...trackAndArtists[0],
         features,
         artists: trackAndArtists[1],
      };
      return {
         props: { trackDetails },
         stuff: { trackDetails },
      };
   });
}
</script>

<script>
export let trackDetails;
import TrackDetails from "$lib/TrackDetails.svelte";
import TabsChordsNav from "$lib/TabsChordsNav.svelte";
import ColorSplotch from "$lib/ColorSplotch.svelte";
import { browser } from "$app/env";
import { playbackData } from "../../../store.js";
import { onMount } from "svelte";
import { prominent } from "color.js";
import { fade } from "svelte/transition";
import { page } from "$app/stores";

function rgbToHex(r, g, b) {
   return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

let colors;
$: trackId = $page.params.id;

$: changeColors(), trackId;

const changeColors = () => {
   if (browser) {
      colors = prominent(trackDetails.album.images[0].url, { amount: 4 }).then((colors) => colors.map((color) => rgbToHex(...color)));
   }
};

$: playbackData.set(trackDetails);
</script>

{#if colors}
   {#await colors then colors}
      <div transition:fade|local>
         <ColorSplotch stylePosition="top: -500px; right: 0px; opacity: 0.5;" color="{colors[0]}" />
         <ColorSplotch stylePosition="top: -500px; left: 0px; transform: rotate(180deg);opacity: 0.5" color="{colors[1]}" />
         <ColorSplotch stylePosition="top: -500px; left: 200px; transform: rotate(-90deg);opacity: 0.5" color="{colors[2]}" />
      </div>
   {/await}
{/if}
<main class="container ">
   <TrackDetails trackDetails="{trackDetails}" />

   <div class="pb-4 pt-9">
      <TabsChordsNav />
   </div>

   <slot trackDetails="{trackDetails}" />
</main>
