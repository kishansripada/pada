<script>
import { isUploadingTabs } from "../store";
import { fade } from "svelte/transition";

import Info from "./Info.svelte";
import Flat from "../lib/Tabs/Flat.svelte";
import UploadTabs from "../lib/Tabs/UploadTabs.svelte";
export let mongoTrack;
// console.log({ mongoTrack });
</script>

{#if !$isUploadingTabs}
   {#if mongoTrack?.tabs?.length}
      <div class="py-3">
         <Info mongoTrack="{mongoTrack}" />
      </div>
      <Flat tabs="{mongoTrack.tabs}" />
   {:else}
      <div>No Tabs!</div>
   {/if}
{:else}
   <UploadTabs />
{/if}
