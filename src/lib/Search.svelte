<script>
export let isSearching;
import xIcon from "../static/x.svg";
import { slide } from "svelte/transition";
let mongoSearchResults = [];
let spotifySearchResults = [];

let token = fetch(`/api/spotify/gettoken`).then((r) => r.json());

const search = async (query) => {
   let access_token = (await token).token;
   if (!query.length) {
      let mongoSearchResults = [];
      let spotifySearchResults = [];
      return;
   }
   let mongoResults = fetch(`/api/search/${query}`).then((r) => r.json());

   // filter only songs that have approved chords or tabs
   mongoResults = mongoResults.filter((track) => {
        return (
          track.tabs.filter((tab) => tab.approved).length ||
          track.chords.filter((chords) => chords.approved).length
        );
      });

      

};
</script>

<div class="flex h-24 flex-row items-center" transition:slide>
   <div class="flex w-full flex-row rounded-xl outline outline-white ">
      <input
         class="w-full  appearance-none bg-transparent py-3 px-5 text-3xl  text-white placeholder:text-white/50  focus:outline-none"
         placeholder="Search for tracks or artists..."
         type="text"
         on:keyup="{({ target: { value } }) => search(value)}" />
      <button on:click="{() => (isSearching = false)}">
         <img class="w-10 pr-3" src="{xIcon}" alt="" />
      </button>
   </div>
</div>
