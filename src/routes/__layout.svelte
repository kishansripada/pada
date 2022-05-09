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
<main class="container">
   <slot />
</main>

<!-- <div class="blur-lg fixed top-0 w-full -z-50 opacity-50">
   <img class="w-full" src="https://i.scdn.co/image/ab67616d0000b2731ae71e77aef7c34227027daa" alt="" />
</div> -->

{#if $isPremium && browser}
   <WebPlayback />
{/if}

{#if browser}
   <LogIn />
{/if}

<style>
</style>
