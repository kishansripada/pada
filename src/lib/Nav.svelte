<script>
import { loggedIn, isSearching, faunaSession } from "../store.js";
import logo from "../static/logo.svg";
import { toast } from "@zerodevx/svelte-toast";
import { goto } from "$app/navigation";
import Search from "../lib/Search.svelte";
import { shortcut } from "../shortcut.js";
import Cookies from "js-cookie";

const logout = () => {
   Cookies.remove("fauna-session");
   faunaSession.set(null);
   toast.push("Logged out", {
      theme: {
         "--toastBackground": "#006400",
         "--toastBarBackground": "#006400",
         "--toastBorderRadius": "1rem",
      },
   });
};
</script>

<div class=" flex h-20 flex-row items-center  whitespace-nowrap px-[13%]    text-[#666666]">
   <a class=" shrink-0 " href="/"> <img class="w-40 " src="{logo}" alt="" /></a>

   <div class="ml-5 mr-5 flex flex-row  items-center">
      <a href="/track/7gVwgc8b3XnO87TpmXXFA5/tabs" class="px-3 transition duration-300 ease-in-out hover:-translate-y-1">discover</a>
      <a href="/track/5LHHKZOwV8XW4LJP2C64mw/tabs" class="px-3  transition duration-300 ease-in-out hover:-translate-y-1">about </a>

      {#if $loggedIn}
         <a href="/mylibrary" class="  px-3 duration-300 ease-in-out  hover:-translate-y-1">my library</a>
      {/if}
   </div>

   <button
      on:click="{() => isSearching.set(true)}"
      use:shortcut="{{ control: true, code: 'KeyK' }}"
      class=" ml-auto mr-1 flex w-96  min-w-[40px]  flex-row items-center overflow-hidden rounded-xl py-[1px] pl-2 pr-3 ring-2 ring-black">
      <p class=" pr-3 text-[25px]">🔍</p>
      <p class=" opacity-75">search for a track...</p>
      <p class="ml-auto opacity-75">⌘k</p>
   </button>

   <div class="flex flex-row items-center">
      {#if $faunaSession}
         <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/myprofile/profilesettings">my profile 👤</a>
         <button class="ml-1 font-light transition duration-300 ease-in-out hover:-translate-y-1" on:click="{logout}">logout ✌🏼</button>
      {:else}
         <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/login">log in <span class="text-xl">👋</span></a>
         <a
            href="/signup"
            class="transition duration-300 ease-in-out ring-2 ring-black py-2 px-3 ml-1 rounded-md hover:text-gray-500 text-white bg-black hover:bg-white">
            sign up
         </a>
      {/if}
   </div>
</div>
