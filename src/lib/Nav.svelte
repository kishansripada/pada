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

<div class=" flex  h-[70px]  flex-row items-center whitespace-nowrap bg-white/95 px-[13%] text-[#666666] backdrop-blur-[2px]">
   <a class=" shrink-0" href="/">
      <svg
         class="w-[110px] transition duration-500 ease-in-out hover:scale-110 hover:fill-purple-500"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 117.35 58.26"
         ><g id="Layer_2" data-name="Layer 2"
            ><g id="Layer_1-2" data-name="Layer 1"
               ><path
                  d="M25.65,18.83h-.07a12.86,12.86,0,0,0-5.27-1.06c-8.07,0-15.07,4.77-15.07,13.76V45.74a6.3,6.3,0,1,0,7.3,7.08h.09V32.19a8,8,0,0,1-.1-1.31c0-4.4,2.8-7.06,6.5-7.06s6.48,2.66,6.48,7.06S22.73,37.93,19,37.93a6.37,6.37,0,0,1-4.2-1.48v6.24A10.85,10.85,0,0,0,20.31,44C27.46,44,33,38.89,33,30.88,33,25,30.05,20.71,25.65,18.83Z"
               ></path
               ><path
                  d="M46.11,17.76a19.66,19.66,0,0,0-11,3.07L37.78,26a12.22,12.22,0,0,1,7.34-2.37c4,0,5.88,1.84,5.88,5H45.12c-7.78,0-10.95,3.12-10.95,7.63S37.73,44,43.69,44c3.75,0,6.4-1.22,7.78-3.54v3.17h6.92V29.08C58.39,21.37,53.89,17.76,46.11,17.76ZM51,35.58A5.46,5.46,0,0,1,45.54,39c-2.6,0-4.17-1.22-4.17-3.09,0-1.7,1.09-3,4.56-3H51Z"
               ></path
               ><path
                  d="M105.07,17.76a19.6,19.6,0,0,0-11,3.07L96.74,26a12.24,12.24,0,0,1,7.34-2.37c4,0,5.88,1.84,5.88,5h-5.88c-7.77,0-11,3.12-11,7.63S96.69,44,102.66,44c3.74,0,6.4-1.22,7.77-3.54v3.17h6.92V29.08C117.35,21.37,112.85,17.76,105.07,17.76ZM110,35.58A5.46,5.46,0,0,1,104.5,39c-2.6,0-4.16-1.22-4.16-3.09,0-1.7,1.09-3,4.55-3H110Z"
               ></path
               ><path
                  d="M79.67,1.71h2.59V3.16H79.67V4.87h2.6V6.55H79.67V8.26h2.61v.21h0V20.83a9.81,9.81,0,0,0-7.64-3.07c-7.21,0-12.75,5.12-12.75,13.13S67.41,44,74.62,44c3.41,0,6.11-1.09,8-3.31v2.94h7.07V8.47h0V8.26h2.72V6.55H89.63V4.87h2.73V3.16H89.61V1.71h2.74V0H79.67ZM75.91,38c-3.71,0-6.55-2.65-6.55-7.06s2.84-7.07,6.55-7.07c3.41,0,6.13,2.34,6.45,6.27v1.34C82.15,35.52,79.41,38,75.91,38Z"
               ></path
               ></g
            ></g
         ></svg>
   </a>

   <div class="ml-5 mr-5 flex flex-row  items-center">
      <a href="/discover" class="px-3 transition duration-300 ease-in-out hover:-translate-y-1">discover</a>

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
