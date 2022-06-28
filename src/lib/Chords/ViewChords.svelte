<script>
import { version, spotifyPosition, getGroups, chordPosition, colors } from "../../store";

let autoScroll = true;

const scrollIntoView = (currentBar) => {
   if (!autoScroll) return;
   const el = document.getElementById(currentBar);
   if (!el) return;
   el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
   });
};

$: scrollIntoView(currentBar);

// when chord is clicked send the beat number to the store
function changeSpotifyPosition(bar) {
   chordPosition.set({ bar: bar });
}

// gets mongoTrack.chords from Chord.svlete
export let chordCharts;

// filters out only chords that are approved
$: approvedChordsCharts = chordCharts.filter((chordChart) => chordChart.approved);

// gets the current user selected version from the approved chords ONLY
$: currentChordChart = approvedChordsCharts[$version.chords];

//  fill the chords from the currentVersion with empty fillers in order to make it a perfect rectangle in render
$: currentChords = [...currentChordChart.chords, ...new Array(16 - (currentChordChart.chords.length % 16)).fill({ filler: true })];

// given the spotify position, calculate the current bar of rthe song
$: currentBar = currentChords.findIndex((beat) => {
   return $spotifyPosition / 1000 < beat.start + beat.duration;
});
</script>

<!-- chord components -->
<div class="flex flex-row items-center py-9">
   <input type="checkbox" value="" class="w-16" bind:checked="{autoScroll}" />
   <label for="remember" class="text-[#091834]">Auto Scroll</label>
</div>

{#if $colors}
   {#await $colors then colors}
      <!-- promise was fulfilled -->

      <div
         class="style flex flex-row bg-clip-text"
         style=" background: linear-gradient(-45deg, {colors.join(',')});
animation: gradient 30s ease infinite; 
background-size: 200% 200%
">
         {#each $getGroups(currentChords) as groups, i}
            <div class="grid basis-1/4 grid-cols-4 gap-2 bg-clip-text ">
               {#each groups as group, j}
                  <button on:click="{() => changeSpotifyPosition(group.start)}">
                     <p
                        id="{Math.floor(j / 4) * 16 + i * 4 + (j % 4)}"
                        class="grid h-12 w-full place-items-center rounded bg-white/5 text-xl text-[#091834] ring-2 ring-black hover:bg-white/25 "
                        class:bg-slate-400="{Math.floor(j / 4) * 16 + i * 4 + (j % 4) == currentBar}">
                        {group.chord || ""}
                     </p>
                  </button>
               {/each}
            </div>
            {#if i !== 3}
               <div class="mx-2 w-2 rounded bg-white/60"></div>
            {/if}
         {/each}
      </div>
   {/await}
{/if}
{#if $colors}
   {#await $colors then colors}
      <!-- <div
         class="absolute -z-30 h-[500px] w-[75rem]"
         style="background:linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.15) 85%, rgba(255, 255, 255, 1) 100%);
    ">
      </div>

      <div
         class="absolute -z-30 h-[500px] w-[75rem]"
         style="background:radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 95%);">
      </div> -->

      <!-- <div
         class="absolute  -z-50 h-[2000px] w-full opacity-60 top-[650px]"
         style=" background: linear-gradient(-45deg, {colors.join(',')});
animation: gradient 30s ease infinite; 
background-size: 200% 200%
">
      </div> -->
   {/await}
{/if}
