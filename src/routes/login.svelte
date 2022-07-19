<script>
import { goto } from "$app/navigation";
import { toast } from "@zerodevx/svelte-toast";
import { supabase } from "../supabase.js";
import { page } from "$app/stores";

let email;
let password;

const login = async () => {
   if (!email || !password) return;
   let { user, error } = await supabase.auth.signIn({
      email,
      password,
   });
   if (error) {
      toast.push("Invalid credentials", {
         theme: {
            "--toastBackground": "#D2042D",
            "--toastBarBackground": "#D2042D",
            "--toastBorderRadius": "1rem",
         },
      });
   }
   if (user) {
      goto($page.url.searchParams.get("referrer") ? $page.url.searchParams.get("referrer") : "/");
   }
};
</script>

<svelte:head>
   <title>Login — Pada</title>
</svelte:head>

<main class="container ">
   <div class="mt-16 flex flex-col  md:ml-[15%]">
      <p class="pb-3 text-4xl">log in</p>
      <p class="">new to pada? <a class="text-blue-600" href="/signup">sign up for an account</a></p>

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
</main>
