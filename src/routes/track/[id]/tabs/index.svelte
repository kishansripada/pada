<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
import { version } from "../../../../store.js";
import Info from "../../../../lib/Info.svelte";
import Flat from "../../../../lib/Tabs/Flat.svelte";
// import UploadTabs from "../lib/Tabs/UploadTabs.svelte";
import { page } from "$app/stores";
import app from "../../../../fb.js";
import { collection, query, getFirestore, getDocs, doc, where } from "firebase/firestore";
export let trackDetails;
const db = getFirestore(app);

$: trackRef = doc(db, "tracks", $page.params.id);

$: q = query(collection(trackRef, "tabs"), where("isApproved", "==", true));

$: approvedTabs = getDocs(q).then((querySnapshot) => {
   let tabs = [];
   querySnapshot.forEach((doc) => tabs.push(doc.data()));
   return tabs;
});

// $: console.log(approvedTabs);
</script>

<svelte:head>
   <title>{trackDetails.name} — Tabs — Bop Tabs</title>
</svelte:head>

{#await approvedTabs then approvedTabs}
   {#if approvedTabs.length}
      <div class="py-3">
         <Info approvedTabsOrChords="{approvedTabs}" />
      </div>
      <Flat style="height:500px" xml="{approvedTabs[$version.tabs].musicXml}" />
   {/if}
{/await}
