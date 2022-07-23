<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium, isSearching, user } from "../store.js";
import { SvelteToast } from "@zerodevx/svelte-toast";
import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/WebPlayback.svelte";
import Footer from "../lib/Footer.svelte";
import Search from "../lib/Search.svelte";
import { supabase } from "../supabase.js";
import favicon from "../static/favicon.png";
user.set(supabase.auth.user());

supabase.auth.onAuthStateChange((_, session) => {
   user.set(session.user);
});
</script>

<div class="relative" style="overflow: hidden; overflow:clip;">
   <div class="sticky">
      <Nav />
   </div>

   <div class="flex flex-col font-inter">
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

      <div class="mb-24">
         <slot />
      </div>

      <!-- 
      <Footer /> -->
   </div>
</div>

<svelte:head>
   <link rel="icon" type="image/svg" href="{favicon}" />
</svelte:head>

<style>
</style>
