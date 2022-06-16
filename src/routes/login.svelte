<script>
import { mutationStore, gql } from "@urql/svelte";
import client from "../client.js";

const loginMutation = gql`
   mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
         secret
         ttl
      }
   }
`;

let login = mutationStore({ client, query: loginMutation, variables: { email: "security@fauna-labs.com", password: "qZXUEhaNdng9" } });

$: console.log($login);
</script>

<div class="flex justify-center text-white ">
   <div class="flex h-96 w-96 flex-col justify-center rounded-[20px] bg-white/10 shadow-2xl">
      <div class="ml-auto mr-4 w-64">
         <div class="flex flex-row items-center">
            <p>email:</p>
            <input type="text" class="my-4 h-8 w-64 rounded bg-transparent outline outline-white" />
         </div>

         <div class="flex flex-row items-center">
            <p>Password:</p>
            <input type="password" class=" h-8 w-64 rounded bg-transparent outline outline-white" />
         </div>
      </div>

      <button class="w-20 rounded outline outline-white"> Login </button>
      <button class="w-20 rounded outline outline-white"> Signup </button>
   </div>
</div>
