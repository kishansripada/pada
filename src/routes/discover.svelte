<script>
import { getPlaylist } from "../spotify.js";
import { browser } from "$app/env";
import TrackDetails from "../lib/TrackDetails.svelte";

let top50;
$: if (browser) {
   top50 = fetch(`/api/spotify/gettoken`)
      .then((r) => r.json())
      .then((token) => getPlaylist("37i9dQZEVXbLRQDuF5jeBp", token.token));
}
</script>

<div>
   {#if top50}
      {#await top50 then top50}
         {#each top50.tracks.items as track}
            <p>
               {track.track.name}
            </p>
         {/each}
      {/await}
   {/if}
</div>
