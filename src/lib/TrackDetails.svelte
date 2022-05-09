<script>
   import { trackDetails, isWritingChords } from "../store";
   $: console.log($isWritingChords);
</script>

{#if $trackDetails}
   {#await $trackDetails then trackDetails}
      <div class="shadow-2xl rounded-[20px] h-64 bg-white flex flex-row">
         <img class="w-64 rounded-[20px]" src={trackDetails.album.images[0].url} alt="" />

         <div class="flex flex-col pl-7 pt-3">
            <p class="text-4xl pb-2">{trackDetails.name}</p>
            <p class="">{trackDetails.album.name}</p>

            <div class="flex flex-row flex-nowrap mt-auto mb-3">
               {#each trackDetails.artists as artist}
                  <div class="flex flex-col items-center pr-6">
                     <img class="w-24 h-24 rounded" src={artist.images?.[0]?.url} alt="" />
                     <p class="pt-1">{artist.name}</p>
                  </div>
               {/each}
            </div>
         </div>

         <div class="flex flex-col ml-auto pr-3 py-3">
            <button class="bg-blue-400 rounded-full py-1 px-3 mt-auto" on:click={() => isWritingChords.update((state) => !state)}
               >{$isWritingChords ? "Cancel 🚫" : "Write Chords ✍"}</button
            >
         </div>
      </div>
   {:catch error}
      <p style="color: red">No Track Details</p>
   {/await}
{/if}
