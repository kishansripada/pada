<script>
import { mutationStore, gql } from "@urql/svelte";
import client from "../client.js";
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
   }

   //    if ($resp?.error?.message) {
   //       alert(resp?.error?.message);
   //       console.log(resp.error);
   //    }
}
</script>

<h1 class="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-8xl font-extrabold text-transparent">Login</h1>
<div class="flex justify-center text-white ">
   <div class="flex h-96 w-96 flex-col justify-center rounded-[20px] bg-white/10 shadow-2xl">
      <div class="ml-auto mr-4 w-64">
         <div class="flex flex-row items-center">
            <p>email:</p>
            <input type="text" bind:value="{email}" class="my-4 h-8 w-64 rounded bg-transparent outline outline-white" />
         </div>

         <div class="flex flex-row items-center">
            <p>Password:</p>
            <input bind:value="{password}" type="password" class=" h-8 w-64 rounded bg-transparent outline outline-white" />
         </div>
      </div>

      <button on:click="{login}" class="w-20 rounded outline outline-white"> Login </button>
      <a href="/signup" class="w-20 rounded outline outline-white"> Signup </a>
   </div>
</div>
