<script>
   import { mongoTrack, version } from "../../store";
   // import { onMount } from "svelte";

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

   $: if (embed) {
      $mongoTrack.then((mongoTrack) => {
         embed.loadMusicXML(mongoTrack.tabs[$version.tabs].musicXml);
      });
   }
</script>

<svelte:head>
   <script src="https://prod.flat-cdn.com/embed-js/v1.4.1/embed.min.js" on:load={loadFlat}></script>
</svelte:head>

<div>
   <div bind:this={container} class="" style="height: 500px" />
</div>
