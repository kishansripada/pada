<script context="module">
export async function load({ params, fetch }) {
   const trackDetails = await fetch(`/api/spotify/trackdetails/${params.id}`).then((r) => r.json());
   return { props: { trackDetails } };
}
</script>

<script>
import TrackDetails from "$lib/TrackDetails.svelte";
import TabsChordsNav from "$lib/TabsChordsNav.svelte";
import { browser } from "$app/env";
import { tabsOrChords, version, playbackData } from "../../../store.js";
export let trackDetails;
import { onMount } from "svelte";
import ColorSplotch from "$lib/ColorSplotch.svelte";
import { prominent } from "color.js";
import { fade } from "svelte/transition";

function rgbToHex(r, g, b) {
   return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

let colors;
$: if (browser) {
   colors = prominent(trackDetails.album.images[0].url, { amount: 4 }).then((colors) => colors.map((color) => rgbToHex(...color)));
}

console.log(trackDetails);
$: playbackData.set(trackDetails);
</script>

{#if colors}
   {#await colors then colors}
      <div transition:fade|local>
         <ColorSplotch stylePosition="top: -500px; right: -50px; opacity: 0.5" color="{colors[0]}" />
         <ColorSplotch stylePosition="top: -500px; left: 0px; transform: rotate(180deg);opacity: 0.5" color="{colors[1]}" />
         <ColorSplotch stylePosition="top: -500px; left: 200px; transform: rotate(-90deg);opacity: 0.5" color="{colors[2]}" />
      </div>
   {/await}
{/if}

<TrackDetails trackDetails="{trackDetails}" />

<div class="pb-4 pt-9">
   <TabsChordsNav />
</div>

<slot />
