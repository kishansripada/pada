<script>
import xIcon from "../static/x.svg";
import { slide } from "svelte/transition";
import { isSearching } from "../store.js";

import { App, Credentials } from "realm-web";
const app = new App({ id: "boptabs-wwrqq" });
const credentials = Credentials.anonymous();
let user = app.logIn(credentials);

let mongoSearchResults = [];
let spotifySearchResults = [];

$: if (!$isSearching) {
   mongoSearchResults = [];
   spotifySearchResults = [];
}

// let token = fetch(`/api/spotify/gettoken`).then((r) => r.json());

const search = async (query) => {
   if (!query.length) {
      mongoSearchResults = [];
      spotifySearchResults = [];
      return;
   }

   user = await user;
   let mongoResults = await user.functions.search(query);

   // filter only songs that have approved chords or tabs
   mongoResults = mongoResults.filter((track) => {
      return track.tabs.filter((tab) => tab.approved).length || track.chords.filter((chords) => chords.approved).length;
   });

   mongoResults = mongoResults.filter((track) => {
      return track.tabs.filter((tab) => tab.approved).length || track.chords.filter((chords) => chords.approved).length;
   });
   mongoSearchResults = mongoResults;
   console.log({ mongoSearchResults });

   //////////SPOTIFY
   // if less than 4 mongo results, get from spotify
   if (mongoResults.length < 4) {
      let spotifyResults = await fetch(`/api/spotify/search/${query}`).then((r) => r.json());

      // remove songs from Spotify that are in mongo results
      spotifyResults = spotifyResults.filter((track) => {
         return !mongoResults.map((track) => track.spotifyId).includes(track.id);
      });

      spotifySearchResults = spotifyResults.slice(0, 4 - mongoResults.length);
      console.log({ spotifySearchResults });
   }

   // let access_token = (await token).token;
};
</script>

<div class="bg-white/10 px-10">
   <div class="flex h-24 flex-row items-center" transition:slide>
      <div class="flex w-full flex-row rounded-xl outline outline-white ">
         <input
            class="w-full  appearance-none bg-transparent py-3 px-5 text-3xl  text-white placeholder:text-white/50  focus:outline-none"
            placeholder="Search for tracks or artists..."
            type="text"
            on:keyup="{({ target: { value } }) => search(value)}" />
         <button on:click="{() => isSearching.set(false)}">
            <img class="w-10 pr-3" src="{xIcon}" alt="" />
         </button>
      </div>
   </div>
</div>

<div class="absolute w-full px-10 text-white backdrop-blur-xl">
   {#each mongoSearchResults as result}
      <a href="/track/{result.spotifyId}" on:click="{() => isSearching.set(false)}">
         <div class="my-3  h-24 cursor-pointer rounded pt-3 outline outline-white hover:bg-white/10 ">
            <div class="flex flex-col px-7">
               <p class="text-3xl">
                  {result.name}
               </p>
               <p class="text-md">
                  {result.primaryArtist}
               </p>
            </div>
         </div>
      </a>
   {/each}
</div>
