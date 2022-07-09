<script>
import { goto } from "$app/navigation";
import { toast } from "@zerodevx/svelte-toast";
import { mutationStore, gql } from "@urql/svelte";
import client from "../client.js";
import { faunaSession } from "../store.js";
import Cookies from "js-cookie";
import { page } from "$app/stores";

let resp;
let email;
let password;

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

const login = async () => {
   if (!email || !password) return;
   resp = mutationStore({ client, query: loginMutation, variables: { email, password } });
};

console.log($page.url.searchParams.get("referrer"));
$: if ($resp?.data?.login) {
   Cookies.set("fauna-session", JSON.stringify($resp?.data?.login), { expires: new Date($resp?.data?.login?.ttl) });
   faunaSession.set($resp.data.login);
   goto($page.url.searchParams.get("referrer") ? $page.url.searchParams.get("referrer") : "/");
}

$: if ($resp?.error) {
   toast.push("Invalid credentials", {
      theme: {
         "--toastBackground": "#D2042D",
         "--toastBarBackground": "#D2042D",
         "--toastBorderRadius": "1rem",
      },
   });
}
</script>

<svelte:head>
   <title>Login — Bop Tabs</title>
</svelte:head>
<div class="mt-16 flex flex-col  md:ml-[15%]">
   <p class="pb-3 text-4xl">log in</p>
   <p class="">new to BopTabs? <a class="text-blue-600" href="/signup">sign up for an account</a></p>

   <div class="mr-auto flex flex-col items-center pt-10 ">
      <p class="font mr-auto pb-2">email</p>
      <input
         type="text"
         bind:value="{email}"
         on:keypress="{(e) => (e.code == 'Enter' ? login() : null)}"
         class=" h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none" />
   </div>

   <div class="mr-auto flex flex-col items-center pt-5">
      <p class="mr-auto pb-2">password</p>
      <input
         bind:value="{password}"
         on:keypress="{(e) => (e.code == 'Enter' ? login() : null)}"
         type="password"
         class="h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none" />
   </div>

   <button on:click="{login}" class=" mt-10 mb-4 w-96 rounded bg-[#091834] py-1 text-white"> log in 👉</button>
</div>
