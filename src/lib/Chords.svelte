<script>
import { mongoTrack, isWritingChords } from "../store";
import Info from "./Info.svelte";
import ViewChords from "./Chords/ViewChords.svelte";
import WriteChords from "./Chords/WriteChords.svelte";
import { browser } from "$app/env";
</script>

{#await $mongoTrack then mongoTrack}
   {#if !$isWritingChords}
      {#if mongoTrack.chords.length}
         <Info mongoTrack="{mongoTrack}" />
         <ViewChords chordCharts="{mongoTrack.chords}" />
      {:else}
         <p>No Chords!</p>
      {/if}
   {:else}
      <WriteChords />
   {/if}
{/await}
