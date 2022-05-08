<script>
   import TrackDetails from "$lib/TrackDetails.svelte";
   import Tabs from "$lib/Tabs.svelte";
   import Chords from "$lib/Chords.svelte";
   import TabsChordsNav from "$lib/TabsChordsNav.svelte";
   import { fade } from "svelte/transition";

   import { page } from "$app/stores";
   import { trackDetails, mongoTrack, tabsOrChords, version } from "../../store.js";

   $: if ($page.params.id) trackDetails.set(fetch(`/api/trackdetails/${$page.params.id}`).then((r) => r.json()));
   $: mongoTrack.set(fetch(`/api/${$page.params.id}`).then((r) => r.json()));
   $: console.log({ $trackDetails });
</script>

{#await $trackDetails then trackDetails}
   <div transition:fade={{ delay: 250, duration: 300 }}>
      <TrackDetails />
   </div>
   <div class="py-4">
      <TabsChordsNav />
   </div>
{/await}

{#if $tabsOrChords == "tabs" && $mongoTrack}
   {#await $mongoTrack then mongoTrack}
      <Tabs />
   {/await}
{/if}

{#if $tabsOrChords == "chords" && $mongoTrack}
   {#await $mongoTrack then mongoTrack}
      <Chords />
   {/await}
{/if}
