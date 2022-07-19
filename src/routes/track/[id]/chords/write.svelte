<script context="module">
import { getToken, getTrackAnalysis } from "../../../../spotify.js";

export async function load({ params, stuff }) {
   let token = await getToken().then((token) => token.access_token);
   let analysis = await getTrackAnalysis(params.id, token);

   return {
      props: { analysis, trackDetails: stuff.trackDetails },
   };
}
</script>

<script>
export let analysis;
export let trackDetails;
import { spotifyPosition, chordPosition, isSearching } from "../../../../store.js";
import { shortcut } from "../../../../shortcut.js";
import { supabase } from "../../../../supabase.js";
import { goto } from "$app/navigation";
import { toast } from "@zerodevx/svelte-toast";
import { majorKeyNotes } from "../../../../musicTheory.js";

const contructChord = (i, beatValues) => {
   let beat = beatValues[i];
   if (beat.root == null) return "";
   let root = majorKeyNotes[0][beat.root];
   let type = beat.type == "maj" ? "" : !beat.type ? "" : beat.type;
   let extension = beat.extension || "";
   if (beat.over == null) return root + type + extension;
   let over = majorKeyNotes[0][beat.over];
   return root + type + extension + "/" + over;
};

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

let description;
let selectedBeats = [0];
let copied = [{ root: null, type: null, extension: null, over: null }];
let beatValues = Array.from({ length: analysis.beats.length }, () => ({ root: null, type: null, extension: null, over: null }));
let isShiftDown = false;
let isCommandDown = false;

const copy = () => {
   copied = beatValues.filter((beatValue, i) => {
      return selectedBeats.includes(i);
   });
};

const cut = () => {
   copied = beatValues.filter((beatValue, i) => {
      return selectedBeats.includes(i);
   });
   beatValues = beatValues.map((beatValue, i) => {
      if (selectedBeats.includes(i)) {
         return { root: null, type: null, extension: null, over: null };
      } else {
         return beatValue;
      }
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
function on_key_down(event) {
   if ($isSearching) return;
   if (event.repeat) return;
   if (event.key == "Shift") isShiftDown = true;
   if (event.key == "Meta") isCommandDown = true;

   if (event.key == "ArrowUp" && Math.min(...selectedBeats) >= 16) {
      event.preventDefault();
      selectedBeats = selectedBeats.map((index) => index - 16);
   }
   if (event.key == "ArrowDown" && Math.max(...selectedBeats) < analysis.beats.length - 16) {
      event.preventDefault();
      selectedBeats = selectedBeats.map((index) => index + 16);
   }

   if (event.key == "ArrowRight" && Math.max(...selectedBeats) < analysis.beats.length - 1) {
      event.preventDefault();
      //   if (isShiftDown) {
      //      selectedBeats = [Math.max(...selectedBeats) + 1, ...selectedBeats];
      //      return;
      //   }
      selectedBeats = [Math.max(...selectedBeats) + 1];
   }

   if (event.key == "ArrowLeft" && Math.min(...selectedBeats) > 0) {
      event.preventDefault();
      //   if (isShiftDown) {
      //      selectedBeats = [Math.min(...selectedBeats) - 1, ...selectedBeats];
      //      return;
      //   }
      selectedBeats = [Math.min(...selectedBeats) - 1];
   }

   if (event.key == "Backspace") {
      event.preventDefault();
      beatValues = beatValues.map((beatValue, i) => {
         if (selectedBeats.includes(i)) {
            return { root: null, type: null, extension: null, over: null };
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

// when chord is clicked send the beat number to the store
const changeSpotifyPosition = (bar, i) => {
   chordPosition.set({ bar: bar });
   currentBar = i;
};

$: currentBar = analysis.beats.findIndex((beat) => {
   return $spotifyPosition / 1000 < beat.start + beat.duration;
});

const upload = async () => {
   //   save space in supa by converting null chords to null value without properties
   let cleanValues = beatValues.map((beatValue) => {
      return Object.values(beatValue).every((x) => x === null) ? null : beatValue;
   });

   let chords = analysis.beats.map((beat, index) => {
      delete beat.confidence;

      return {
         ...beat,
         chord: cleanValues[index],
      };
   });

   try {
      const { trackData, trackError } = await supabase
         .from("tracks")
         .insert([{ name: trackDetails.name, artists: trackDetails.artists.map((artist) => artist.name), spotifyId: trackDetails.id }]);
   } catch (trackError) {
      if (trackError?.code == "23505") {
         console.log("track in database!");
      }
   }

   const { chordData, chordError } = await supabase.from("chords").insert([
      {
         chords,
         description,
         authorid: supabase.auth.user()?.id,
         spotifyId: trackDetails.id,
         approvalstatus: "pending",
      },
   ]);

   if (!chordError) {
      toast.push("submitted successfully!", {
         theme: {
            "--toastBackground": "#006400",
            "--toastBarBackground": "#006400",
            "--toastBorderRadius": "1rem",
         },
      });

      goto(`/track/${trackDetails.id}/chords`);
   }
   if (chordError) {
      toast.push("there was an error submitting your chords", {
         theme: {
            "--toastBackground": "#D2042D",
            "--toastBarBackground": "#D2042D",
            "--toastBorderRadius": "1rem",
         },
      });
   }
};
</script>

<svelte:window on:keydown="{on_key_down}" on:keyup="{on_key_up}" />

<div class=" h-42 mb-8 mt-4 flex  flex-row rounded-xl shadow-xl">
   <div class=" flex w-1/3 flex-col">
      <p class="m-3 mb-auto mr-auto text-5xl">{Math.min(...selectedBeats)}</p>
      <button
         on:click="{() =>
            (beatValues = Array.from({ length: analysis.beats.length }, () => ({ root: null, type: null, extension: null, over: null })))}"
         class="m-2 mt-auto mr-auto rounded px-4 py-2 ring-1 ring-black">
         clear 🗑
      </button>
   </div>

   <div class=" flex w-1/3 flex-col items-center justify-center">
      <div class="flex flex-row items-center justify-center ">
         <div class="flex flex-col items-center">
            <select class="mx-2 h-10 w-24 rounded ring-1 ring-black focus:outline-none" name="root" bind:value="{beatValues[selectedBeats[0]].root}">
               {#each [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as chord}
                  <option value="{chord}">{majorKeyNotes[0][chord] || ""}</option>
               {/each}
            </select>
            <p class="pt-2">root</p>
         </div>
         <div class="flex flex-col items-center">
            <select class="mx-2 h-10 w-24 rounded ring-1 ring-black focus:outline-none" bind:value="{beatValues[selectedBeats[0]].type}">
               {#each [null, "maj", "m", "aug", "dim", "sus2", "sus4", "6", "m6", "7", "maj7", "maj7(#5)", "m7", "m(maj7)", "dim7", "7sus2", "7sus4", "5"] as type}
                  <option value="{type}">{type || ""}</option>
               {/each}
            </select>
            <p class="pt-2">type</p>
         </div>

         <div class="flex w-1/3 flex-col  items-center">
            <select class="mx-2 h-10 w-24 rounded ring-1 ring-black focus:outline-none" bind:value="{beatValues[selectedBeats[0]].extension}">
               {#each [null, "add9", "9", "add11", "11", "add13", "13"] as extension}
                  <option value="{extension}">{extension || ""}</option>
               {/each}
            </select>
            <p class="pt-2">extension</p>
         </div>
         <p class="mb-8 text-7xl text-black/40">/</p>
         <div class="flex flex-col items-center">
            <select class="mx-2 h-10 w-24 rounded ring-1 ring-black focus:outline-none" bind:value="{beatValues[selectedBeats[0]].over}">
               {#each [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as chord}
                  <option value="{chord}">{majorKeyNotes[0][chord] || ""}</option>
               {/each}
            </select>
            <p class="pt-2">over</p>
         </div>
      </div>
   </div>

   <div class="ml-auto flex flex-col p-3 text-right text-sm opacity-50">
      <p>click to select a beat</p>
      <p>hold shift to select multiple beats</p>
      <p>hold ⌘ and click to jump to beat in track</p>
      <p>⌘C to copy</p>
      <p>⌘V to paste</p>
      <p>⌘X to cut</p>
      <p>chords should be in the original key</p>
   </div>
</div>

<copy use:shortcut="{{ control: true, code: 'KeyC', callback: copy }}"> </copy>
<cut use:shortcut="{{ control: true, code: 'KeyX', callback: cut }}"> </cut>
<paste use:shortcut="{{ control: true, code: 'KeyV', callback: paste }}"> </paste>
<div class="grid basis-1/4 grid-cols-16 gap-0">
   {#each analysis.beats as beat, i}
      <div
         on:click="{() => (isCommandDown ? changeSpotifyPosition(beat.start, i) : beatClicked(i))}"
         id="{i}"
         class:border-r-4="{(i + 1) % 4 == 0 && (i + 1) % 16 != 0}"
         class:bg-[#190027]="{i == currentBar}"
         class:text-white="{i == currentBar}"
         class:cursor-pointer="{isCommandDown}"
         class="grid h-12 w-full place-items-center border-black bg-white/5 bg-clip-padding  text-black  ring-1 ring-black focus:outline-none"
         class:bg-gray-200="{selectedBeats.includes(i) && i != currentBar}"
         class:border-2="{selectedBeats.includes(i)}">
         <p class="select-none">
            {contructChord(i, beatValues)}
         </p>
      </div>
   {/each}
</div>

<div class="mb-8 flex flex-row">
   <textarea
      class="mt-6 mr-6 h-10 w-full resize-none rounded bg-transparent px-2 py-2 ring-2 ring-black placeholder:text-black/50 focus:outline-none"
      placeholder="description... (optional)"
      cols="100"
      rows="1"
      bind:value="{description}"></textarea>

   <button on:click="{upload}" class="ml-auto mt-auto rounded bg-purple-600 px-4 py-2 text-white">upload</button>
</div>
