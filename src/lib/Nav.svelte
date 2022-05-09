<script>
   import { loggedIn } from "../store.js";
   import searchIcon from "../static/search.svg";

   import logo from "../static/logo.svg";
</script>

<div class="sticky top-0 z-50 bg-white rounded-b">
   <div class="flex flex-row justify-between items-center h-24 pt-2">
      <div class="flex flex-row">
         <a href="/" class="transition ease-in-out hover:-translate-y-1 duration-300 px-2">Home</a>

         <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="transition ease-in-out hover:-translate-y-1 duration-300 px-2">Discover</a>
         <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="transition ease-in-out hover:-translate-y-1 duration-300 px-2">About</a>

         <a href="/track/7gVwgc8b3XnO87TpmXXFA5" class="px-2 " aria-current="page">Diva</a>

         <a href="/track/7DnAm9FOTWE3cUvso43HhI" class="px-2" aria-current="page">Psyco</a>

         {#if $loggedIn}
            <a href="/mylibrary" class="px-2">My Library</a>
         {/if}
      </div>

      <a class="absolute left-1/2 transform -translate-x-1/2" href="/"> <img class="w-24" src={logo} alt="" /></a>

      <button><img class="w-6 transition ease-in-out hover:-translate-y-1 duration-300 " src={searchIcon} alt="" /></button>
   </div>
</div>
