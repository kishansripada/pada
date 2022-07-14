<script>
import { user } from "../store";
import { page } from "$app/stores";
import { browser } from "$app/env";
import { goto } from "$app/navigation";
import { minorKeys, majorKeys } from "../musicTheory.js";
export let trackDetails;

const upload = () => {
   console.log($page.routeId == "track/[id]/chords/[...chordId]");
   if ($page.routeId == "track/[id]/tabs/[...tabId]") goto(`${$page.url.pathname}/upload`, { noscroll: true });
   if ($page.routeId == "track/[id]/chords/[...chordId]") goto(`${$page.url.pathname}/write`, { noscroll: true });

   if (!$user) goto(`/login?referrer=${$page.url.href}`, { noscroll: true });

   if ($page.routeId == "track/[id]/tabs/upload") goto(`${$page.url.pathname.split("/").slice(0, -1).join("/")}`, { noscroll: true });
   if ($page.routeId == "track/[id]/chords/write") goto(`${$page.url.pathname.split("/").slice(0, -1).join("/")}`, { noscroll: true });
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
   let mode = trackDetails.features.mode == 0 ? " Minor" : trackDetails.features.mode == 1 ? " Major" : "";

   return (trackDetails.features.mode == 0 ? minorKeys : trackDetails.features.mode == 1 ? majorKeys : "")[trackDetails.features.key] + " " + mode;
};
</script>

<div class="flex h-64 flex-row  rounded-[20px] bg-white/10 shadow-2xl">
   <img class="ml-4 mt-4 h-56 w-56" src="{trackDetails.album.images[0].url}" alt="" />

   <div class="ml-6 mt-0 flex flex-col text-black">
      <div class="mb-auto mt-6">
         <p class=" mb-2 text-4xl ">{trackDetails.name.length > 40 ? trackDetails.name.substring(0, 40) + "..." : trackDetails.name}</p>
         <p class="">{trackDetails.album.name}</p>
      </div>

      <div class="mt-auto flex flex-nowrap pb-4">
         {#each trackDetails.artists as artist}
            <div class="flex w-32  flex-col items-center pr-6 text-center">
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

      <button
         class="border-white-300 mt-auto rounded-xl border border-solid py-1 px-3 text-[#091834] transition duration-200 hover:bg-[#091834] hover:text-white"
         on:click="{upload}"
         >{$page.routeId == "track/[id]/chords/[...chordId]"
            ? "write chords ✍️"
            : $page.routeId == "track/[id]/tabs/[...tabId]"
            ? "upload tabs"
            : "cancel 🚫"}
      </button>
   </div>
</div>
