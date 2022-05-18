<script>
import { loggedIn, isSearching } from "../store.js";
import searchIcon from "../static/search.svg";
import logo from "../static/logo.svg";
import { slide } from "svelte/transition";
import Search from "../lib/Search.svelte";
</script>

{#if $isSearching}
   <Search />
{:else}
   <div class="bg-white/10 px-10">
      <div class="flex h-24 flex-row items-center justify-between" transition:slide>
         <div class="flex flex-row items-center">
            <a href="/" class="px-2 text-2xl text-white transition duration-300 ease-in-out hover:-translate-y-1">home</a>

            <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-white transition duration-300 ease-in-out hover:-translate-y-1">discover 💡</a>
            <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-white transition duration-300 ease-in-out hover:-translate-y-1">about ℹ️</a>

            <!-- <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-white" aria-current="page">Diva</a> -->

            <a href="/track/7DnAm9FOTWE3cUvso43HhI" class="px-2 text-white" aria-current="page">psyco</a>
            {#if $loggedIn}
               <a href="/mylibrary" class="px-2 text-white">my library 📚</a>
            {/if}
         </div>

         <a class="absolute left-1/2 -translate-x-1/2 transform text-white" href="/"> <img class="w-40" src="{logo}" alt="" /></a>

         <button on:click="{() => isSearching.set(true)}"
            ><img class="w-6 fill-white text-white transition duration-300 ease-in-out hover:-translate-y-1" src="{searchIcon}" alt="" /></button>
      </div>
   </div>
{/if}
