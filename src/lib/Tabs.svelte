<script>
   import { mongoTrack } from "../store";
   import { fade } from "svelte/transition";

   import Info from "./Info.svelte";
   import Flat from "../lib/Tabs/Flat.svelte";
</script>

{#await $mongoTrack then mongoTrack}
   {#if mongoTrack.tabs.length}
      <Info />
      <Flat />
   {:else}
      <div>No Tabs!</div>
   {/if}
{/await}
