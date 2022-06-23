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

const logout = () => {
   Cookies.remove("fauna-session");
   faunaSession.update(() => null);
   window.location.reload();
};
</script>

{#if $isSearching}
   <Search />
{:else}
   <div class="bg-white/100 px-10">
      <div class="flex h-24 flex-row items-center justify-between">
         <div class="flex flex-row items-center pl-16">
            <a href="/" class="px-2  text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1 text-lg">home</a>

            <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-[#091834] text-lg transition duration-300 ease-in-out hover:-translate-y-1"
               >discover</a>
            <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 text-[#091834] text-lg transition duration-300 ease-in-out hover:-translate-y-1"
               >about
            </a>

            {#if $loggedIn}
               <a href="/mylibrary" class="px-2 text-[#091834] text-lg transition duration-300 ease-in-out hover:-translate-y-1">my library</a>
            {/if}
         </div>

         <a class="absolute left-1/2 -translate-x-1/2 transform text-[#091834]" href="/"> <img class="w-40" src="{logo}" alt="" /></a>

         <div class="ml-auto flex flex-row items-center mr-16">
            <button on:click="{() => isSearching.set(true)}">
               <img class="w-6 fill-white text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1" src="{searchIcon}" alt="" />
            </button>

            {#if user}
               <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/myprofile">my profile</a>
               <button class="transition duration-300 ease-in-out hover:-translate-y-1" on:click="{logout}">logout</button>
            {:else}
               <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/login">log in</a>
               <a
                  href="/signup"
                  class="transition duration-300 ease-in-out outline outline-[#091834] p-2 rounded-md hover:bg-[#091834] hover:text-white">
                  sign up
               </a>
            {/if}
         </div>
      </div>
   </div>
{/if}
