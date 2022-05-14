<script>
import TrackDetails from "$lib/TrackDetails.svelte";
import Tabs from "$lib/Tabs.svelte";
import Chords from "$lib/Chords.svelte";
import TabsChordsNav from "$lib/TabsChordsNav.svelte";

import { fade } from "svelte/transition";

import { page } from "$app/stores";
import { trackDetails, mongoTrack, tabsOrChords, version } from "../../store.js";

$: if ($page.params.id) {
   trackDetails.set(fetch(`/api/spotify/trackdetails/${$page.params.id}`).then((r) => r.json()));
}

$: mongoTrack.set(fetch(`/api/gettrack/${$page.params.id}`).then((r) => r.json()));
$: console.log({ $trackDetails });
</script>

{#await $trackDetails}
   <div class="shadow-4xl rounded-[20px] h-64 pt-0 bg-white/10"></div>
{:then trackDetails}
   <div transition:fade="{{ delay: 0, duration: 250 }}" class="pt-0">
      <TrackDetails trackDetails="{trackDetails}" />
   </div>
{/await}

<div class="pb-4 pt-9">
   <TabsChordsNav />
</div>

{#if $tabsOrChords == "tabs" && $mongoTrack}
   {#await $mongoTrack then mongoTrack}
      <Tabs mongoTrack="{mongoTrack}" />
   {/await}
{/if}

{#if $tabsOrChords == "chords" && $mongoTrack}
   {#await $mongoTrack then mongoTrack}
      <Chords />
   {/await}
{/if}
