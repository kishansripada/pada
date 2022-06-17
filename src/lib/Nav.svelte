<script>
import { loggedIn, isSearching, faunaSession } from "../store.js";
import searchIcon from "../static/search.svg";
import logo from "../static/logo.svg";
import Search from "../lib/Search.svelte";
import Cookies from "js-cookie";
import { goto } from "$app/navigation";

let user;
faunaSession.subscribe((val) => {
   user = val;
   const cookies = Cookies.get("fauna-session");
   if (!val && cookies) {
      user = JSON.parse(cookies);
      faunaSession.set(user);
   }
});
</script>

{#if $isSearching}
   <Search />
{:else}
   <div class="bg-white/0 px-10">
      <!-- transition:slide -->
      <div class="flex h-24 flex-row items-center justify-between">
         <div class="flex flex-row items-center">
            <a href="/" class="px-2 text-2xl text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1">home</a>

            <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-[#091834] text-2xl transition duration-300 ease-in-out hover:-translate-y-1"
               >discover</a>
            <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-[#091834] text-2xl transition duration-300 ease-in-out hover:-translate-y-1"
               >about
            </a>

            <!-- <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-[#091834]" aria-current="page">Diva</a> -->

            {#if $loggedIn}
               <a href="/mylibrary" class="px-2 text-[#091834]">my library 📚</a>
            {/if}
         </div>

         <a class="absolute left-1/2 -translate-x-1/2 transform text-[#091834]" href="/"> <img class="w-40" src="{logo}" alt="" /></a>

         <div class="ml-auto items-center">
            <button on:click="{() => isSearching.set(true)}">
               <img class="w-6 fill-white text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1" src="{searchIcon}" alt="" />
            </button>

            {#if user}
               <a href="/myprofile">My Profile</a>
               <button on:click="{() => Cookies.remove('fauna-session')}">Logout</button>
            {:else}
               <a href="/login">Login</a>
               <a href="/signup" class=""> Signup </a>
            {/if}
         </div>
      </div>
   </div>
{/if}
