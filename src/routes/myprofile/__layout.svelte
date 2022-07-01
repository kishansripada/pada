<script>
import { queryStore, gql } from "@urql/svelte";
import { clientWithCookieSession } from "../../client.js";
import Cookie from "js-cookie";
import { goto } from "$app/navigation";
import { browser } from "$app/env";
const cookies = Cookie.get("fauna-session");
const { email, secret } = cookies ? JSON.parse(cookies) : {};

$: if (!email && browser) {
   console.log(email);
   goto("/login");
}

let client = clientWithCookieSession(secret);
const findCurrentOwner = gql`
   query ($email: String!) {
      findUserByEmail(email: $email) {
         _id
         name
         email
      }
   }
`;

let userData = queryStore({ client, query: findCurrentOwner, variables: { email }, requestPolicy: "network-only" });
$: console.log($userData);
</script>

{#if !$userData.fetching}
   <h4>{$userData.data.findUserByEmail.name}</h4>
   <div><b>Email:</b> {$userData.data.findUserByEmail.email}</div>

   <div class="flex flex-row justify-between">
      <div class="flex min-w-[200px]  flex-col pr-10">
         <a href="/myprofile/profilesettings" class="h-12 rounded-xl bg-gray-200 p-2">profile settings</a>
         <a href="/myprofile/tabs" class="h-12 rounded-xl bg-gray-200 p-2">my tabs</a>
         <a href="/myprofile/chords" class="h-12 rounded-xl bg-gray-200 p-2">my chords</a>
         <div class="h-12 rounded-xl bg-gray-200 p-2">other</div>
      </div>
      <slot />
   </div>
{:else}
   <p>Loading...</p>
{/if}
