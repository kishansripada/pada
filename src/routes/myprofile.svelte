<script>
import { queryStore, gql } from "@urql/svelte";
import { clientWithCookieSession } from "../client";
import Cookie from "js-cookie";

const cookies = Cookie.get("fauna-session");

const { email, secret } = cookies ? JSON.parse(cookies) : {};

let client = clientWithCookieSession(secret);

const findCurrentOwner = gql`
   query ($email: String!) {
      findUserByEmail(email: $email) {
         _id
         name
         email
         tabs {
            data {
               _id
            }
         }
      }
   }
`;

let userData = queryStore({ client, query: findCurrentOwner, variables: { email }, requestPolicy: "network-only" });
$: console.log($userData);
</script>

<div class="">
   {#if !cookies}
      <p>You are not Loged in.</p>
      <a href="/login">Login</a>
   {/if}

   {#if $userData.data}
      <h4>{$userData.data.findUserByEmail.name}</h4>
      <div><b>Email:</b> {$userData.data.findUserByEmail.email}</div>
      <ul class="">
         {#each $userData.data.findUserByEmail.tabs.data as tab}
            <li>
               <div class="">
                  <p>
                     <a href="/store/{tab._id}">View</a>
                  </p>
               </div>
            </li>
         {/each}
      </ul>
   {/if}
</div>
