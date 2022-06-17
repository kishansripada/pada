<script>
import { caroselData } from "../home.js";
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import Typewriter from "svelte-typewriter";
import exampleTab from "../static/exampleTab.png";
import exampleTab1 from "../static/exampleTab1.png";
let scrollPosition = 0;
$: console.log(scrollPosition);
</script>

<svelte:window bind:scrollY="{scrollPosition}" />

<!-- COLOR SPLOTCHES -->
<div class="static" transition:fade>
   <div
      class="absolute  top-[-200px] right-[-300px] -z-40 h-[700px] w-[1000px]"
      style="background:radial-gradient(circle at 50% 50%, rgba(227,28,121, 0.15) 0%, rgba(255, 255, 255, 0) 60%);
">
   </div>
   <div
      class="absolute top-[600px] left-[-500px] -z-40 h-[700px] w-[1000px]"
      style="background:radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.15) 0%, rgba(255, 255, 255, 0) 60%);
">
   </div>
   <div
      class="absolute top-[-200px] left-[-400px] -z-40 h-[700px] w-[1000px] "
      style="background:radial-gradient(circle at 50% 50%, rgba(0, 145, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%);
">
   </div>

   <div>
      <img
         class=" absolute  top-[600px] -z-50 h-[200px] select-none	"
         style="transform: rotate({scrollPosition / 24 - 20}deg); right: {75 + scrollPosition / 10}px; opacity: {0.85 - scrollPosition / 700}"
         src="{exampleTab}"
         alt="" />
   </div>
   <div>
      <img
         class=" absolute top-[375px] -z-50 h-[200px] rotate-[-20deg] select-none"
         style="transform: rotate({scrollPosition / 24 - 20}deg); right: {75 + scrollPosition / 10}px; opacity: {0.85 - scrollPosition / 700}"
         src="{exampleTab1}"
         alt="" />
   </div>
</div>
<!--  -->

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

<div class="absolute top-[1400px] right-[100px] flex flex-row">
   <div class="ml-auto flex flex-col">
      <h1 class="  bg-gradient-to-r from-green-400 to-black bg-clip-text  text-7xl font-extrabold text-transparent">Synced With</h1>
      <h1 class=" bg-gradient-to-r from-green-400 to-black bg-clip-text text-7xl font-extrabold text-transparent">Spotify</h1>
   </div>
</div>

<!-- <div class="flex flex-row pt-48 ">
   <div class="mr-auto flex flex-col">
      <h1 class="  bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text  text-7xl font-extrabold text-transparent">AI Generated</h1>
      <h1 class=" bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-7xl font-extrabold text-transparent">Chords</h1>
   </div>
</div> -->
<style>
</style>
