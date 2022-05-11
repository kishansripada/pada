<script>
import { version, spotifyPosition, getGroups } from "../../store";

export let chordCharts;

$: approvedChords = chordCharts.filter((chordChart) => chordChart.approved);

$: currentChords = approvedChords[$version.chords];

$: currentBar = currentChords.chords.findIndex((beat) => {
   return $spotifyPosition / 1000 < beat.start;
});
$: console.log(currentBar);
</script>

<!-- <p>{JSON.stringify(approvedChords)}</p> -->

{#await currentChords then currentChords}
   <div class="flex flex-row">
      {#each $getGroups(currentChords.chords) as group, i}
         <div class="grid gap-2 grid-cols-4 basis-1/4 ">
            {#each group as group, j}
               <button>
                  {#await currentBar then currentBar}
                     <div
                        class="bg-slate-200 rounded h-12 w-full hover:bg-orange-300 grid place-items-center text-xl"
                        class:bg-orange-300="{j + 4 * i == currentBar}">
                        {group.chord || j}
                     </div>
                  {/await}
               </button>
            {/each}
         </div>
         {#if i !== 3}
            <div class="bg-slate-600 w-2 mx-2 rounded"></div>
         {/if}
      {/each}
   </div>
{/await}
