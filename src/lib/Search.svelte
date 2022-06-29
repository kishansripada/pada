<script>
import xIcon from "../static/x.svg";
import { slide } from "svelte/transition";
import { isSearching } from "../store.js";
import { shortcut } from "../shortcut.js";
import { onMount } from "svelte";
import { search as spotifySearch } from "../spotify.js";
import algoliasearch from "algoliasearch";
let searchInput;
let query;
let spotifySearchResults;
onMount(() => searchInput.focus());

let token = fetch(`/api/spotify/gettoken`).then((r) => r.json());
const client = algoliasearch("1K06LV6AVV", "80e1726a9cd002b7e3669ce45f383101");
const index = client.initIndex("tracks");

let algoliaresults = index.search("", {
   attributesToRetrieve: ["path", "name", "artists"],
   hitsPerPage: 6,
});

const search = async () => {
   algoliaresults = await index.search(query, {
      attributesToRetrieve: ["path", "name", "artists"],
      hitsPerPage: 6,
   });
   spotifySearchResults = [];
   if (algoliaresults.hits.length < 6) {
      let access_token = (await token).token;
      let spotifyResults = await spotifySearch(query, ["track"], 6, access_token).then((r) => r.tracks.items);

      // remove songs from Spotify that are in mongo results
      spotifyResults = spotifyResults.filter((track) => {
         return !algoliaresults.hits.map((track) => track.path.split("/")[1]).includes(track.id);
      });

      spotifySearchResults = spotifyResults.slice(0, 6 - algoliaresults.hits.length);
      console.log({ spotifySearchResults });
   }
};

let timer;

const debounce = (query) => {
   clearTimeout(timer);
   timer = setTimeout(() => {
      search(query);
   }, 250);
};
</script>

<div
   on:click="{() => isSearching.set(false)}"
   use:shortcut="{{ code: 'Escape' }}"
   class="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-[2px]">
   <div class="flex h-[400px] w-[700px] flex-col rounded-xl bg-white" on:click|stopPropagation>
      <div class="flex flex-row rounded-xl px-4 py-2">
         <p class="text-3xl">🔍</p>
         <input
            on:keyup="{debounce}"
            bind:this="{searchInput}"
            bind:value="{query}"
            class="w-full pl-4 focus:outline-none"
            type="text"
            placeholder="search for a track" />
         <p class="ml-auto text-3xl">␛</p>
      </div>
      <hr />
      {#await algoliaresults then algoliaresults}
         {#each algoliaresults.hits as hit}
            <a href="/track/{hit.path.split('/')[1]}/tabs" class="h-full grow flex flex-row items-center hover:bg-gray-100">
               <p class="pl-5">{hit.name}</p>
               <p class="pl-2  text-xs">{hit.artists.join(", ")}</p>
            </a>
            <hr />
         {/each}
      {/await}
      {#if spotifySearchResults}
         {#await spotifySearchResults then spotifySearchResults}
            {#each spotifySearchResults as track}
               <a href="/track/{track.id}/tabs" class="h-full grow flex flex-row items-center hover:bg-gray-100 bg-red-200/20">
                  <p class="pl-5">{track.name}</p>
                  <p class="pl-2  text-xs">{track.artists.map((artist) => artist.name).join(", ")}</p>
               </a>
               <hr />
            {/each}
         {/await}
      {/if}
   </div>
</div>
