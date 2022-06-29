<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
// import { isWritingChords } from "../../../store.js";
// import Info from "../../../lib/Info.svelte";
// import ViewChords from "../../../lib/Chords/ViewChords.svelte";
// import WriteChords from "../../../lib/Chords/WriteChords.svelte";
// import { browser } from "$app/env";
export let trackDetails;
</script>

<svelte:head>
   <title>{trackDetails.name} — Chords — Bop Tabs</title>
</svelte:head>
chords here
<!-- {#await $mongoTrack then mongoTrack}
   {#if !$isWritingChords}
      {#if mongoTrack.chords?.length}
         <div class="">
            <Info mongoTrack="{mongoTrack}" />
         </div>

         <ViewChords chordCharts="{mongoTrack.chords}" />
      {:else}
         <p>No Chords!</p>
      {/if}
   {:else}
      <WriteChords />
   {/if}
{/await}  -->
