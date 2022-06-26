<script context="module">
export async function load({ params, fetch }) {
   const trackDetails = await fetch(`/api/spotify/trackdetails/${params.id}`).then((r) => r.json());
   return { props: { trackDetails } };
}
</script>

<script>
import TrackDetails from "$lib/TrackDetails.svelte";
import TabsChordsNav from "$lib/TabsChordsNav.svelte";
import Gradient from "$lib/Gradient.svelte";
import { browser } from "$app/env";
import { tabsOrChords, version, playbackData } from "../../../store.js";

export let trackDetails;
console.log(trackDetails);
$: playbackData.set(trackDetails);
</script>

<TrackDetails trackDetails="{trackDetails}" />

<div class="pb-4 pt-9">
   <TabsChordsNav />
</div>

<slot />

<!-- {#if browser}
       <Gradient albumUrl="{trackDetails.album.images[0].url}" />
    {/if}
     -->
