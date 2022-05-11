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

{#await currentChords then currentChords}
   <div class="flex flex-row">
      {#each $getGroups(currentChords.chords) as group, i}
         <div class="grid gap-2 grid-cols-4 basis-1/4 ">
            {#each group as group, j}
               <button>
                  {#await currentBar then currentBar}
                     <div
                        class="bg-transparent text-white outline-white outline rounded h-12 w-full hover:bg-orange-500 grid place-items-center text-xl"
                        class:bg-orange-500="{Math.floor(j / 4) * 16 + i * 4 + (j % 4) == currentBar}">
                        {group.chord || ""}
                     </div>
                  {/await}
               </button>
            {/each}
         </div>
         {#if i !== 3}
            <div class="bg-slate-300 w-2 mx-2 rounded"></div>
         {/if}
      {/each}
   </div>
{/await}
