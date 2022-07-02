<script>
import { queryStore, gql } from "@urql/svelte";
import { clientWithCookieSession } from "../../client.js";
import Cookie from "js-cookie";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
const cookies = Cookie.get("fauna-session");
const { email, secret } = cookies ? JSON.parse(cookies) : {};
let client = clientWithCookieSession(secret);

let cursor = null;
$: findCurrentOwner = gql`
   query ($email: String!) {
      findUserByEmail(email: $email) {
         tabs(_size: 8, _cursor: ${cursor}) {
            data {
               _id
               description
               approved
               track {
                  name
                  artists
                  spotifyId
               }
            }
            before
            after
         }
      }
   }
`;

$: myTabs = queryStore({ client, query: findCurrentOwner, variables: { email }, requestPolicy: "network-only" });

$: console.log($myTabs);
</script>

<div class="flex w-full flex-col">
   <div class="pl-3">
      <h1 class=" pb-2 text-3xl font-light">my submitted tablatures 💯</h1>
      <hr class="pb-4" />
   </div>

   {#if !$myTabs.loading}
      {#if $myTabs?.data?.findUserByEmail?.tabs?.data}
         {#if $myTabs.data.findUserByEmail.tabs.data.length}
            {#each $myTabs.data.findUserByEmail.tabs.data as tab}
               <a
                  sveltekit:prefetch
                  href="/track/{tab.track.spotifyId}/tabs/{tab._id}"
                  class:pointer-events-none="{!tab.approved}"
                  class=" flex h-16  flex-row items-center rounded  hover:bg-gray-100">
                  <p class="pl-3 text-xl">{tab.approved ? "✅" : "🟠"}</p>
                  <div class="flex flex-col">
                     <p class="pl-3">{tab.track.name}</p>
                     <p class="pl-3 text-xs">{tab.track.artists.join(", ")}</p>
                  </div>
                  <p class="ml-auto pl-3 pr-3 text-right text-xs">{tab.description}</p>
               </a>
               <hr />
            {/each}
            <div class=" flex flex-row justify-center pt-8">
               <button
                  sveltekit:prefetch
                  class:opacity-50="{!$myTabs.data.findUserByEmail.tabs.before}"
                  class:pointer-events-none="{!$myTabs.data.findUserByEmail.tabs.before}"
                  class="pl-2"
                  on:click="{() => (cursor = `"${$myTabs.data.findUserByEmail.tabs.before}"`)}">⬅️ back</button>
               <button
                  class:opacity-50="{!$myTabs.data.findUserByEmail.tabs.after}"
                  class:pointer-events-none="{!$myTabs.data.findUserByEmail.tabs.after}"
                  class=" pl-2 "
                  on:click="{() => (cursor = `"${$myTabs.data.findUserByEmail.tabs.after}"`)}">next ➡️</button>
            </div>
         {:else}
            <p class="flex flex-row justify-center text-3xl">you haven't submitted any tabs yet! 😞</p>
         {/if}
      {/if}
   {:else}
      loading...
   {/if}
</div>
