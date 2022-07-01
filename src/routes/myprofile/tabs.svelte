<script>
import { queryStore, gql } from "@urql/svelte";
import { clientWithCookieSession } from "../../client.js";
import Cookie from "js-cookie";
import { goto } from "$app/navigation";
const cookies = Cookie.get("fauna-session");
const { email, secret } = cookies ? JSON.parse(cookies) : {};
let client = clientWithCookieSession(secret);

const findCurrentOwner = gql`
   query ($email: String!) {
      findUserByEmail(email: $email) {
         tabs {
            data {
               _id
               description
               approved
               track {
                  name
                  artists
               }
            }
         }
      }
   }
`;

let myTabs = queryStore({ client, query: findCurrentOwner, variables: { email }, requestPolicy: "network-only" });
$: console.log($myTabs);
</script>

{#if !$myTabs.loading}
   {#if $myTabs?.data?.findUserByEmail?.tabs?.data}
      <div class="flex w-full flex-col">
         {#each $myTabs.data.findUserByEmail.tabs.data as tab}
            <div class="mb-3 flex h-16  flex-row items-center rounded ring-2 ring-black">
               <p class="pl-3 text-2xl">{tab.approved ? "✅" : "🟠"}</p>
               <div class="flex flex-col">
                  <p class="pl-3">{tab.track.name}</p>
                  <p class="pl-3 text-xs">{tab.track.artists.join(", ")}</p>
               </div>

               <p class="ml-auto pl-3 pr-3 text-right text-xs">{tab.description}</p>
            </div>
         {/each}
      </div>
   {/if}
{:else}
   loading...
{/if}
