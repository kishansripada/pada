<script>
import { loggedIn, isSearching, user } from "../store.js";
import newLogo from "../static/newLogo.svg";
import { toast } from "@zerodevx/svelte-toast";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import Search from "../lib/Search.svelte";
import { shortcut } from "../shortcut.js";

import { supabase } from "../supabase.js";
const logout = async () => {
   user.set(false);
   const { error } = await supabase.auth.signOut();
   toast.push("Logged out", {
      theme: {
         "--toastBackground": "#006400",
         "--toastBarBackground": "#006400",
         "--toastBorderRadius": "1rem",
      },
   });
   if (error) console.log(error);
};
</script>

<div class=" flex h-[70px] flex-row  items-center  whitespace-nowrap  bg-white/95 px-[13%] text-[#666666] backdrop-blur-[2px]">
   <a class="shrink-0 " href="/"> <img class="relative  w-[110px] " src="{newLogo}" alt="" /></a>

   <div class="ml-5 mr-5 flex flex-row  items-center">
      <a href="/discover" class="px-3 transition duration-300 ease-in-out hover:-translate-y-1">discover</a>
      <a sveltekit:prefetch href="/track/5LHHKZOwV8XW4LJP2C64mw/tabs" class="px-3  transition duration-300 ease-in-out hover:-translate-y-1"
         >about
      </a>

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

   <div class="flex flex-row items-center ">
      {#if $user}
         <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/myprofile/profilesettings">my profile 👤</a>
         <button class="ml-1 font-light transition duration-300 ease-in-out hover:-translate-y-1" on:click="{logout}">logout ✌🏼</button>
      {:else}
         <a class="px-4 transition duration-300 ease-in-out hover:-translate-y-1" href="/login?referrer={$page.url.href}"
            >log in <span class="text-xl spinning">👋</span></a>
         <a
            href="/signup"
            class=" text-md rounded-full bg-purple-500 px-4 py-1 text-white transition duration-300 ease-in-out hover:bg-black hover:text-white">
            sign up
         </a>
      {/if}
   </div>
</div>
<hr />

<style>
.spinning {
   animation: spin 3s ease 0s infinite normal none;
}
@keyframes spin {
   from {
      transform: rotate(0);
   }

   to {
      transform: rotate(360deg);
   }
}
</style>
