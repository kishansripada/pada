<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium, isSearching, faunaSession } from "../store.js";
import { SvelteToast } from "@zerodevx/svelte-toast";
import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/WebPlayback.svelte";
import Footer from "../lib/Footer.svelte";
import Search from "../lib/Search.svelte";
import Cookies from "js-cookie";
$: if (browser) {
   faunaSession.set(JSON.parse(Cookies.get("fauna-session") || null) || null);
}
</script>

<!-- <div class="fixed bottom-[10px] left-0 w-full overflow-hidden whitespace-nowrap text-xl">
   Without Me (with Juice WRLD) — Blueberry Faygo — Kiss Me More (feat. SZA) — Murder On My Mind — Emotionally Scarred — ROCKSTAR (feat. Roddy Ricch)
</div> -->

<div class="flex h-screen flex-col font-inter">
   <div class="sticky top-0 z-40">
      <Nav />
   </div>

   <div class="flex-grow">
      {#if $isSearching}
         <Search />
      {/if}

      <SvelteToast />

      {#if $isPremium && browser}
         <WebPlayback />
      {/if}

      {#if browser}
         <LogIn />
      {/if}

      <div class="overflow-hidden ">
         <main class="container ">
            <slot />
         </main>
      </div>
   </div>

   <div class="">
      <Footer />
   </div>
</div>

<style>
::selection {
   background: #c228d3;
}
</style>
