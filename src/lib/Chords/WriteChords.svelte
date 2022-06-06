<script context="module">
export const load = () => {
   return {
      props: {
         test: 123,
      },
   };
};
</script>

<script>
// export let test;
console.log($$props);
import { version, spotifyPosition, getGroups, chordPosition } from "../../store";
import { page } from "$app/stores";

// when chord is clicked send the beat number to the store
// function changeSpotifyPosition(bar) {
//    chordPosition.set({ bar: bar });
// }

// const getBeats = async () => {
//    let trackAnalysis = await fetch(`/api/spotify/trackanalysis/${$page.params.id}`).then((r) => r.json());
//    let beats = trackAnalysis.analysis.beats;
//    return beats;
// };

// // given the spotify position, calculate the current bar of rthe song
// $: currentBar = beats.findIndex((beat) => {
//    return $spotifyPosition / 1000 < beat.start;
// });
// $: console.log(currentBar);
</script>

<!-- chord components -->

<!-- <div class="flex flex-row ">
   {#each $getGroups(beats) as groups, i}
      <div class="grid basis-1/4 grid-cols-4 gap-2 ">
         {#each groups as group, j}
            <button on:click="{() => changeSpotifyPosition(group.start)}">
               <div
                  id="{Math.floor(j / 4) * 16 + i * 4 + (j % 4)}"
                  class="grid h-12 w-full place-items-center rounded bg-white/5 text-xl text-white outline hover:bg-white/25 "
                  class:bg-slate-400="{Math.floor(j / 4) * 16 + i * 4 + (j % 4) == currentBar}">
                  {group.chord || ""}
               </div>
            </button>
         {/each}
      </div>
      {#if i !== 3}
         <div class="mx-2 w-2 rounded bg-white/60"></div>
      {/if}
   {/each}
</div> -->

<!-- <p id="test">element</p> -->
