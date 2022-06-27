<script>
import xIcon from "../static/x.svg";
import { slide } from "svelte/transition";
import { isSearching } from "../store.js";

import { App, Credentials } from "realm-web";
const app = new App({ id: "boptabs-wwrqq" });
const credentials = Credentials.anonymous();
let user = app.logIn(credentials);
let token = fetch(`/api/spotify/gettoken`).then((r) => r.json());

let mongoSearchResults = [];
let spotifySearchResults = [];

$: if (!$isSearching) {
   mongoSearchResults = [];
   spotifySearchResults = [];
}

// everytime isSearching changes, check if its true, if it is then wait 50ms (so DOM element can load) then focus cursor on it
let inputField;
$: if ($isSearching) {
   if (inputField) {
      inputField.focus();
   }
}

const numTabsChords = (track) => {
   let numTabs = track.tabs.filter((tab) => tab.approved).length;
   let numChords = track.chords.filter((chords) => chords.approved).length;

   if (numTabs && numChords) {
      return `${numTabs} ${numTabs == 1 ? "tab" : "tabs"} & ${numChords} chords`;
   } else if (numTabs) {
      return `${numTabs} ${numTabs == 1 ? "tab" : "tabs"}`;
   } else {
      return `${numChords} chords`;
   }
};

const search = async (query) => {
   mongoSearchResults = [];
   spotifySearchResults = [];
   if (!query.length) {
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
      let access_token = (await token).token;
      let spotifyResults = await fetch(`/api/spotify/search/${query}?token=${access_token}`).then((r) => r.json());

      // remove songs from Spotify that are in mongo results
      spotifyResults = spotifyResults.filter((track) => {
         return !mongoResults.map((track) => track.spotifyId).includes(track.id);
      });

      spotifySearchResults = spotifyResults.slice(0, 4 - mongoResults.length);
      console.log({ spotifySearchResults });
   }
};

let timer;

const debounce = (query) => {
   clearTimeout(timer);
   timer = setTimeout(() => {
      search(query);
   }, 500);
};
</script>

<div class="bg-white/10 px-10">
   <div class="flex h-24 flex-row items-center">
      <div class="flex w-full flex-row rounded-xl outline  outline-[#091834] ">
         <input
            class="w-full  appearance-none bg-transparent py-3 px-5 text-3xl  text-[#091834] placeholder:text-[#091834]/50  focus:outline-none"
            placeholder="Search for tracks..."
            type="text"
            bind:this="{inputField}"
            on:keyup="{({ target: { value } }) => debounce(value)}" />
         <button on:click="{() => isSearching.set(false)}">
            <img class="w-10 pr-3" src="{xIcon}" alt="" />
         </button>
      </div>
   </div>
</div>

<div class="absolute w-full px-10  backdrop-blur-xl">
   <!-- MONGODB -->
   {#each mongoSearchResults as track}
      <a href="/track/{track.spotifyId}" on:click="{() => isSearching.set(false)}">
         <div class="my-3  flex h-24 cursor-pointer flex-row rounded-xl pt-3 text-[#091834] outline outline-[#091834] hover:bg-white/10">
            <div class="flex flex-col px-7">
               <p class="text-3xl">
                  {track.name}
               </p>
               <p class="text-md">
                  {track.primaryArtist}
               </p>
            </div>
            <div class="ml-auto mt-auto flex flex-col pr-3 pb-2">
               {numTabsChords(track)}
            </div>
         </div>
      </a>
   {/each}

   <!-- SPOTIFY -->
   {#each spotifySearchResults as track}
      <a href="/track/{track.id}" on:click="{() => isSearching.set(false)}">
         <div class="my-3  flex h-24 cursor-pointer flex-col rounded-xl pt-3 text-[#091834]/50 outline outline-white hover:bg-white/10">
            <div class="flex flex-col px-7">
               <p class="text-3xl">
                  {track.name}
               </p>
               <p class="text-md">
                  {track.artists.map((artist) => artist.name).join(", ")}
               </p>
            </div>
         </div>
      </a>
   {/each}
</div>
