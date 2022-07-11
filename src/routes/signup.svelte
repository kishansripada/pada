<script lang="js">
import { supabase } from "../supabase.js";
import { goto } from "$app/navigation";
import { toast } from "@zerodevx/svelte-toast";

let name;
let email;
let password = "";
let passwordCheck;

$: isValidEmail =
   email &&
   !!email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   );
$: isValidPassword = password && !!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/);

const signup = async () => {
   if (!isValidEmail || !isValidPassword || password != passwordCheck) return;
   let { user, error } = await supabase.auth.signUp({
      email,
      password,
   });

   if (error) {
      toast.push("That email is taken", {
         theme: {
            "--toastBackground": "#D2042D",
            "--toastBarBackground": "#D2042D",
            "--toastBorderRadius": "1rem",
         },
      });
      return;
   }
   if (user) {
      console.log(user);
      toast.push("Check your email to finish signing up", {
         theme: {
            "--toastBackground": "#006400",
            "--toastBarBackground": "#006400",
            "--toastBorderRadius": "1rem",
         },
      });
      goto("/login");
   }
};
</script>

<svelte:head>
   <title>Sign Up — Bop Tabs</title>
</svelte:head>
<div class="ml-36 mt-6 flex flex-col ">
   <p class="pb-3 text-4xl">sign up</p>
   <p class="">already have an account? <a class="text-blue-600" href="/login">log in</a></p>

   <div class="mr-auto flex flex-col items-center pt-10 pb-2">
      <p class="font mr-auto pb-2">name</p>
      <input type="text" bind:value="{name}" class="h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none" />
   </div>

   <div class="mr-auto flex flex-col items-center">
      <p class="font mr-auto pb-2">email</p>
      <input type="text" bind:value="{email}" class="h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none" />
   </div>

   <p class:invisible="{isValidEmail}" class="pt-1 text-sm text-red-600">please enter a valid email!</p>

   <div class="mr-auto flex flex-col items-center pb-2 pt-6">
      <p class="mr-auto pb-2">password</p>
      <input bind:value="{password}" type="password" class=" h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none" />
   </div>

   <div class="mr-auto flex flex-col items-center">
      <p class="mr-auto pb-2">confirm password</p>
      <input bind:value="{passwordCheck}" type="password" class=" h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none" />
   </div>

   <p class:invisible="{!(password != passwordCheck || password == '')}" class=" pt-1 text-sm text-red-600">passwords don't match!</p>

   <div class:invisible="{isValidPassword}" class="text-wrap w-96 pt-1 text-sm text-red-600">
      your password must include a one uppercase character, lowercase character, special character, digit and be at least eight characters long
   </div>

   <button on:click="{signup}" class=" mt-5 mb-4 w-96 rounded bg-[#091834] py-1 text-white"> sign up </button>
</div>
