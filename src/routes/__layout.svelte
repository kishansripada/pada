<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium, isSearching, faunaSession, user } from "../store.js";
import { SvelteToast } from "@zerodevx/svelte-toast";
import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/WebPlayback.svelte";
import Footer from "../lib/Footer.svelte";
import Search from "../lib/Search.svelte";
import { supabase } from "../supabase.js";

user.set(supabase.auth.user());

supabase.auth.onAuthStateChange((_, session) => {
   user.set(session.user);
});
</script>

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
         <!-- <main class="container ">
         </main> -->
         <slot />
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
