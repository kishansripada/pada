<script>
   import TrackDetails from "$lib/TrackDetails.svelte";
   import Tabs from "$lib/Tabs.svelte";
   import Chords from "$lib/Chords.svelte";

   import { page } from "$app/stores";
   import { trackDetails, mongoTrack, tabsOrChords, version } from "../../store.js";

   $: [myId, myTabsOrChords, myVersion] = $page.params.params.split("/");

   $: trackDetails.set(fetch(`/api/trackdetails/${myId}`).then((r) => r.json()));
   $: mongoTrack.set(fetch(`/api/${myId}`).then((r) => r.json()));

   const switchType = () => tabsOrChords.update((current) => (current == "tabs" ? "chords" : "tabs"));
</script>

<TrackDetails />

<div class="inline-flex">
   <button on:click={switchType} class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l" class:bg-gray-400={$tabsOrChords == "tabs"}>
      Tabs
   </button>

   <button
      on:click={switchType}
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
      class:bg-gray-400={$tabsOrChords == "chords"}
   >
      Chords
   </button>
</div>

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
