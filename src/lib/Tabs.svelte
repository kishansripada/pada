<script>
import { isUploadingTabs, trackDetails, version } from "../store";
// import { fade } from "svelte/transition";

import Info from "./Info.svelte";
import Flat from "../lib/Tabs/Flat.svelte";
import UploadTabs from "../lib/Tabs/UploadTabs.svelte";
export let mongoTrack;

// $: console.log(mongoTrack.tabs[$version.tabs].musicXml);
</script>

{#if !$isUploadingTabs}
   {#if mongoTrack?.tabs?.filter((x) => x.approved).length}
      <div class="py-3">
         <Info mongoTrack="{mongoTrack}" />
      </div>
      <Flat style="height:500px" xml="{mongoTrack.tabs[$version.tabs].musicXml}" />
   {:else}
      <div>No Tabs!</div>
   {/if}
{:else}
   {#await $trackDetails then trackDetails}
      <UploadTabs trackDetails="{trackDetails}" mongoTrack="{mongoTrack}" />
   {/await}
{/if}
