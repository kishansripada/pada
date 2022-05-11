<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium, trackDetails } from "../store.js";

import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/WebPlayback.svelte";
import Gradient from "$lib/Gradient.svelte";
</script>

<Nav />
<main class="container ">
   <slot />
</main>

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
{/if}

<style>
</style>
