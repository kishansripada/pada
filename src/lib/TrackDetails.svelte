<script>
   import { trackDetails } from "../store";
</script>

{#if $trackDetails}
   {#await $trackDetails}
      <p>...waiting</p>
   {:then trackDetails}
      <p>{JSON.stringify(trackDetails)}</p>
   {:catch error}
      <p style="color: red">No Track Details</p>
   {/await}
{/if}
