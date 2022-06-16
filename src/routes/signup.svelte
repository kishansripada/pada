<script lang="js">
import { mutationStore, gql } from "@urql/svelte";
import client from "../client";
import { goto } from "$app/navigation";

const registerMutation = gql`
   mutation ($name: String!, $email: String!, $password: String!) {
      registerUser(name: $name, email: $email, password: $password) {
         email
         _id
      }
   }
`;

let resp;
let name;
let email;
let password;

const signup = () => (resp = mutationStore({ client, query: registerMutation, variables: { name, email, password } }));

$: if ($resp?.fetching == false) {
   if ($resp.data?.registerUser) {
      goto("/");
   }

   //    if ($resp?.error?.message) {
   //       alert(resp?.error?.message);
   //       console.log(resp.error);
   //    }
}
</script>

<div class="">
   <h3 class="">Sign up</h3>
   <input class="" type="text" placeholder="Name" bind:value="{name}" />
   <input class="" type="text" placeholder="Email" bind:value="{email}" />
   <input class="" type="password" placeholder="Password" bind:value="{password}" />
   <button on:click="{signup}">Sign up!</button>
</div>
