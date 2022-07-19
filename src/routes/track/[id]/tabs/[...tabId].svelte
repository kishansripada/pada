<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
export let trackDetails;
import play from "../../../../static/play.svg";
import pause from "../../../../static/pause.svg";
import reset from "../../../../static/reset.svg";
import { page } from "$app/stores";
import { browser } from "$app/env";
import { user } from "../.././../../store.js";
import { goto } from "$app/navigation";
import { supabase } from "../../../../supabase.js";

const upload = () => {
   if (!$user) {
      goto(`/login?referrer=${$page.url.href}`, { noscroll: true });
   } else {
      goto(`${$page.url.href}/upload`, { noscroll: true });
   }
};

let selected = 0;
$: tabs = (async () => {
   let resp = await supabase
      .from("tabs")
      .select(
         `     
    created_at,
    id,
    approvalstatus,
    musicXml,
    profiles (
      full_name,
      profile_pic_url
    )`
      )
      .eq("spotifyId", $page.params.id)
      .eq("approvalstatus", "approved")
      .then((r) => r.data);

   selected = resp.findIndex((tab) => tab.id == $page.params.tabId) == -1 ? 0 : resp.findIndex((tab) => tab.id == $page.params.tabId);

   return resp;
})();

// OSMD
let container;
let loaded = false;
let isPlaying = false;
let osmd;
let playbackManager;
let timingSource;

const loadedTrue = () => {
   loaded = true;
};

$: if (loaded && tabs && container) {
   tabs.then((tabs) => {
      if (!tabs.length) return;
      loadTabs(tabs[selected].musicXml);
   });
}

async function loadTabs(xml) {
   osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container);
   osmd.setOptions({
      autoResize: true,
      backend: "svg",
      drawTitle: false,
      drawComposer: false,
      performanceMode: "performanceMode",
      pageFormat: "endless",
      cursorsOptions: [{ type: 0, color: "#CBC3E3", alpha: 0.6, follow: true }],
   });

   osmd.load(xml).then(() => {
      osmd.render();
      timingSource = new opensheetmusicdisplay.LinearTimingSource();
      playbackManager = new opensheetmusicdisplay.PlaybackManager(timingSource, undefined, new opensheetmusicdisplay.BasicAudioPlayer(), undefined);
      playbackManager.DoPlayback = true;
      playbackManager.DoPreCount = false;
      playbackManager.PreCountMeasures = 1; // note that DoPreCount has to be true for a precount to happen
      timingSource.Settings = osmd.Sheet.playbackSettings;
      playbackManager.initialize(osmd.Sheet.musicPartManager);
      playbackManager.addListener(osmd.cursor);
      playbackManager.reset();
      osmd.PlaybackManager = playbackManager;
   });
}

$: (() => {
   osmd?.PlaybackManager?.pause();
   isPlaying = false;
})(),
   $page;
</script>

<svelte:head>
   {#if browser}
      <script src="https://cdn.jsdelivr.net/gh/kishansripada/BopTabs/opensheetmusicdisplay.js" on:load="{loadedTrue}">
      </script>
   {/if}
   <title>{trackDetails.name} — Chords | Pada</title>
   <meta
      name="description"
      content="learn to play {trackDetails.name} by {trackDetails.artists[0]
         .name} tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta
      name="keywords"
      content="{trackDetails.name}, {trackDetails.artists
         .map((artist) => artist.name)
         .join(', ')}, Chords, guitar chords, chords, tab, ukulele, tab, tablature, tablatures" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="{trackDetails.name} — Tabs | Pada" />
   <meta name="twitter:image" content="{trackDetails.album.images[0].url}" />
   <meta property="og:type" content="song" />
   <meta property="og:title" content="{trackDetails.name} — Tabs | Pada" />
   <meta
      property="og:description"
      content="learn to play {trackDetails.name} by {trackDetails.artists[0]
         .name} tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta property="og:image" content="{trackDetails.album.images[0].url}" />

   <meta property="og:site_name" content="Pada" />
</svelte:head>

{#await tabs}
   <div class="flex items-center justify-center pt-8">
      <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
   </div>
{:then tabs}
   {#if tabs.length}
      <div class="mb-8 relative">
         <div class="z-40 flex h-24 flex-row items-center rounded-full  text-black relative top-[50px] px-10">
            <div class=" py-2 pl-3 w-1/3">
               <select
                  bind:value="{selected}"
                  class=" form-select mt-auto ml-auto mr-5 w-24 appearance-none rounded-xl border bg-white/5 bg-clip-padding px-2 py-1.5 text-center text-base font-normal text-[#091834] outline-none hover:bg-white/10">
                  {#each tabs as version, index}
                     <option value="{index}">
                        version {index + 1}
                     </option>
                  {/each}
               </select>
            </div>
            <div class="flex flex-row items-center w-1/3 justify-center">
               <img
                  src="{reset}"
                  class="h-10 w-10 cursor-pointer"
                  alt=""
                  on:click="{() => {
                     osmd.PlaybackManager.setPlaybackStart();
                     osmd.PlaybackManager.pause();
                     isPlaying = false;
                  }}" />
               <img
                  src="{isPlaying ? pause : play}"
                  alt=""
                  class="cursor-pointer"
                  on:click="{() =>
                     isPlaying
                        ? osmd.PlaybackManager.pause().then(() => (isPlaying = false))
                        : osmd.PlaybackManager.play().then(() => (isPlaying = true))}" />
            </div>

            <div class="flex flex-row items-center w-1/3 justify-end">
               <img
                  class="h-16 w-16 rounded-full object-cover"
                  src="https://mofbpdxaxkjlvywcbpmj.supabase.co/storage/v1/object/public/{tabs[selected].profiles.profile_pic_url}"
                  alt="" />

               <div class="flex flex-col pl-3 pt-3">
                  <p class="">{tabs[selected].profiles.full_name}</p>
               </div>
            </div>
         </div>

         <div bind:this="{container}"></div>
      </div>
   {:else}
      <div class="flex flex-row justify-center pt-8 mb-8">
         <div class="flex flex-col items-center">
            <p>there aren't any tabs for this song 😞</p>
            <button on:click="{upload}" class="text-blue-500" href="{$page.url.pathname}/upload">submit one</button>
         </div>
      </div>
   {/if}
{/await}
