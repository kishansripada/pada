<script>
   import { trackDetails } from "../store";
</script>

{#if $trackDetails}
   {#await $trackDetails then trackDetails}
      <div class="shadow-xl rounded-[20px] h-64 bg-white flex flex-row">
         <img class="w-64 rounded-[20px]" src={trackDetails.album.images[0].url} alt="" />

         <div class="flex-col pl-7 pt-3 justify-between">
            <p class="text-4xl pb-2">{trackDetails.name}</p>
            <p class="pb-8">{trackDetails.album.name}</p>

            <div class="flex flex-row flex-nowrap">
               {#each trackDetails.artists as artist}
                  <div class="flex flex-col items-center pr-6">
                     <img class="w-24 h-24 rounded" src={artist.images?.[0]?.url} alt="" />
                     <p>{artist.name}</p>
                  </div>
               {/each}
            </div>
         </div>
      </div>
   {:catch error}
      <p style="color: red">No Track Details</p>
   {/await}
{/if}
