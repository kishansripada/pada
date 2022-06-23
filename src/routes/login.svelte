<script>
import { mutationStore, gql } from "@urql/svelte";
import client from "../client.js";
import { faunaSession } from "../store";
import { goto } from "$app/navigation";
import Cookies from "js-cookie";

const loginMutation = gql`
   mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
         secret
         ttl
         email
         ownerId
      }
   }
`;

let resp;
let email;
let password;

const login = () => (resp = mutationStore({ client, query: loginMutation, variables: { email, password } }));

$: console.log($resp);
$: if ($resp?.fetching == false) {
   if ($resp?.data?.login) {
      Cookies.set("fauna-session", JSON.stringify($resp.data.login), { expires: new Date($resp.data.login.ttl) });
      goto("/");
      faunaSession.update(() => resp.data.login);
   }

   //    if ($resp?.error?.message) {
   //       alert(resp?.error?.message);
   //       console.log(resp.error);
   //    }
}
</script>

<div class="ml-36 mt-16 flex flex-col">
   <p class="pb-3 text-4xl font-light">log in</p>
   <p class="">new to BopTabs? <a class="text-blue-600" href="/signup">sign up for an account</a></p>

   <div class="mr-auto flex flex-col items-center pt-10 pb-5">
      <p class="font mr-auto pb-2">email</p>
      <input type="text" bind:value="{email}" class=" h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>

   <div class="mr-auto flex flex-col items-center">
      <p class="mr-auto pb-2">password</p>
      <input bind:value="{password}" type="password" class="h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>

   <button on:click="{login}" class=" mt-10 mb-4 w-96 rounded py-1 outline outline-[#091834]"> log in </button>
</div>
