<script context="module">
import { getToken, getTrackAnalysis } from "../../../../spotify.js";

export async function load({ params }) {
   let token = await getToken().then((token) => token.access_token);

   let analysis = await getTrackAnalysis(params.id, token);

   return {
      props: { analysis },
   };
}
</script>

<script>
import { version, spotifyPosition, chordPosition, isSearching } from "../../../../store.js";
import { page } from "$app/stores";
import { shortcut } from "../../../../shortcut.js";

function range(start, end) {
   var len = (Math.abs(end - start) + 0 * 2) / 1 + 1;
   var direction = start < end ? 1 : -1;
   var startingPoint = start - direction * 0;
   var stepSize = direction;

   return Array(len)
      .fill(0)
      .map(function (_, index) {
         return startingPoint + stepSize * index;
      });
}

let scrollPosition = 0;

export let analysis;
let selectedBeats = [0];
let copied = [{ root: null, type: null, extension: null }];
let beatValues = Array.from({ length: analysis.beats.length }, () => ({ root: null, type: null, extension: null }));

let isShiftDown = false;
let isCommandDown = false;

const copy = () => {
   copied = beatValues.filter((beatValue, i) => {
      return selectedBeats.includes(i);
   });
};

const paste = () => {
   beatValues = beatValues.map((beatValue, i) => {
      if (i >= selectedBeats[0] && i < selectedBeats[0] + copied.length) {
         return JSON.parse(JSON.stringify(copied[i - selectedBeats[0]]));
      } else {
         return beatValue;
      }
   });
   selectedBeats = copied.map((copy, i) => i + selectedBeats[0]);
};

const beatClicked = (i) => {
   // shift
   if (isShiftDown && selectedBeats.length) {
      selectedBeats = [...selectedBeats, ...range(selectedBeats.slice(-1)[0] + (selectedBeats.slice(-1)[0] < i ? 1 : -1), i)];
      return;
   }

   // nothing pressed
   selectedBeats = [i];
};

// when chord is clicked send the beat number to the store
function changeSpotifyPosition(bar) {
   chordPosition.set({ bar: bar });
}

// given the spotify position, calculate the current bar of rthe song
// $: currentBar = analysis.beats.findIndex((beat) => {
//    return $spotifyPosition / 1000 < beat.start;
// });

$: currentBar = analysis.beats.findIndex((beat) => {
   return $spotifyPosition / 1000 < beat.start + beat.duration;
});

function on_key_down(event) {
   console.log(event.key);
   if ($isSearching) return;
   if (event.repeat) return;
   if (event.key == "Shift") isShiftDown = true;
   if (event.key == "Meta") isCommandDown = true;
   //    if (event.key == "Escape") selectedBeats = [];

   if (event.key == "ArrowUp") {
      event.preventDefault();
      selectedBeats = selectedBeats.map((index) => index - 16);
   }
   if (event.key == "ArrowDown") {
      event.preventDefault();
      selectedBeats = selectedBeats.map((index) => index + 16);
   }
   if (event.key == "ArrowRight" && selectedBeats.length == 1) {
      event.preventDefault();
      selectedBeats = selectedBeats.map((index) => index + 1);
   }
   if (event.key == "ArrowRight" && selectedBeats.length > 1) {
      event.preventDefault();
      selectedBeats = [Math.max(...selectedBeats) + 1];
   }
   if (event.key == "ArrowLeft" && selectedBeats.length == 1) {
      event.preventDefault();
      selectedBeats = selectedBeats.map((index) => index - 1);
   }
   if (event.key == "ArrowLeft" && selectedBeats.length > 1) {
      event.preventDefault();
      selectedBeats = [Math.min(...selectedBeats) - 1];
   }

   if (event.key == "Backspace") {
      event.preventDefault();
      beatValues = beatValues.map((beatValue, i) => {
         if (selectedBeats.includes(i)) {
            return { tonality: null, type: null, extension: null };
         } else {
            return beatValue;
         }
      });
   }
}

function on_key_up(event) {
   if (event.key == "Shift") isShiftDown = false;
   if (event.key == "Meta") isCommandDown = false;
}
</script>

<svelte:window on:keydown="{on_key_down}" on:keyup="{on_key_up}" bind:scrollY="{scrollPosition}" />

<div class="{scrollPosition > 1000000 ? 'fixed top-[70px] left-1/2 -translate-x-1/2' : ''}  flex h-36 w-full flex-col bg-slate-300">
   <p>{JSON.stringify(selectedBeats)}</p>
   <div class="flex flex-row justify-center ">
      <div class="flex flex-col items-center">
         <select class="mx-2 h-10 w-24 rounded  focus:outline-none" name="root" id="" bind:value="{beatValues[selectedBeats[0]].root}">
            {#each [null, "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"] as chord}
               <option value="{chord}">{chord || ""}</option>
            {/each}
         </select>
         <p class="pt-2">root 🦷</p>
      </div>
      <div class="flex flex-col items-center">
         <select class="mx-2 h-10 w-24 rounded focus:outline-none" name="extension" id="" bind:value="{beatValues[selectedBeats[0]].type}">
            {#each [null, "maj", "m", "aug", "dim", "sus2", "sus4", "6", "m6", "7", "maj7", "maj7(#5)", "m7", "m(maj7)", "dim7", "7sus2", "7sus4", "5"] as type}
               <option value="{type}">{type || ""}</option>
            {/each}
         </select>
         <p class="pt-2">type 🧐</p>
      </div>

      <div class="flex flex-col items-center">
         <select class="mx-2 h-10 w-24 rounded focus:outline-none" name="extension" id="" bind:value="{beatValues[selectedBeats[0]].extension}">
            {#each [null, "add9", "9", "add11", "11", "add13", "13"] as extension}
               <option value="{extension}">{extension || ""}</option>
            {/each}
         </select>
         <p class="pt-2">extension 😎</p>
      </div>
   </div>

   <div class="flex flex-row">
      <p
         class:invisible="{(beatValues[selectedBeats[0]].root && beatValues[selectedBeats[0]].type) ||
            (!beatValues[selectedBeats[0]].root && !beatValues[selectedBeats[0]].type)}"
         class="text-red-500">
         every chord must have a type!
      </p>
      <button
         on:click="{() => (beatValues = Array.from({ length: analysis.beats.length }, () => ({ root: null, type: null, extension: null })))}"
         class="ml-auto rounded-xl bg-white px-8 py-2">
         clear 🗑
      </button>
   </div>
</div>

<copy use:shortcut="{{ control: true, code: 'KeyC', callback: copy }}"> </copy>
<paste use:shortcut="{{ control: true, code: 'KeyV', callback: paste }}"> </paste>

<div class="grid basis-1/4 grid-cols-16 gap-2 ">
   {#each analysis.beats as beat, i}
      <div
         class:mr-2="{(i + 1) % 4 == 0 && (i + 1) % 16 != 0}"
         on:click="{() => (isCommandDown ? changeSpotifyPosition(beat.start) : beatClicked(i))}">
         <div
            id="{i}"
            class:bg-orange-400="{i == currentBar}"
            class:cursor-pointer="{isCommandDown}"
            class="grid h-12 w-full  place-items-center rounded bg-white/5 bg-slate-400  text-white  ring-black focus:outline-none"
            class:ring-2="{selectedBeats.includes(i)}">
            <p class="select-none">{Object.values(beatValues[i]).join("")}</p>
         </div>
      </div>
   {/each}
</div>
