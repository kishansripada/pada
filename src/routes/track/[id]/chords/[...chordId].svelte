<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
export let trackDetails;
import ColorSplotch from "$lib/ColorSplotch.svelte";
import { spotifyPosition, chordPosition, currentlyPlaying, currentTabs, currentChords } from "../../../../store.js";
import { user } from "../.././../../store.js";
import { supabase } from "../../../../supabase.js";
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import { browser } from "$app/env";
import { prominent } from "color.js";
import { majorKeyNotes } from "../../../../musicTheory.js";
import plus from "../../../../static/plus.svg";
import minus from "../../../../static/minus.svg";

const contructChord = (beat, transpose) => {
   if (beat.chord?.root == null) return "";
   let root = majorKeyNotes[0][(beat.chord?.root + transpose + 12) % 12];
   let type = beat.chord?.type == "maj" ? "" : beat.chord?.type;
   let extension = beat.chord?.extension || "";
   if (!beat.chord?.over) return root + type + extension;
   let over = majorKeyNotes[0][(beat.chord?.over + transpose + 12) % 12];
   return root + type + extension + "/" + over;
};

let transpose = 0;

function rgbToHex(r, g, b) {
   return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

let colors;
$: if (browser) {
   colors = prominent(trackDetails.album.images[0].url, { amount: 4 }).then((colors) => colors.map((color) => rgbToHex(...color)));
}

const upload = () => {
   if (!$user) {
      goto(`/login?referrer=${$page.url.href}`, { noscroll: true });
   } else {
      goto(`${$page.url.href}/write`, { noscroll: true });
   }
};

// get the current track id from the URL
$: trackId = $page.params.id;

$: chords = supabase
   .from("chords")
   .select("*")
   .eq("spotifyId", trackId)
   .eq("approvalstatus", "approved")
   .then((r) => r.data);

$: if (chords) {
   chords.then((chords) => currentChords.set(chords));
}

// every track will default to the first tab
let selected = 0;

// if the trackId changes, then reset the current selected track to the first
$: (selected = 0), trackId;
let autoScroll = true;

if (browser && !localStorage.autoScroll) {
   localStorage.autoScroll = true;
} else if (browser) {
   autoScroll = JSON.parse(localStorage.autoScroll);
}

$: if (browser) {
   localStorage.autoScroll = autoScroll;
}

const scrollIntoView = (currentBar) => {
   if (!autoScroll || !browser) return;
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
const changeSpotifyPosition = (bar, i) => {
   chordPosition.set({ bar: bar });
   currentBar = i;
};

let currentBar = 0;
// given the spotify position, calculate the current bar of rthe song
$: (async () => {
   if (!(await chords)?.length) return;
   // if the currently playing song is different than the song being viewed, don't display synced chords
   if ($currentlyPlaying?.id != $page.params.id) return -1;
   currentBar = (await chords)[selected].chords.findIndex((beat) => {
      return $spotifyPosition / 1000 < beat.start + beat.duration;
   });
})(),
   $spotifyPosition;
</script>

<svelte:head>
   <title>{trackDetails.name} — Chords | Bop Tabs</title>
   <meta
      name="description"
      content="learn to play {trackDetails.name} by {trackDetails.artists[0]
         .name} chords synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta
      name="keywords"
      content="{trackDetails.name}, {trackDetails.artists
         .map((artist) => artist.name)
         .join(', ')}, Chords, guitar chords, chords, tab, ukulele, tab, tablature, tablatures" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="{trackDetails.name} — Chords | Bop Tabs" />
   <meta name="twitter:image" content="{trackDetails.album.images[0].url}" />
   <meta property="og:type" content="song" />
   <meta property="og:title" content="{trackDetails.name} — Chords | Bop Tabs" />
   <meta
      property="og:description"
      content="learn to play {trackDetails.name} by {trackDetails.artists[0]
         .name} chords, tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta property="og:image" content="{trackDetails.album.images[0].url}" />
   <!-- <meta property="og:url" content="PERMALINK" /> -->
   <meta property="og:site_name" content="Bop Tabs" />
</svelte:head>

{#await chords}
   <div class="flex items-center justify-center mt-3">
      <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
   </div>
{:then chords}
   {#if chords?.length}
      <div class="flex flex-row mb-4 ">
         <div class=" flex flex-col  pr-3 justify-center">
            <select
               bind:value="{selected}"
               class=" form-select  mr-5 w-24 appearance-none rounded-xl border bg-white/5 bg-clip-padding px-2 py-1.5 text-center text-base font-normal text-[#091834] outline-none hover:bg-white/10">
               {#each chords as version, index}
                  <option value="{index}">
                     version {index + 1}
                  </option>
               {/each}
            </select>
         </div>

         <div class="flex flex-row justify-between items-center mr-16">
            <button class="px-1 py-1 text-white cursor-pointer rounded-lg bg-[#190027]" on:click="{() => (transpose < 11 ? transpose++ : null)}">
               <svg class="h-8 w-8 fill-white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"></path>
               </svg>
            </button>

            <div class="flex flex-col items-center mx-4 w-10">
               <p class="text-5xl text-purple-500">{transpose * -1}</p>
               <p class="text-gray-600">capo</p>
            </div>

            <button class="px-1 py-1 text-white cursor-pointer rounded-lg bg-[#190027]" on:click="{() => (transpose > -11 ? transpose-- : null)}">
               <svg class="h-8 w-8 fill-white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                  ><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
            </button>
         </div>

         <div class="flex flex-row justify-between items-center">
            <button class="px-1 py-1 text-white cursor-pointer rounded-lg bg-[#190027] " on:click="{() => (transpose > -11 ? transpose-- : null)}">
               <svg class="h-8 w-8 fill-white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"></path>
               </svg>
            </button>

            <div class="flex flex-col items-center mx-4 w-16">
               <p class="text-5xl text-purple-500">{transpose}</p>
               <p class="text-gray-600">transpose</p>
            </div>

            <button class="px-1 py-1 text-white cursor-pointer rounded-lg bg-[#190027]" on:click="{() => (transpose < 11 ? transpose++ : null)}">
               <svg class="h-8 w-8 fill-white" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                  ><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
            </button>
         </div>

         <div class="flex flex-col justify-end mb-4 items-center px-10">
            <div>
               <label for="default-toggle" class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" value="" id="default-toggle" class="peer sr-only" bind:checked="{autoScroll}" />
                  <div
                     class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none  ">
                  </div>
               </label>
            </div>

            <p class="text-gray-600 items-center justify-center">auto scroll</p>
         </div>

         <div class="z-40 flex h-24  flex-row items-center r text-black ml-auto">
            <img
               class="h-16 w-16 rounded-full object-cover"
               src="https://mofbpdxaxkjlvywcbpmj.supabase.co/storage/v1/object/public/profilepics/{chords[selected].authorid}/pfp.png"
               alt="" />

            <div class="flex flex-col pl-3 pt-3">
               <p class="">Kishan Sripada</p>
               <!-- <p class="mt-auto mb-4">{approvedTabsOrChords[selected].description}</p> -->
            </div>
         </div>
      </div>

      <div class="grid basis-1/4 grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-0 mb-8">
         {#each chords[selected].chords as beat, i}
            <div on:click="{() => changeSpotifyPosition(beat.start, i)}">
               <div
                  class:lg:border-r-4="{(i + 1) % 4 == 0 && (i + 1) % 16 != 0}"
                  class:bg-[#190027]="{i == currentBar}"
                  class:text-white="{i == currentBar}"
                  id="{i}"
                  class="grid h-12 w-full place-items-center ring-1 ring-black bg-white/5 border-black text-black focus:outline-none cursor-pointer">
                  <p class="select-none">
                     {contructChord(beat, transpose)}
                  </p>
               </div>
            </div>
         {/each}
      </div>
   {:else}
      <div class="flex flex-row justify-center pt-8">
         <div class="flex flex-col items-center">
            <p>there aren't any chords for this song 😞</p>
            <button on:click="{upload}" class="text-blue-500" href="{$page.url.pathname}/write">write one</button>
         </div>
      </div>
   {/if}
{/await}

{#if colors}
   {#await colors then colors}
      <div class="pointer-events-none">
         <!-- <div transition:fade|local> -->
         <ColorSplotch stylePosition="top: 700px; right: 0px; opacity: 0.5;" color="{colors[0]}" />
         <!-- <ColorSplotch stylePosition="top: 700px; left: 0px; transform: rotate(180deg);opacity: 0.5" color="{colors[1]}" /> -->
         <!-- <ColorSplotch stylePosition="top: 1000px; left: 200px; transform: rotate(-90deg);opacity: 0.5" color="{colors[2]}" /> -->
         <!-- </div> -->

         <div class=" absolute right-0 top-[1000px] h-[500px] w-[1000px] overflow-hidden">
            <div
               class=" w-full"
               style="background-image: -o-radial-gradient(47.64% 52.94%, 37.66% 48.2%, {colors[0]} 0%, rgba(239, 255, 250, 0) 100%);
       background-image: radial-gradient(37.66% 48.2% at 47.64% 52.94%, {colors[0]} 0%, rgba(239, 255, 250, 0) 100%);
       position: absolute;
       height: 100%;
       width: 100%;
       top: 0px;
       right: 0px;
       z-index: -50;
       opacity: 0.3;">
            </div>
         </div>

         <div class=" absolute top-[700px] h-[500px] w-[1000px] overflow-hidden left-0">
            <div
               class=" w-full"
               style="background-image: -o-radial-gradient(47.64% 52.94%, 37.66% 48.2%, {colors[1]} 0%, rgba(239, 255, 250, 0) 100%);
       background-image: radial-gradient(37.66% 48.2% at 47.64% 52.94%, {colors[1]} 0%, rgba(239, 255, 250, 0) 100%);
       position: absolute;
       height: 100%;
       width: 100%;
       top: 0px;
       right: 0px;
       z-index: -50;
       opacity: 0.3;">
            </div>
         </div>
      </div>
   {/await}
{/if}
