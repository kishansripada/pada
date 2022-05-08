<script>
   import { trackDetails } from "../store";
</script>

{#if $trackDetails}
   {#await $trackDetails}
      <p>...waiting</p>
   {:then trackDetails}
      <div class="shadow-xl rounded-[20px] h-64 bg-white">
         <p>{trackDetails.name}</p>
         {#each trackDetails.artists as artist}
            <p>{artist.name}</p>
         {/each}
      </div>
   {:catch error}
      <p style="color: red">No Track Details</p>
   {/await}
{/if}
