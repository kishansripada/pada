<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
export let trackDetails;
import Info from "../../../../lib/Info.svelte";
import OSMD from "../../../../lib/OSMD.svelte";
import { page } from "$app/stores";
import { user } from "../.././../../store.js";
import { goto } from "$app/navigation";
import { supabase } from "../../../../supabase.js";

// $: console.log(tabs);
const upload = () => {
   if (!$user) {
      goto(`/login?referrer=${$page.url.href}`, { noscroll: true });
   } else {
      goto(`${$page.url.href}/upload`, { noscroll: true });
   }
};

// get the current track id from the URL
$: trackId = $page.params.id;

$: tabs = supabase
   .from("tabs")
   .select("*")
   .eq("spotifyId", trackId)
   .eq("approvalstatus", "approved")
   .then((r) => r.data);

// every track will default to the first tab
let selected = 0;

// if the trackId changes, then reset the current selected track to the first
$: (selected = 0), trackId;

$: console.log(tabs);
</script>

<svelte:head>
   <title>{trackDetails.name} — Chords | Bop Tabs</title>
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
   <meta name="twitter:title" content="{trackDetails.name} — Tabs | Bop Tabs" />
   <meta name="twitter:image" content="{trackDetails.album.images[0].url}" />
   <meta property="og:type" content="song" />
   <meta property="og:title" content="{trackDetails.name} — Tabs | Bop Tabs" />
   <meta
      property="og:description"
      content="learn to play {trackDetails.name} by {trackDetails.artists[0]
         .name} tabs synced to your spotify account, add capo, transpose key, chord diagrams and more" />
   <meta property="og:image" content="{trackDetails.album.images[0].url}" />
   <!-- <meta property="og:url" content="PERMALINK" /> -->
   <meta property="og:site_name" content="Bop Tabs" />
</svelte:head>

{#await tabs}
   <div class="flex items-center justify-center pt-8">
      <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
   </div>
{:then tabs}
   {#if tabs.length}
      <div class="mb-8">
         <div class="py-3">
            <Info bind:selected approvedTabsOrChords="{tabs}" />
         </div>
         <OSMD xml="{tabs[selected].musicXml}" />
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
