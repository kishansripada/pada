<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium } from "../store.js";
import { SvelteToast } from "@zerodevx/svelte-toast";

import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/Chords/WebPlayback.svelte";
import Footer from "../lib/Footer.svelte";
</script>

<SvelteToast />
<Nav />
{#if $isPremium && browser}
   <WebPlayback />
{/if}

{#if browser}
   <LogIn />
{/if}

<div class="overflow-hidden">
   <main class="container ">
      <slot />
   </main>
</div>

<div class="pt-10">
   <Footer />
</div>

<style>
</style>
