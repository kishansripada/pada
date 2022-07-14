<script>
import Flat from "../lib/Tabs/Flat.svelte";
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import { browser } from "$app/env";
import Typewriter from "svelte-typewriter";
import exampleTab from "../static/exampleTab.png";
import exampleTab1 from "../static/exampleTab1.png";
import ColorSplotch from "$lib/ColorSplotch.svelte";
import { goto } from "$app/navigation";

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
   <meta
      name="description"
      content="learn to play guitar chords & tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta name="keywords" content=" Chords, guitar chords, chords, tab, ukulele, tab, tablature, tablatures, sync easy" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Bop Tabs — Interactive, Modern, Tablatures & Chords" />
   <meta name="twitter:image" content="https://i.imgur.com/xGowEtj.png" />
   <meta property="og:type" content="song" />
   <meta property="og:title" content="Bop Tabs — Interactive, Modern, Tablatures & Chords" />
   <meta
      property="og:description"
      content="learn to play guitar chords & tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta property="og:image" content="https://i.imgur.com/xGowEtj.png" />
   <!-- <meta property="og:url" content="PERMALINK" /> -->
   <meta property="og:site_name" content="Bop Tabs — Interactive, Modern, Tablatures & Chords" />
</svelte:head>

<svelte:window bind:scrollY="{scrollPosition}" />

<ColorSplotch stylePosition="top: -250px; right: 0px;" color="#F5CDFF" />
<ColorSplotch stylePosition="top: -250px; left: 0px; transform: rotate(180deg)" color="#ADD8E6" />
<!-- <ColorSplotch stylePosition="top: 600px; left: 0px; transform: rotate(180deg)" color="#1DB954" /> -->

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
   <h1 class="flex flex-col items-center pt-6 text-center text-9xl font-extrabold">
      <div class="">interactive.</div>

      <p class="bg-gradient-to-r from-[#7928CA] to-[#FF0080] bg-clip-text  text-transparent">modern.</p>

      <Typewriter loop cursor="{false}">
         <p class="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] bg-clip-text  text-transparent">tablatures</p>
         <p class="bg-gradient-to-r from-[#007CF0] to-[#00DFD8] bg-clip-text  text-transparent">chords</p>
      </Typewriter>
   </h1>

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

<img
   style="transform: rotate({linear({ iStart: 0, iEnd: 600, oStart: 300, oEnd: 360, i: scrollPosition })}deg); opacity: {linear({
      iStart: 200,
      iEnd: 600,
      oStart: 0,
      oEnd: 1,
      i: scrollPosition,
   })}; 
   top: {linear({ iStart: 200, iEnd: 600, oStart: 360, oEnd: 900, i: scrollPosition })}px; 
   left: {linear({
      iStart: 200,
      iEnd: 600,
      oStart: 360,
      oEnd: 600,
      i: scrollPosition,
   })}px"
   class=" absolute top-[500px] left-[-200px] z-[-60] h-[130px]  select-none opacity-5"
   src="{exampleTab}"
   alt="" />

<img
   style="transform: rotate({linear({ iStart: 12, iEnd: 600, oStart: 300, oEnd: 360, i: scrollPosition })}deg); opacity: {linear({
      iStart: 200,
      iEnd: 600,
      oStart: 0,
      oEnd: 1,
      i: scrollPosition,
   })}; 
   top: {linear({ iStart: 0, iEnd: 600, oStart: 360, oEnd: 1050, i: scrollPosition })}px; 
   left: {linear({
      iStart: 0,
      iEnd: 600,
      oStart: 0,
      oEnd: 600,
      i: scrollPosition,
   })}px"
   class=" absolute top-[500px] left-[-200px] z-[-60] h-[130px]  select-none opacity-5"
   src="{exampleTab1}"
   alt="" />

<div id="TABS SECTION" class="relative h-[750px] ">
   <div class="whitespace-nowrap">
      <p
         class=" absolute top-0 bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-7xl font-extrabold text-transparent"
         style="left: 0px;">
         Don't Guess
      </p>
      <p
         class="absolute top-[75px] bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text pb-5  text-7xl font-extrabold text-transparent"
         style="left:0px;">
         The Rhythm
      </p>
      <p
         class=" absolute bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-7xl font-extrabold text-transparent"
         style="
         top: 150px;">
         Feel It.
      </p>
   </div>

   <!-- <div class="absolute top-[250px] w-96 text-xl">
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
   {/if} -->
</div>

<style>
</style>
