<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
import { version } from "../../../../store.js";
import Info from "../../../../lib/Info.svelte";
import Flat from "../../../../lib/Tabs/Flat.svelte";
import { page } from "$app/stores";
import client from "../../../../client.js";
import { queryStore, gql } from "@urql/svelte";
export let trackDetails;

const getApprovedTracksAndChords = gql`
   query ($spotifyId: String!) {
      getApprovedTracksAndChords(spotifyId: $spotifyId) {
         _id
         musicXml
         description
         author {
            name
            email
         }
      }
   }
`;

let approvedTabs;
// get the current track id from the URL
$: trackId = $page.params.id;

// get the approved track of the currect trackId (reactively)
$: approvedTabs = queryStore({ client, query: getApprovedTracksAndChords, variables: { spotifyId: trackId } });

$: console.log($approvedTabs);

// every track will default to the first tab
let selected = 0;

// if the trackId changes, then reset the current selected track to the first
$: (selected = 0), trackId;
</script>

<svelte:head>
   <title>{trackDetails.name} — Tabs | Bop Tabs</title>
</svelte:head>

{#if $approvedTabs.fetching}
   <p>Loading Tabs...</p>
{:else if $approvedTabs?.data?.getApprovedTracksAndChords[0]}
   <div class="py-3">
      <Info bind:selected approvedTabsOrChords="{$approvedTabs.data?.getApprovedTracksAndChords}" />
   </div>
   <Flat style="height:500px" xml="{$approvedTabs.data.getApprovedTracksAndChords[selected].musicXml}" />
{:else}
   <div>No Tabs!</div>
{/if}
