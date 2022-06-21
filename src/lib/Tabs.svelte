<script>
import { isUploadingTabs, version } from "../store";
import { queryStore, gql } from "@urql/svelte";
import client from "../client.js";
import Info from "./Info.svelte";
import Flat from "../lib/Tabs/Flat.svelte";
import UploadTabs from "../lib/Tabs/UploadTabs.svelte";
import { page } from "$app/stores";

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
</script>

{#if !$isUploadingTabs}
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
{:else}
   <!-- {#await $trackDetails then trackDetails}
      <UploadTabs trackDetails="{trackDetails}" mongoTrack="{mongoTrack}" />
   {/await} -->
{/if}
