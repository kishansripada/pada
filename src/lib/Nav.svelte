<script>
import { loggedIn, isSearching, user } from "../store.js";
import searchIcon from "../static/search.svg";
import logo from "../static/logo.svg";
import Search from "../lib/Search.svelte";
import Cookies from "js-cookie";
import { toast } from "@zerodevx/svelte-toast";
import { goto } from "$app/navigation";
import { signOut, getAuth } from "firebase/auth";

const logout = () => {
   signOut(getAuth()).then(() => {
      toast.push("Logged out", {
         theme: {
            "--toastBackground": "#006400",
            "--toastBarBackground": "#006400",
            "--toastBorderRadius": "1rem",
         },
      });
   });
   goto("/");
};
</script>

{#if $isSearching}
   <Search />
{:else}
   <div class="flex h-24 flex-row items-center px-[6%] whitespace-nowrap">
      <a class="text-[#091834] shrink-0 " href="/"> <img class="w-40 " src="{logo}" alt="" /></a>

      <div class="flex flex-row items-center ml-10  text-xl ">
         <a href="/" class=" text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1 ">home</a>

         <a href="/track/7gVwgc8b3XnO87TpmXXFA5/tabs" class="px-7 text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1"
            >discover</a>
         <a href="/track/7DnAm9FOTWE3cUvso43HhI/tabs" class=" text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1">about </a>

         {#if $loggedIn}
            <a
               href="/mylibrary"
               class=" px-7 py-1  text-xl transition duration-300 ease-in-out hover:-translate-y-1  bg-gradient-to-l bg-clip-text font-bold text-transparent from-green-400 to-black rounded-xl"
               >my library</a>
         {/if}
      </div>

      <div class="outline outline-black rounded-xl flex flex-row ml-auto w-96 min-w-[40px] mr-4 ">
         <img class="w-6 fill-white text-[#091834] ml-2 shrink-0" src="{searchIcon}" alt="" />
         <input style="" class="h-10 focus:outline-none pl-3 w-full bg-transparent " placeholder="Search for a track..." type="text" />
      </div>

      <div class="flex flex-row items-center">
         <!-- <button on:click="{() => isSearching.set(true)}">
               <img class="w-6 fill-white text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1" src="{searchIcon}" alt="" />
            </button> -->

         {#if $user}
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
{/if}
