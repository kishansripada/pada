<script>
   import { mongoTrack, version, spotifyPosition, getGroups } from "../../store";
   import { onMount } from "svelte";

   async function filterApprovedChords() {
      let chords = await $mongoTrack.then((mongoTrack) => mongoTrack.chords);
      return await chords.filter((chord) => chord.approved);
   }
   let data;
   $mongoTrack.then((mongoTrack) => {
      data = [
         ["", "", "", "", "", "", "", ""],
         ["", "", "", "", "", "", "", ""],
         ["", "", "", "", "", "", "", ""],
         ["", "", "", "", "", "", "", ""],
      ];
   });

   let gridElement;

   let gridStatus = {
      isScriptLoaded: false,
      isStyleLoaded: false,
      isMounted: false,
      isInited: false,
   };

   onMount(() => {
      gridStatus.isMounted = true;
      if (gridStatus.isScriptLoaded && gridStatus.isStyleLoaded) gridInit();
   });

   function scriptLoaded() {
      gridStatus.isScriptLoaded = true;
      if (gridStatus.isMounted && gridStatus.isStyleLoaded) gridInit();
   }

   function styleLoaded() {
      gridStatus.isStyleLoaded = true;
      if (gridStatus.isScriptLoaded && gridStatus.isMounted) gridInit();
   }

   function gridInit() {
      if (!gridStatus.isInited) {
         gridStatus.isInited = true;
         new Handsontable(gridElement, {
            data: data,
            rowHeaders: false,
            colHeaders: false,
            stretchH: "all",
            licenseKey: "non-commercial-and-evaluation", // for non-commercial use only
         });
      }
   }

   function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      td.style.fontWeight = "bold";
      td.style.color = "green";
      td.style.background = "#CEC";
   }
</script>

<svelte:head>
   <script src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js" on:load={scriptLoaded}></script>
   <link href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" rel="stylesheet" on:load={styleLoaded} />
</svelte:head>

<!-- 
{#await filterApprovedChords() then approvedChords}
   <div class="flex flex-row">
      {#each $getGroups(approvedChords[$version.chords].chords) as group, i}
         <div class="grid gap-2 grid-cols-4 basis-1/4 ">
            {#each group as group}
               <button>
                  <div class="bg-slate-200 rounded h-12 w-full hover:bg-orange-300 grid place-items-center text-xl">
                    
                  </div>
               </button>
            {/each}
         </div>
         {#if i !== 3}
            <div class="bg-slate-600 w-2 mx-2 rounded" />
         {/if}
      {/each}
   </div>
{/await} -->
<div class="" bind:this={gridElement} />
