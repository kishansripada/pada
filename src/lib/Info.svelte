<script>
import { version, tabsOrChords } from "../store";
export let mongoTrack;

$: filteredTracks = mongoTrack[$tabsOrChords].filter((x) => x.approved);

$: currentVersion = filteredTracks[$version[$tabsOrChords]];
</script>

<div class="flex h-32 flex-row rounded-[20px] bg-white/10 shadow-2xl outline outline-white">
   <p class="text-white">{currentVersion.author}</p>
   <p class="text-white">{currentVersion.description}</p>

   <select
      bind:value="{$version[$tabsOrChords]}"
      class="form-select appearance-none rounded-[20px]  border bg-white/5 bg-clip-padding px-3 py-1.5 text-base font-normal text-white outline-none">
      {#each filteredTracks as version, index}
         <option value="{index}">
            version {index + 1}
         </option>
      {/each}
   </select>
</div>
