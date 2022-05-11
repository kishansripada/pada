<script>
import "../app.css";
import { browser } from "$app/env";
import { isPremium, trackDetails } from "../store.js";

import LogIn from "$lib/LogIn.svelte";
import Nav from "$lib/Nav.svelte";
import WebPlayback from "$lib/WebPlayback.svelte";

// const getAverageColor = async () => {
//    const fac = new FastAverageColor();
//    if (!$trackDetails) return;
//    let test = await $trackDetails.then((trackDetails) => trackDetails);
//    let color = fac
//       .getColorAsync(test.album.images[0].url)
//       .then((color) => {
//          return color;
//       })
//       .catch((e) => {
//          console.log(e);
//       });
//    return color;
// };
// $: color = getAverageColor();
// let access_token = getToken().then((tokenObject) => token.set(tokenObject.access_token));
</script>

<Nav />
<main class="container ">
   <slot />
</main>

<!-- <div class="fixed top-0 -z-50 h-full w-full" style="background: linear-gradient(#e66465, #e66465);"></div> -->

<!-- <svelte:head>
   <script src="https://unpkg.com/fast-average-color/dist/index.min.js" on:load="{getAverageColor}"></script>
</svelte:head> -->

{#if $isPremium && browser}
   <WebPlayback />
{/if}

{#if browser}
   <LogIn />
{/if}

<style>
</style>
