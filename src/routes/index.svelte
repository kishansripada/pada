<script>
import { homePageMusicXml } from "../homePageMusicXml.js";
import Flat from "../lib/Tabs/Flat.svelte";
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import { browser } from "$app/env";
import Typewriter from "svelte-typewriter";
import exampleTab from "../static/exampleTab.png";
import exampleTab1 from "../static/exampleTab1.png";
import ColorSplotch from "$lib/ColorSplotch.svelte";
import { goto } from "$app/navigation";
import { user } from "../store.js";

// $: if ($user && browser) {
//    goto("/discover");
// }

const linear = (options) => {
   let { iStart, iEnd, oStart, oEnd, i } = options;
   if (i < iStart) return oStart;
   if (i > iEnd) return oEnd;
   return ((i - iStart) / (iEnd - iStart)) * (oEnd - oStart) + oStart;
};

let scrollPosition = 0;
// $: console.log(scrollPosition);
let currentBar = 0;
onMount(() => {
   let interval = window.setInterval(async () => {
      currentBar = currentBar < 40 ? currentBar + 1 : 0;
   }, 700);
});
</script>

<svelte:head>
   <title>Bop Tabs — Interactive, Modern, Tablatures & Chords</title>
</svelte:head>

<svelte:window bind:scrollY="{scrollPosition}" />

<ColorSplotch stylePosition="top: -250px; right: 0px;" color="#F5CDFF" />
<ColorSplotch stylePosition="top: -250px; left: 0px; transform: rotate(180deg)" color="#ADD8E6" />
<ColorSplotch stylePosition="top: 600px; left: 0px; transform: rotate(180deg)" color="#1DB954" />

<!-- <div class="absolute  z-[-40] h-[500px] w-[500px] overflow-hidden">
   <div
      class="z-50"
      style="background-image: -o-radial-gradient(47.64% 52.94%, 37.66% 48.2%, #6a0dad 0%, rgba(239, 255, 250, 0) 100%);
 background-image: radial-gradient(37.66% 48.2% at 47.64% 52.94%, #6a0dad 0%, rgba(239, 255, 250, 0) 100%);
 position: absolute;
 top: 0px;
 right: 0px;
 z-index: 50;">
   </div>
</div> -->

<div class=" absolute top-24 h-[500px] w-[1000px] overflow-hidden">
   <div
      class=" w-full"
      style="background-image: -o-radial-gradient(47.64% 52.94%, 37.66% 48.2%, #6a0dad 0%, rgba(239, 255, 250, 0) 100%);
 background-image: radial-gradient(37.66% 48.2% at 47.64% 52.94%, #6a0dad 0%, rgba(239, 255, 250, 0) 100%);
 position: absolute;
 height: 100%;
 width: 100%;
 top: 0px;
 right: 0px;
 z-index: -50;
 opacity: 0.3;">
   </div>
</div>

<div class=" absolute right-0 top-0 h-[500px] w-[1000px] overflow-hidden">
   <div
      class=" w-full"
      style="background-image: -o-radial-gradient(47.64% 52.94%, 37.66% 48.2%, #6495ED 0%, rgba(239, 255, 250, 0) 100%);
 background-image: radial-gradient(37.66% 48.2% at 47.64% 52.94%, #6495ED 0%, rgba(239, 255, 250, 0) 100%);
 position: absolute;
 height: 100%;
 width: 100%;
 top: 0px;
 right: 0px;
 z-index: -50;
 opacity: 0.3;">
   </div>
</div>

<div id="BANNER" class="relative h-[800px]">
   <div class="pt-6 text-center text-9xl font-extrabold">
      <div class="">interactive.</div>

      <p class="w-full bg-gradient-to-r from-[#7928CA] to-[#FF0080] bg-clip-text  text-transparent">modern.</p>

      <Typewriter loop cursor="{false}">
         <p class="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] bg-clip-text  text-transparent">tablatures</p>
         <p class="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] bg-clip-text  text-transparent">chords</p>
      </Typewriter>
   </div>

   <div class="absolute top-[475px] px-[10%] text-center text-[20px] font-light text-[#666666]">
      bop tabs leverages modern technology to enchance the antiquated way of learning music, making it more accessible and enjoyable to learn.
      <div class="pt-10">
         <span class="mr-3 text-3xl"> 👉</span>
         <a
            href="/signup"
            class=" rounded-md bg-black px-3 py-2 text-white ring-2 ring-black transition duration-300 ease-in-out hover:bg-white hover:text-black">
            get started
         </a>
      </div>
   </div>
</div>
<!-- 
<img
   style="transform: rotate(30deg)"
   class=" absolute top-[500px] left-[-200px] z-[-60] h-[200px]  select-none opacity-5"
   src="{exampleTab}"
   alt="" />

<img style="transform: rotate(30deg)" class=" absolute top-[0px] left-[-200px] z-[-60] h-[200px]  select-none opacity-5" src="{exampleTab}" alt="" />

<img
   style="transform: rotate(-45deg)"
   class=" absolute top-[500px] right-[-200px] z-[-60] h-[200px]  select-none opacity-5"
   src="{exampleTab1}"
   alt="" />

<img
   style="transform: rotate(-45deg)"
   class=" absolute top-[0px] right-[-200px] z-[-60] h-[200px]  select-none opacity-10"
   src="{exampleTab1}"
   alt="" /> -->

<!-- <div id="CHORDS SECTION" class="relative h-[500px] text-[#666666]">
   <div class=" absolute right-0 top-0" style="transform: rotate({linear({ iStart: 200, iEnd: 600, oStart: 20, oEnd: 0, i: scrollPosition })}deg);">
      <div class="ml-auto flex flex-col">
         <h1 class="  bg-gradient-to-r from-green-400 to-black bg-clip-text  text-7xl font-extrabold text-transparent">Chords</h1>
         <h1 class="  bg-gradient-to-r from-green-400 to-black bg-clip-text  text-7xl font-extrabold text-transparent">Synced With</h1>
         <h1 class=" bg-gradient-to-r from-green-400 to-black bg-clip-text text-7xl font-extrabold text-transparent">Spotify</h1>
      </div>
   </div>

   <div
      class="absolute top-[250px] flex w-[425px] text-xl "
      style="right: {linear({ iStart: 300, iEnd: 600, oStart: -200, oEnd: 0, i: scrollPosition })}px;">
      <div class=" ">
         <p>
            Bop Tabs connects to your <span class="  bg-gradient-to-r from-green-400 to-black bg-clip-text font-bold text-transparent">Spotify</span> account
            so you can listen along to songs in real time with chords
         </p>
      </div>
   </div>

   <div class="absolute top-[50px] left-0 grid w-[576px] basis-1/4 grid-cols-8 gap-2">
      {#each Array(5).fill(["E", "", "", "", "D", "", "C", ""]).flat() as chord, j}
         <p
            class="grid h-12 w-full place-items-center rounded bg-white/5 text-xl text-[#091834] outline hover:bg-black/25 "
            class:bg-slate-400="{j == currentBar}">
            {chord}
         </p>
      {/each}
   </div>
</div> -->

<!-- <div id="TABS SECTION" class="relative h-[750px] ">
   <div class="whitespace-nowrap">
      <p
         class=" absolute top-0 bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-7xl font-extrabold text-transparent"
         style="left: {linear({ iStart: 600, iEnd: 1000, oStart: 500, oEnd: 0, i: scrollPosition })}px;">
         Don't Guess
      </p>
      <h1
         class="absolute top-[75px] bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text pb-5  text-7xl font-extrabold text-transparent"
         style="left: {linear({ iStart: 600, iEnd: 1000, oStart: -500, oEnd: 0, i: scrollPosition })}px;">
         The Rhythm
      </h1>
      <h1
         class=" absolute bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-7xl font-extrabold text-transparent"
         style="
         top: {linear({ iStart: 900, iEnd: 1100, oStart: -500, oEnd: 150, i: scrollPosition })}px;
         font-size:{linear({ iStart: 1070, iEnd: 1100, oStart: 90, oEnd: 72, i: scrollPosition })}px;
         opacity: {linear({
            iStart: 900,
            iEnd: 1100,
            oStart: 0,
            oEnd: 1,
            i: scrollPosition,
         })};">
         Feel It.
      </h1>
   </div>

   <div class="absolute top-[250px] w-96 text-xl">
      <p>
         Bop Tabs never displays static tabs. Listen to all your dynamic, <span
            class="  bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text font-bold text-transparent">interactive</span> tablatures to get a sense of
         the rhythm
      </p>
   </div>
   {#if browser}
      <div class="absolute right-[0] top-[50px] -z-50">
         <Flat xml="{homePageMusicXml}" style="height:300px; width: 700px" />
      </div>
   {/if}
</div> -->

<div class="absolute top-[3000px] right-[100px] w-full">test</div>

<div class="flex flex-row pt-48 ">
   <div class="mr-auto flex flex-col">
      <h1 class="  bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text  text-7xl font-extrabold text-transparent">AI Generated</h1>
      <h1 class=" bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-7xl font-extrabold text-transparent">Chords</h1>
   </div>
</div>

<style>
</style>
