<script>
import Firebase from "../fb.js";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { goto } from "$app/navigation";
import { toast } from "@zerodevx/svelte-toast";
const auth = getAuth();
let email;
let password;

const login = async () => {
   if (!email || !password) return;
   try {
      let authToken = await signInWithEmailAndPassword(auth, email, password);
      goto("/");
   } catch {
      toast.push("Invalid credentials", {
         theme: {
            "--toastBackground": "#D2042D",
            "--toastBarBackground": "#D2042D",
            "--toastBorderRadius": "1rem",
         },
      });
   }
};
</script>

<div class="ml-36 mt-16 flex flex-col">
   <p class="pb-3 text-4xl font-light">log in</p>
   <p class="">new to BopTabs? <a class="text-blue-600" href="/signup">sign up for an account</a></p>

   <div class="mr-auto flex flex-col items-center pt-10 ">
      <p class="font mr-auto pb-2">email</p>
      <input
         type="text"
         bind:value="{email}"
         on:keypress="{(e) => (e.code == 'Enter' ? login() : null)}"
         class=" h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>

   <div class="mr-auto flex flex-col items-center pt-5">
      <p class="mr-auto pb-2">password</p>
      <input
         bind:value="{password}"
         on:keypress="{(e) => (e.code == 'Enter' ? login() : null)}"
         type="password"
         class="h-8 w-96 rounded bg-transparent px-2 outline outline-[#091834]" />
   </div>

   <button on:click="{login}" class=" mt-10 mb-4 w-96 rounded bg-[#091834] py-1 text-white"> log in </button>
</div>
