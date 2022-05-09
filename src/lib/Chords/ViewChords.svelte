<script>
   import { mongoTrack, version, spotifyPosition, getGroups } from "../../store";
   async function filterApprovedChords() {
      let chords = await $mongoTrack.then((mongoTrack) => mongoTrack.chords);
      return await chords.filter((chord) => chord.approved);
   }

   $: console.log({ $spotifyPosition });
</script>

{#await filterApprovedChords() then approvedChords}
   <!-- {JSON.stringify(approvedChords[$version.chords].chords)}     -->
   <div class="flex flex-row">
      {#each $getGroups(approvedChords[$version.chords].chords) as group, i}
         <div class="grid gap-4 grid-cols-4  basis-1/4 ">
            {#each group as group}
               <button>
                  <div class="bg-slate-200 rounded h-12 w-full hover:bg-orange-300 grid place-items-center text-xl">
                     {group.chord || ""}
                  </div>
               </button>
            {/each}
         </div>
         {#if i !== 3}
            <div class="bg-slate-600 w-2 mx-2 rounded" />
         {/if}
      {/each}
   </div>
{/await}
