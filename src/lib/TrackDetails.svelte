<script>
import { isWritingChords, tabsOrChords, user } from "../store";
import { page } from "$app/stores";
import { browser } from "$app/env";
import { goto } from "$app/navigation";

export let trackDetails;

const upload = () => {
   if (!browser) return;
   if ($page.url.pathname.split("/")[4] != "upload") {
      if (!$user) {
         goto("/login");
      } else {
         goto(`${window.location.href}/upload`);
      }
   } else {
      goto(`${window.location.href.split("/").slice(0, -1).join("/")}`);
   }
};

const formattedTime = () => {
   let time = trackDetails.features.duration_ms / 1000;
   var hrs = ~~(time / 3600);
   var mins = ~~((time % 3600) / 60);
   var secs = ~~time % 60;
   var ret = "";
   if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
   }
   ret += "" + mins + ":" + (secs < 10 ? "0" : "");
   ret += "" + secs;
   return ret;
};

const formattedKey = () => {
   let keys = {
      0: "C",
      1: "C#",
      2: "D",
      3: "D#",
      4: "E",
      5: "F",
      6: "F#",
      7: "G",
      8: "G#",
      9: "A",
      10: "A#",
      11: "B",
   };

   let mode = trackDetails.features.mode == 0 ? " Minor" : trackDetails.features.mode == 1 ? " Major" : "";

   return keys[trackDetails.features.key] + " " + mode;
};
</script>

<div class="flex h-64 flex-row rounded-[20px] bg-white/10 shadow-2xl">
   <img class=" w-64 rounded-[20px]" src="{trackDetails.album.images[0].url}" alt="" />

   <div class="flex flex-col pl-7 pt-3 text-[#091834] ">
      <p class=" pb-2 text-4xl ">{trackDetails.name.length > 40 ? trackDetails.name.substring(0, 40) + "..." : trackDetails.name}</p>
      <p class="">{trackDetails.album.name}</p>

      <div class="mt-auto mb-3 flex flex-nowrap">
         {#each trackDetails.artists as artist}
            <div class="flex w-32  flex-col items-center pr-6">
               <img class="h-24  w-24  rounded-[20px] shadow-2xl" src="{artist.images?.[0]?.url}" alt="" />
               <p class="pt-1">{artist.name}</p>
            </div>
         {/each}
      </div>
   </div>

   <div class="ml-auto flex flex-col py-3 pr-2 text-right text-[#091834]">
      <p class="text-xs text-[#091834]">⚡️ powered by Spotify</p>
      <p class="pt-2">{trackDetails.album.release_date}</p>
      <p class="pt-2">⏳ {formattedTime()}</p>
      <p class="pt-2">🎼 {formattedKey()}</p>
      <p class="pt-2">⏱ {Math.round(trackDetails.features.tempo)} bpm</p>
      <p class="pt-2">&#128293; {trackDetails.popularity}</p>

      {#if $tabsOrChords == "tabs" && browser}
         <button
            class="border-white-300 mt-auto rounded-xl border border-solid py-1 px-3 text-[#091834] transition duration-200 hover:bg-[#091834] hover:text-white"
            on:click="{upload}"
            >{$page.url.pathname.split("/")[4] == "upload" ? "cancel 🚫" : "upload tabs 🔼"}
         </button>
      {:else}
         <button
            class="border-white-300 mt-auto rounded-xl border border-solid py-1 px-3 text-[#091834] hover:bg-[#091834] hover:text-white transition duration-200"
            on:click="{() => isWritingChords.update((state) => !state)}"
            >{$page.url.pathname.split("/")[4] == "write" ? "cancel 🚫" : "write chords ✍️"}
         </button>
      {/if}
   </div>
</div>
