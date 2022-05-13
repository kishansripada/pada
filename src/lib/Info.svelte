<script>
import { version, tabsOrChords } from "../store";
export let mongoTrack;

$: filteredTracks = mongoTrack[$tabsOrChords].filter((x) => x.approved);

$: currentVersion = filteredTracks[$version[$tabsOrChords]];

$: user = fetch(`http://localhost:3000/api/spotify/getuser/${currentVersion.author}`).then((user) => user.json());

$: console.log(user);
</script>

{#if currentVersion}
   <div class="flex h-24 flex-row rounded-[20px] bg-white/10 text-white shadow-2xl ">
      {#await user then user}
         <img class="w-24 h-24 rounded-[20px]" src="https://i.scdn.co/image/ab6775700000ee85769926cc29d872eaec8dc953" alt="" />
      {/await}

      <div class="flex flex-col pl-3 pt-3">
         <p class="">{currentVersion.author}</p>
         <p class="mt-auto mb-4">{currentVersion.description}</p>
      </div>

      <div class="ml-auto flex flex-col py-2 pr-3">
         <p class="">{new Date(currentVersion.dateSubmitted).toDateString()}</p>
         <select
            bind:value="{$version[$tabsOrChords]}"
            class=" form-select mt-auto ml-auto w-24 appearance-none rounded-[20px] border bg-white/5 bg-clip-padding px-2 py-1.5 text-center text-base font-normal text-white outline-none hover:bg-white/10">
            {#each filteredTracks as version, index}
               <option value="{index}">
                  version {index + 1}
               </option>
            {/each}
         </select>
      </div>
   </div>
{/if}
