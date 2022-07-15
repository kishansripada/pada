<script>
import { browser } from "$app/env";
// import open from "../../opensheetmusicdisplay.min.js"
export let xml;
export let style;
let container;
let embed;

// function loadFlat() {
//    embed = new Flat.Embed(container, {
//       embedParams: {
//          appId: "5fe56705315dc443c12fb489",
//          controlsPosition: "bottom",
//       },
//    });
// }

// $: if (embed && browser) {
//    embed.loadMusicXML(xml);
// }
async function loadTabs() {
   var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container);
   osmd.setOptions({
      autoResize: true,
      backend: "svg",
      drawTitle: false,
      drawComposer: false,
   });
   osmd.load(xml).then(function () {
      osmd.render();
   });
}
</script>

<svelte:head>
   <!-- <script src="https://prod.flat-cdn.com/embed-js/v1.4.1/embed.min.js" on:load="{loadFlat}"></script> -->

   <script src="/src/opensheetmusicdisplay.min.js" on:load="{loadTabs}"></script>
</svelte:head>

<div class="z-[-50]">
   <!-- {#if browser} -->
   <div id="container" style="{style};" bind:this="{container}"></div>
   <!-- {/if} -->
</div>
