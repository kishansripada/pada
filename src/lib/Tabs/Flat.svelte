<script>
import { version, tabsOrChords } from "../../store";
import { onMount } from "svelte";
import { browser } from "$app/env";

export let tabs;

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
   embed.loadMusicXML(tabs[$version.tabs].musicXml);
}
</script>

<svelte:head>
   <script src="https://prod.flat-cdn.com/embed-js/v1.4.1/embed.min.js" on:load="{loadFlat}"></script>
</svelte:head>

<div>
   {#if browser}
      <div bind:this="{container}" style="height: 500px"></div>
   {/if}
</div>
