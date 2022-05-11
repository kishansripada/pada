<script>
import { loggedIn } from "../store.js";
import searchIcon from "../static/search.svg";

import logo from "../static/logo.svg";
</script>

<div></div>
<div class="sticky top-0 z-50  rounded-b px-10">
   <div class="flex h-24 flex-row items-center justify-between pt-2">
      <div class="flex flex-row">
         <a href="/" class="px-2 transition duration-300 ease-in-out hover:-translate-y-1">Home</a>

         <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 transition duration-300 ease-in-out hover:-translate-y-1">Discover</a>
         <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 transition duration-300 ease-in-out hover:-translate-y-1">About</a>

         <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 " aria-current="page">Diva</a>

         <a href="/track/7DnAm9FOTWE3cUvso43HhI" class="px-2" aria-current="page">Psyco</a>

         {#if $loggedIn}
            <a href="/mylibrary" class="px-2">My Library</a>
         {/if}
      </div>

      <a class="absolute left-1/2 -translate-x-1/2 transform" href="/"> <img class="w-24" src="{logo}" alt="" /></a>

      <button><img class="w-6 transition duration-300 ease-in-out hover:-translate-y-1 " src="{searchIcon}" alt="" /></button>
   </div>
</div>
