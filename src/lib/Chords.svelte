<script>
   import { mongoTrack } from "../store";
   import Info from "./Info.svelte";
   import ViewChords from "./Chords/ViewChords.svelte";
   import WriteChords from "./Chords/WriteChords.svelte";
</script>

{#await $mongoTrack then mongoTrack}
   {#if mongoTrack.chords.length}
      <Info />
      <ViewChords />
   {:else}
      <div>No Chords!</div>
   {/if}
{/await}
