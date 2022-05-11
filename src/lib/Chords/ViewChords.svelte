<script>
import { version, spotifyPosition, getGroups } from "../../store";

import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

function changeSpotifyPosition(bar) {
   console.log(bar);
   dispatch("positionChange", {
      position: bar * 1000,
   });
}

// gets mongoTrack.chords from Chord.svlete
export let chordCharts;

// filters out only chords that are approved
$: approvedChordsCharts = chordCharts.filter((chordChart) => chordChart.approved);

// gets the current user selected version from the approved chords ONLY
$: currentChordChart = approvedChordsCharts[$version.chords];

// get fill the chords from the currentVersion with empty fillers in order to make it a perfect rectangle in render
$: currentChords = [...currentChordChart.chords, ...new Array(16 - (currentChordChart.chords.length % 16)).fill({ filler: true })];

// given the spotify position, calculate the current bar of rthe song
$: currentBar = currentChords.findIndex((beat) => {
   return $spotifyPosition / 1000 < beat.start;
});
$: console.log(currentBar);
</script>

<div class="flex flex-row ">
   {#each $getGroups(currentChords) as group, i}
      <div class="grid basis-1/4 grid-cols-4 gap-2 ">
         {#each group as group, j}
            <button on:click="{() => changeSpotifyPosition(Math.floor(j / 4) * 16 + i * 4 + (j % 4))}">
               <div
                  class="grid h-12 w-full place-items-center rounded bg-white/5 text-xl text-white outline hover:bg-white/25 "
                  class:bg-slate-400="{Math.floor(j / 4) * 16 + i * 4 + (j % 4) == currentBar}">
                  {group.chord || ""}
               </div>
            </button>
         {/each}
      </div>
      {#if i !== 3}
         <div class="mx-2 w-2 rounded bg-slate-300"></div>
      {/if}
   {/each}
</div>
