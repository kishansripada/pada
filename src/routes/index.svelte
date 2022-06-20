<script>
import { homePageMusicXml } from "../homePageMusicXml.js";
import Flat from "../lib/Tabs/Flat.svelte";
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import Typewriter from "svelte-typewriter";
import exampleTab from "../static/exampleTab.png";
import exampleTab1 from "../static/exampleTab1.png";

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

<svelte:window bind:scrollY="{scrollPosition}" />

<!-- COLOR SPLOTCHES -->
<div class="static" transition:fade>
   <!-- <div
      class="absolute  top-[-200px] right-[-300px] -z-40 h-[700px] w-[1000px]"
      style="background:radial-gradient(circle at 50% 50%, rgba(227,28,121, 0.15) 0%, rgba(255, 255, 255, 0) 60%);
">
   </div>

   <div
      class="absolute top-[-200px] left-[-400px] -z-40 h-[700px] w-[1000px] "
      style="background:radial-gradient(circle at 50% 50%, rgba(0, 145, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%);
">
   </div>

   <div
      class="absolute top-[800px] left-[-400px] -z-40 h-[700px] w-[1000px]"
      style="background:radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.3) 0%, rgba(255, 255, 255, 0) 60%);}
">
   </div>

   <div
      class="absolute top-[1400px] right-[-400px] -z-40 h-[700px] w-[1000px]"
      style="background:radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.3) 0%, rgba(255, 255, 255, 0) 60%);}
">
   </div> -->

   <img
      class=" absolute  top-[600px] -z-50 h-[200px] select-none	"
      style="transform: rotate({linear({ iStart: 0, iEnd: 500, oStart: -20, oEnd: 0, i: scrollPosition })}deg); right: {75 +
         scrollPosition / 10}px; opacity: {linear({ iStart: 0, iEnd: 900, oStart: 0.7, oEnd: 0, i: scrollPosition })}"
      src="{exampleTab}"
      alt="" />

   <img
      class=" absolute top-[375px] -z-50 h-[200px] rotate-[-20deg] select-none"
      style="transform: rotate({linear({ iStart: 0, iEnd: 500, oStart: -20, oEnd: 0, i: scrollPosition })}deg); right: {75 +
         scrollPosition / 10}px; opacity: {linear({ iStart: 0, iEnd: 900, oStart: 0.7, oEnd: 0, i: scrollPosition })}"
      src="{exampleTab1}"
      alt="" />
</div>

<div id="BANNER" class="h-[800px] ">
   <div class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text pt-16 text-8xl font-extrabold text-transparent">
      <div class="inline-flex">
         {"Interactive, "}
         <span
            ><Typewriter loop cursor="{true}">
               <h1>Modern</h1>
               <p>Fast</p>
               <p>Simple</p>
               <p>Synced</p>
            </Typewriter></span>
      </div>
   </div>
   <div class="bg-gradient-to-r from-blue-400 to-red-600 bg-clip-text pt-4 text-8xl font-extrabold text-transparent">
      <Typewriter loop cursor="{true}">
         <h1>Tablatures</h1>
         <p>Chords</p>
      </Typewriter>
   </div>
</div>

<div id="CHORDS SECTION" class="relative h-[750px] bg-red-50 ">
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
      {#each Array(5).fill(["E", "", "", "", "D", "", "C", ""]).flat() as group, j}
         <p
            class="grid h-12 w-full place-items-center rounded bg-white/5 text-xl text-[#091834] outline hover:bg-black/25 "
            class:bg-slate-400="{j == currentBar}">
            {group}
         </p>
      {/each}
   </div>
</div>

<!-- <div id="TABS SECTION" class=" top-[1400px] h-96 bg-blue-500">
   <div class="whitespace-nowrap">
      <p
         class=" absolute top-0 bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-7xl font-extrabold text-transparent"
         style="left: {linear({ iStart: 600, iEnd: 1000, oStart: 500, oEnd: 0, i: scrollPosition })}px;">
         Don't Guess
      </p>
      <h1
         class=" absolute top-[75px] bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text  text-7xl font-extrabold text-transparent"
         style="left: {linear({ iStart: 600, iEnd: 1000, oStart: -500, oEnd: 0, i: scrollPosition })}px;">
         The Rhythm
      </h1>
      <h1
         class=" absolute bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text text-7xl font-extrabold text-transparent"
         style="
         top: {linear({ iStart: 1000, iEnd: 1100, oStart: -500, oEnd: 150, i: scrollPosition })}px;
         opacity: {linear({
            iStart: 1000,
            iEnd: 1100,
            oStart: 0,
            oEnd: 1,
            i: scrollPosition,
         })};">
         Hear It.
      </h1>
   </div>

   <div class="absolute top-[250px]  w-96 text-xl">
      <p>
         Bop Tabs never displays static tabs. Listen to all your dynamic, <span
            class="  bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text font-bold text-transparent">interactive</span> tablatures to get a sense of
         the rhythm
      </p>
   </div>

   <div class="absolute right-[100px] w-96">
      <Flat xml="{homePageMusicXml}" style="height:500px" />
   </div>
</div> -->

<div class="absolute top-[3000px] right-[100px] w-full">test</div>

<!-- <div class="flex flex-row pt-48 ">
   <div class="mr-auto flex flex-col">
      <h1 class="  bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text  text-7xl font-extrabold text-transparent">AI Generated</h1>
      <h1 class=" bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-7xl font-extrabold text-transparent">Chords</h1>
   </div>
</div> -->
<style>
</style>
