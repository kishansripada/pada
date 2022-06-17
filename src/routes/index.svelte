<script>
import { caroselData } from "../home.js";
import { onMount } from "svelte";
import { fade } from "svelte/transition";
import Typewriter from "svelte-typewriter";
</script>

<!-- 
<div id="container">
   <div class="photobanner flex flex-row">
      {#each caroselData as track}
         <a class="" href="{`/track/${track.track.id}`}">
            <div class="relative mx-2 h-32 w-32 overflow-hidden ">
               <img class="h-32 rounded-xl" src="{track.track.album.images[0].url}" alt="" />
               <div
                  class=" text-md absolute inset-x-0 bottom-0 flex h-32 w-full flex-col rounded-xl bg-black/30 py-2.5 px-3 text-center  text-white backdrop-blur-sm hover:bg-black/10 ">
                  {track.name}
                  <p class="mt-auto text-xs">{track.primaryArtist}</p>
               </div>
            </div>
         </a>
      {/each}
      {#each caroselData.slice(0, 4) as track}
         <a href="{`/track/${track.track.id}`}">
            <div class="relative h-32 w-32 overflow-hidden ">
               <img class="h-32 rounded-xl" src="{track.track.album.images[0].url}" alt="" />
               <div
                  class=" text-md absolute inset-x-0 bottom-0 flex h-32 w-full flex-col rounded-xl bg-black/30 py-2.5 px-3 text-center  text-white  backdrop-blur-sm hover:bg-black/10">
                  {track.name}
                  <p class="mt-auto text-xs">{track.primaryArtist}</p>
               </div>
            </div>
         </a>
      {/each}
   </div>
</div> -->
<!-- COLOR SPLOTCHES -->
<div transition:fade class="">
   <div
      class="absolute top-[-200px] right-[-600px] -z-50 h-[700px] w-[1000px] bg-black"
      style="background:radial-gradient(circle at 50% 50%, rgba(227,28,121, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
">
   </div>
   <div
      class="absolute top-[300px] left-[-600px] -z-50 h-[700px] w-[1000px]  bg-black "
      style="background:radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
">
   </div>
   <div
      class="absolute top-[640px] right-[-600px] -z-50 h-[700px] w-[1000px]  bg-black "
      style="background:radial-gradient(circle at 50% 50%, rgba(0, 145, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
">
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

<div class="absolute top-[500px] right-[50px] flex flex-row">
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
