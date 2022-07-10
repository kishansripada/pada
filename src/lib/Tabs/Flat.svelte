<script>
import { browser } from "$app/env";

export let xml;
export let style;
let container;
let embed;

function loadFlat() {
   embed = new Flat.Embed(container, {
      embedParams: {
         appId: "5fe56705315dc443c12fb489",
         controlsPosition: "bottom",
      },
   });
}

$: if (embed && browser) {
   embed.loadMusicXML(xml);
}
</script>

<svelte:head>
   <script src="https://prod.flat-cdn.com/embed-js/v1.4.1/embed.min.js" on:load="{loadFlat}"></script>
</svelte:head>

<div class="z-[-50]">
   {#if browser}
      <div style="{style}" bind:this="{container}"></div>
   {/if}
</div>
