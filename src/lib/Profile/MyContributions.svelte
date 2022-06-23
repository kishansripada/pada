<script>
export let contributions;
</script>

<ul class="">
   {#each contributions as tab}
      <div class="mb-3 h-24 rounded bg-blue-100">
         <p>{tab.track.name}</p>
         <p>{tab.track.artists.join(", ")}</p>
      </div>
   {/each}
</ul>
