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
$: approvedTabs = queryStore({ client, query: getApprovedTracksAndChords, variables: { spotifyId: $page.params.id } });

$: console.log($approvedTabs);
</script>

<svelte:head>
   <title>{trackDetails.name} — Tabs — Bop Tabs</title>
</svelte:head>

{#if $approvedTabs.fetching}
   <p>Loading Tabs...</p>
{:else if $approvedTabs?.data?.getApprovedTracksAndChords[0]}
   <div class="py-3">
      <Info approvedTabsOrChords="{$approvedTabs.data?.getApprovedTracksAndChords}" />
   </div>
   <Flat style="height:500px" xml="{$approvedTabs.data.getApprovedTracksAndChords[$version.tabs].musicXml}" />
{:else}
   <div>No Tabs!</div>
{/if}

<!-- {#if !approvedTabs.fetching}
   {#if approvedTabs.data?.getApprovedTracksAndChords}
      <div class="py-3">
        <Info approvedTabsOrChords="{approvedTabs}" />
      </div>
      <Flat style="height:500px" xml="{approvedTabs.data.getApprovedTracksAndChords[$version.tabs].musicXml}" />
   {/if}
{/if}  -->
