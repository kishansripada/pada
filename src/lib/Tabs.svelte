<script>
import { isUploadingTabs, trackDetails } from "../store";
// import { fade } from "svelte/transition";

import Info from "./Info.svelte";
import Flat from "../lib/Tabs/Flat.svelte";
import UploadTabs from "../lib/Tabs/UploadTabs.svelte";
export let mongoTrack;
// console.log({ mongoTrack });
</script>

{#if !$isUploadingTabs}
   {#if mongoTrack?.tabs?.filter((x) => x.approved).length}
      <div class="py-3">
         <Info mongoTrack="{mongoTrack}" />
      </div>
      <Flat tabs="{mongoTrack.tabs}" />
   {:else}
      <div>No Tabs!</div>
   {/if}
{:else}
   {#await $trackDetails then trackDetails}
      <UploadTabs trackDetails="{trackDetails}" mongoTrack="{mongoTrack}" />
   {/await}
{/if}
