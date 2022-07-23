<script>
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import { browser } from "$app/env";
import Typewriter from "svelte-typewriter";
import ExampleTab from "../lib/ExampleTab.svelte";
import ColorSplotch from "$lib/ColorSplotch.svelte";
import { goto } from "$app/navigation";
import { majorKeyNotes } from "../musicTheory.js";
import A from "./track/[id]/chords/[...chordId].svelte";

const contructChord = (beat) => {
   if (beat.root == null) return "";
   let root = majorKeyNotes[0][beat.root];
   let type = beat.type == "maj" ? "" : !beat.type ? "" : beat.type;
   let extension = beat.extension || "";
   if (beat.over == null) return root + type + extension;
   let over = majorKeyNotes[0][beat.over];
   return root + type + extension + "/" + over;
};
let selectedBeat = 0;

let beatValues = Array.from({ length: 5 }, () => [
   {
      root: 2,
      type: "maj",
      over: null,
   },
   {
      root: null,
      type: null,
      over: null,
   },
   {
      root: 2,
      type: "maj",
      over: 6,
   },
   {
      root: null,
      type: null,
      over: null,
   },
   {
      root: 7,
      type: "maj",
      over: null,
   },
   {
      root: null,
      type: null,
      over: null,
   },
   {
      root: 9,
      type: "maj",
      over: null,
   },
   {
      root: null,
      type: null,
      over: null,
   },
]).flat();

// const linear = (options) => {
//    let { iStart, iEnd, oStart, oEnd, i } = options;
//    if (i < iStart) return oStart;
//    if (i > iEnd) return oEnd;
//    return ((i - iStart) / (iEnd - iStart)) * (oEnd - oStart) + oStart;
// };

let scrollPosition = 0;
</script>

<svelte:head>
   <title>Pada — Impressively, Beautiful, Tablatures & Chords</title>
   <meta
      name="description"
      content="learn to play guitar chords & tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta name="keywords" content=" Chords, guitar chords, chords, tab, ukulele, tab, tablature, tablatures, sync easy" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Pada — Impressively, Beautiful, Tablatures & Chords" />
   <meta name="twitter:image" content="https://i.imgur.com/Exyvnad.png" />
   <meta property="og:type" content="song" />
   <meta property="og:title" content="Pada — Impressively, Beautiful, Tablatures & Chords" />
   <meta
      property="og:description"
      content="learn to play guitar chords & tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta property="og:image" content="https://i.imgur.com/Exyvnad.png" />
   <!-- <meta property="og:url" content="PERMALINK" /> -->
   <meta property="og:site_name" content="Pada — Impressively, Beautiful, Tablatures & Chords" />
</svelte:head>

<svelte:window bind:scrollY="{scrollPosition}" />
<!-- top right -->
<ColorSplotch stylePosition="top: -200px; right: -500px; opacity: 0.8; z-index:20" color="#F5CDFF" />

<!-- top left -->
<ColorSplotch stylePosition="top: -250px; left: -500px; opacity: 0.8; z-index:20" color="#ADD8E6" />

<!-- middle banner -->
<ColorSplotch
   stylePosition="top: -100px;  opacity: 0.3; z-index:20;margin-left: auto;
margin-right: auto;
left: 400px;
right: 0;"
   color="#6a0dad" />
<ColorSplotch
   stylePosition="top: -100px;  opacity: 0.3; z-index:20;margin-left: auto;
margin-right: auto;
left: 0px;
right: 400px;"
   color="#6495ED" />

<!-- background stuff -->
<div class="pointer-events-none absolute top-[700px] z-10 h-[2000px] w-full overflow-hidden">
   <div class="relative left-[-100px] z-0 mt-[200px] h-[750px] w-[120%] rotate-[-8deg] bg-[#190027]"></div>
</div>

<div id="BANNER" class=" z-30  mt-10 flex flex-col items-center justify-center">
   <h1 class="flex flex-col pt-6 text-left text-5xl font-extrabold md:text-8xl lg:text-9xl">
      <div class="">impressively <span class=" text-transparent">.</span></div>

      <p class="">beautiful</p>
      <div class="inline-flex">
         <Typewriter loop cursor="{false}">
            <p class="bg-gradient-to-r from-[#7928CA] to-[#FF0080] bg-clip-text  text-transparent">tablatures.</p>
            <p class="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] bg-clip-text  text-transparent">chords.</p>
         </Typewriter> <span class="text-transparent">.</span>
      </div>
   </h1>

   <div class=" mt-20 flex w-full  flex-col items-center text-center text-[20px] font-light ">
      <p class="max-w-[1200px] px-[10%] text-sm lg:text-xl">
         pada leverages modern technology to enchance the antiquated way of learning music, making it more accessible and enjoyable to learn.
      </p>
      <div class="pt-10">
         <a
            href="/signup"
            class=" text-md rounded-full bg-purple-500 px-5 py-2 text-white transition duration-300 ease-in-out hover:bg-black hover:text-white">
            get started
         </a>
      </div>
   </div>
</div>

<div class="container relative z-50 mt-24 text-white lg:mt-96">
   <div class="flex flex-col items-center justify-between lg:flex-row">
      <div class="flex flex-col justify-center lg:w-1/2">
         <div>
            <p class="z-50 text-5xl">interactive, modern chord charts</p>
            <p class="z-50 mt-4 text-3xl text-purple-300">all synced to Spotify</p>

            <p class="z-50 mt-9 text-gray-300">
               pada enables simple, elegant chord viewing coupled with an incredible chord writing experience. simply select the chord you wish to
               edit and contruct it from the ground up
            </p>
         </div>
         <a
            href="/track/34gCuhDGsG4bRPIf9bb02f/chords"
            class="mt-16 mr-auto ml-auto cursor-pointer rounded-full bg-purple-300 py-1 px-3 font-semibold text-black transition duration-300 ease-in-out hover:bg-white">
            see an example
         </a>
      </div>

      <div class="flex grow flex-col lg:ml-24 lg:w-1/2">
         <div class="mb-10 flex flex-row items-center justify-center">
            <div class="flex flex-col items-center">
               <select class="mx-2 h-10 w-24 rounded text-black ring-1 ring-black focus:outline-none" bind:value="{beatValues[selectedBeat].root}">
                  {#each [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as chord}
                     <option value="{chord}">{majorKeyNotes[0][chord] || ""}</option>
                  {/each}
               </select>
               <p class="pt-2">root</p>
            </div>
            <div class="flex flex-col items-center">
               <select class="mx-2 h-10 w-24 rounded text-black ring-1 ring-black focus:outline-none" bind:value="{beatValues[selectedBeat].type}">
                  {#each [null, "maj", "m", "aug", "dim", "sus2", "sus4", "6", "m6", "7", "maj7", "maj7(#5)", "m7", "m(maj7)", "dim7", "7sus2", "7sus4", "5"] as type}
                     <option value="{type}">{type || ""}</option>
                  {/each}
               </select>
               <p class="pt-2">type</p>
            </div>
            <div class="flex  flex-col  items-center">
               <select
                  class="mx-2 h-10 w-24 rounded text-black ring-1 ring-black focus:outline-none"
                  bind:value="{beatValues[selectedBeat].extension}">
                  {#each [null, "add9", "9", "add11", "11", "add13", "13"] as extension}
                     <option value="{extension}">{extension || ""}</option>
                  {/each}
               </select>
               <p class="pt-2">extension</p>
            </div>
            <p class="mb-8 text-7xl text-white/60">/</p>
            <div class="flex flex-col items-center">
               <select class="mx-2 h-10 w-24 rounded text-black ring-1 ring-black focus:outline-none" bind:value="{beatValues[selectedBeat].over}">
                  {#each [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as chord}
                     <option value="{chord}">{majorKeyNotes[0][chord] || ""}</option>
                  {/each}
               </select>
               <p class="pt-2">over</p>
            </div>
         </div>

         <div class=" mb-2 grid grow basis-1/4 grid-cols-8 gap-0">
            {#each beatValues as beat, i}
               <div>
                  <div
                     on:click="{() => (selectedBeat = i)}"
                     class:bg-white="{selectedBeat == i}"
                     class:text-black="{selectedBeat == i}"
                     class:text-white="{selectedBeat != i}"
                     class="grid h-12 cursor-pointer place-items-center  border-white  bg-white/5  ring-1 ring-white focus:outline-none"
                     class:border-r-4="{(i + 1) % 4 == 0 && (i + 1) % 8 != 0}">
                     <p class="select-none">
                        {contructChord(beat)}
                     </p>
                  </div>
               </div>
            {/each}
         </div>
      </div>
   </div>
</div>

<div class="container mt-[400px] mb-[200px] flex flex-col lg:flex-row">
   <div class="flex w-1/3 flex-col justify-center">
      <div>
         <p class="z-50 text-5xl">playback ALL your guitar tabs</p>
         <p class="z-50 mt-4 text-3xl text-blue-700">never guess the rhythm again</p>

         <p class="z-50 mt-9 text-[#190027]">
            pada allows users to upload a unversally accepted <span class="font-semibold text-blue-600">MusicXML</span> file, which enables
            <span class="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text  font-semibold text-transparent">live playback</span>
            for every tab on the platform. don't try to guess the rhythm, just hear it.
         </p>
      </div>
      <a
         href="/track/34gCuhDGsG4bRPIf9bb02f/chords"
         class="mt-16 mr-auto ml-auto cursor-pointer rounded-full bg-blue-300 py-1 px-3 font-semibold text-black transition duration-300 ease-in-out hover:bg-white">
         see an example
      </a>
   </div>
   <div class="w-2/3">
      <ExampleTab />
   </div>
</div>

<div class=" z-[-10]  flex h-[600px] w-full flex-col justify-center bg-slate-100">
   <div class="container  flex flex-col md:flex-row ">
      <div class="flex flex-col items-center justify-center">
         <p class="z-50 text-5xl">it's easy! let's get started.</p>
         <div class="mt-16 flex flex-row items-center">
            <p class="text-wrap z-50 w-1/2 text-center text-3xl text-green-700">sign up with Spotify and start playing and listening</p>
            <p class="mx-8 text-3xl">OR</p>
            <p class="z-50  w-1/2 text-center text-3xl text-blue-700">join pada and start uploading tabs</p>
         </div>
         <div class="mt-16 mb-16 flex flex-row items-center justify-around">
            <a
               href="/track/34gCuhDGsG4bRPIf9bb02f/chords"
               class="mt-16 mr-96 cursor-pointer rounded-full bg-blue-300 py-1 px-3 font-semibold text-black transition duration-300 ease-in-out hover:bg-white">
               sign up!
            </a>
            <div></div>
            <a
               href="/track/34gCuhDGsG4bRPIf9bb02f/chords"
               class="mt-16 cursor-pointer rounded-full bg-blue-300 py-1 px-3 font-semibold text-black transition duration-300 ease-in-out hover:bg-white">
               connect to spotify
            </a>
         </div>
      </div>
   </div>
</div>

<!-- <section class="h-96" style="background-image: linear-gradient(90deg, rgba(161, 119, 255, 0.6), rgba(2, 206, 255, 0.6))"></section> -->
<style>
</style>
