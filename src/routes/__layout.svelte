<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium, trackDetails } from "../store.js";

import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/Chords/WebPlayback.svelte";
import Gradient from "$lib/Gradient.svelte";
import Footer from "../lib/Footer.svelte";
</script>

<Nav />
{#if $isPremium && browser}
   <WebPlayback />
{/if}

{#if browser}
   <LogIn />
{/if}

{#if $trackDetails}
   {#await $trackDetails then trackDetails}
      <Gradient albumUrl="{trackDetails.album.images[0].url}" />
   {/await}
{:else}
   <div class="fixed top-0 -z-40 h-full w-full body bg-black/50"></div>
{/if}

<main class="container ">
   <slot />
</main>

<div class="pt-10">
   <Footer />
</div>

<style>
</style>
