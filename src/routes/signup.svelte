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
let passwordCheck;

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

<div class="ml-36 mt-16 flex flex-col">
   <p class="pb-3 text-4xl font-light">sign up</p>
   <p class="">already have an account? <a class="text-blue-600" href="/login">log in</a></p>

   <div class="mr-auto flex flex-col items-center pt-10 pb-2">
      <p class="font mr-auto pb-2">name</p>
      <input type="text" bind:value="{name}" class="h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>

   <div class="mr-auto flex flex-col items-center  pb-6">
      <p class="font mr-auto pb-2">email</p>
      <input type="text" bind:value="{email}" class="h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>

   <div class="mr-auto flex flex-col items-center pb-2">
      <p class="mr-auto pb-2">password</p>
      <input bind:value="{password}" type="password" class=" h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>
   <div class="mr-auto flex flex-col items-center">
      <p class="mr-auto pb-2">confirm password</p>
      <input bind:value="{passwordCheck}" type="password" class=" h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>
   {#if password != passwordCheck}
      <p class="pt-1 text-sm text-red-600">passwords don't match!</p>
   {:else}
      <p class="pt-1 text-sm text-red-600 h-6">{" "}</p>
   {/if}

   <button on:click="{signup}" class=" mt-10 mb-4 w-96 rounded py-1 outline outline-[#091834]"> sign up </button>
</div>
