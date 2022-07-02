<script>
import { queryStore, gql } from "@urql/svelte";
import { clientWithCookieSession } from "../../client.js";
import Cookie from "js-cookie";
import { goto } from "$app/navigation";
import { browser } from "$app/env";
import { page } from "$app/stores";

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

   <div class="mt-8 flex flex-row justify-between text-sm ">
      <div
         class="mr-48 flex min-w-[200px] flex-col child:flex child:h-8 child:flex-row child:items-center child:rounded-lg child:py-4 child:pl-2 child-hover:bg-gray-200">
         <a class:bg-gray-200="{$page.url.pathname == '/myprofile/profilesettings'}" href="/myprofile/profilesettings" class=""
            >👤 profile settings</a>
         <a class:bg-gray-200="{$page.url.pathname == '/myprofile/tabs'}" href="/myprofile/tabs" class="">🎸 my tabs</a>
         <a class:bg-gray-200="{$page.url.pathname == '/myprofile/chords'}" href="/myprofile/chords" class="">🎹 my chords</a>
         <div class="">other</div>
      </div>

      <slot />
   </div>
{:else}
   <p>Loading...</p>
{/if}
