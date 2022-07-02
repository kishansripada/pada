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

{#if !$myTabs.loading}
   {#if $myTabs?.data?.findUserByEmail?.tabs?.data}
      <div class="flex w-full flex-col">
         {#if $myTabs.data.findUserByEmail.tabs.data.length}
            {#each $myTabs.data.findUserByEmail.tabs.data as tab}
               <a
                  href="/track/{tab.track.spotifyId}/tabs/{tab._id}"
                  class:pointer-events-none="{!tab.approved}"
                  class="mb-3 flex h-16  flex-row items-center rounded ring-2 ring-black">
                  <p class="pl-3 text-2xl">{tab.approved ? "✅" : "🟠"}</p>
                  <div class="flex flex-col">
                     <p class="pl-3">{tab.track.name}</p>
                     <p class="pl-3 text-xs">{tab.track.artists.join(", ")}</p>
                  </div>
                  <p class="ml-auto pl-3 pr-3 text-right text-xs">{tab.description}</p>
               </a>
            {/each}
            <div class=" flex flex-row justify-center">
               <button
                  class:opacity-50="{!$myTabs.data.findUserByEmail.tabs.before}"
                  class:pointer-events-none="{!$myTabs.data.findUserByEmail.tabs.before}"
                  class="pl-2"
                  on:click="{() => (cursor = `"${$myTabs.data.findUserByEmail.tabs.before}"`)}">back</button>
               <button
                  class:opacity-50="{!$myTabs.data.findUserByEmail.tabs.after}"
                  class:pointer-events-none="{!$myTabs.data.findUserByEmail.tabs.after}"
                  class=" pl-2 "
                  on:click="{() => (cursor = `"${$myTabs.data.findUserByEmail.tabs.after}"`)}">next</button>
            </div>
         {:else}
            <p class="flex flex-row justify-center text-3xl">you haven't submitted any tabs yet! 😞</p>
         {/if}
      </div>
   {/if}
{:else}
   loading...
{/if}
