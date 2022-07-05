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

   <div class="mt-8 flex min-h-[500px] flex-row justify-between text-sm">
      <div
         class="mr-36 flex min-w-[300px] flex-col  rounded-xl bg-gradient-to-bl from-[#9E1946]/40 to-[#A390E4]/40 p-6  child:flex child:h-8 child:flex-row child:items-center child:rounded-lg child:py-4 child:pl-2 child-hover:bg-white/30">
         <a class="{$page.url.pathname == '/myprofile/profilesettings' ? 'bg-white/30' : ''}" href="/myprofile/profilesettings">
            <span class="pr-2 text-xl grayscale">👤 </span>profile settings</a>
         <a class="{$page.url.pathname == '/myprofile/tabs' ? 'bg-white/30' : ''}" href="/myprofile/tabs">
            <span class="pr-2 text-xl grayscale">🎸 </span>my tabs</a>
         <a class="{$page.url.pathname == '/myprofile/chords' ? 'bg-white/30' : ''}" href="/myprofile/chords">
            <span class="pr-2 text-xl grayscale">🎹 </span>my chords</a>
         <div class="">other</div>
      </div>

      <slot />
   </div>
{:else}
   <p>Loading...</p>
{/if}
