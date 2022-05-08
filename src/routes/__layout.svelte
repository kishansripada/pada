<script>
   import "../app.css";
   import { browser } from "$app/env";
   import { isPremium } from "../store.js";

   import LogIn from "$lib/LogIn.svelte";
   import Nav from "$lib/Nav.svelte";
   import WebPlayback from "$lib/WebPlayback.svelte";
   // let access_token = getToken().then((tokenObject) => token.set(tokenObject.access_token));
</script>

<Nav />
<main>
   <slot class="container" />
</main>
{#if $isPremium && browser}
   <WebPlayback />
{/if}

{#if browser}
   <LogIn />
{/if}

<style>
</style>
