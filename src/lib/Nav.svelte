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
   <div class="flex h-20 flex-row items-center px-[13%] whitespace-nowrap text-[#666666] font-light ">
      <a class=" shrink-0 " href="/"> <img class="w-40 " src="{logo}" alt="" /></a>

      <div class="flex flex-row items-center ml-5  mr-5">
         <a href="/track/7gVwgc8b3XnO87TpmXXFA5/tabs" class="px-3 transition duration-300 ease-in-out hover:-translate-y-1">discover</a>
         <a href="/track/5LHHKZOwV8XW4LJP2C64mw/tabs" class="px-3  transition duration-300 ease-in-out hover:-translate-y-1">about </a>

         {#if $loggedIn}
            <a href="/mylibrary" class="  duration-300 ease-in-out hover:-translate-y-1  px-3">my library</a>
         {/if}
      </div>

      <div class="outline outline-black rounded-xl flex flex-row ml-auto w-96 min-w-[40px] mr-1 items-center">
         <p class="text-[25px] pl-2">🔍</p>
         <input style="" class="h-10 focus:outline-none pl-3 w-full bg-transparent " placeholder="search for a track..." type="text" />
      </div>

      <div class="flex flex-row items-center">
         <!-- <button on:click="{() => isSearching.set(true)}">
               <img class="w-6 fill-white text-[#091834] transition duration-300 ease-in-out hover:-translate-y-1" src="{searchIcon}" alt="" />
            </button> -->

         {#if $user}
            <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/myprofile">my profile 👤</a>
            <button class="transition duration-300 ease-in-out hover:-translate-y-1 ml-1" on:click="{logout}">logout ⬅️</button>
         {:else}
            <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/login">log in <span class="text-xl">👋</span></a>
            <a
               href="/signup"
               class="transition duration-300 ease-in-out outline outline-[#091834] py-2 px-3 ml-1 rounded-md hover:text-gray-500 text-white bg-black hover:bg-white">
               sign up
            </a>
         {/if}
      </div>
   </div>
{/if}
