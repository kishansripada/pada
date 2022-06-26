<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium, user } from "../store.js";
import { SvelteToast } from "@zerodevx/svelte-toast";
import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/WebPlayback.svelte";
import Footer from "../lib/Footer.svelte";
import Firebase from "../fb.js";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (userAuth) => {
   if (userAuth) {
      console.log(userAuth);
      user.set(userAuth);
   } else {
      user.set(null);
   }
});
</script>

<div class="font-inter">
   <SvelteToast />
   <div class="sticky top-0 z-40">
      <Nav />
   </div>

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

   <div class="pt-10">
      <Footer />
   </div>
</div>

<style>
</style>
