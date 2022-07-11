<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
import Info from "../../../../lib/Info.svelte";
import Flat from "../../../../lib/Tabs/Flat.svelte";
import { page } from "$app/stores";
export let trackDetails;
import { faunaSession } from "../.././../../store.js";
import { goto } from "$app/navigation";
import { supabase } from "../../../../supabase.js";

// $: console.log(tabs);
const upload = () => {
   if (!$faunaSession) {
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
   .eq("approvalStatus", "approved")
   .then((r) => r.data);

// every track will default to the first tab
let selected = 0;

// if the trackId changes, then reset the current selected track to the first
$: (selected = 0), trackId;
</script>

<svelte:head>
   <title>{trackDetails.name} — Tabs | Bop Tabs</title>
</svelte:head>

{#await tabs}
   <p>Loading...</p>
{:then tabs}
   {#if tabs.length}
      <div class="py-3">
         <Info bind:selected approvedTabsOrChords="{tabs}" />
      </div>
      <Flat style="height:500px" xml="{tabs[selected].musicXml}" />
   {:else}
      <div class="flex flex-row justify-center pt-8">
         <div class="flex flex-col items-center">
            <p>there aren't any tabs for this song 😞</p>
            <button on:click="{upload}" class="text-blue-500" href="{$page.url.pathname}/upload">submit one</button>
         </div>
      </div>
   {/if}
{/await}
