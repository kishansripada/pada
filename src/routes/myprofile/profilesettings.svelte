<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { supabase } from "../../supabase.js";
import edit from "../../static/edit.svg";
import { toast } from "@zerodevx/svelte-toast";

let isEditingName = false;
let files;
let full_name;
let full_name_original;
let user = supabase
   .from("profiles")
   .select("full_name")
   .eq("user_id", supabase.auth.user()?.id)
   .single()
   .then((r) => r.data);

user.then((user) => {
   full_name = user?.full_name;
   full_name_original = user?.full_name;
});

const changeName = async () => {
   isEditingName = false;
   console.log({ full_name });
   console.log({ full_name_original });
   if (full_name == full_name_original) return;

   const { data, error } = await supabase.from("profiles").update({ full_name }).eq("user_id", supabase.auth.user()?.id);
   if (data && !error) {
      toast.push("name changed successfully", {
         theme: {
            "--toastBackground": "#006400",
            "--toastBarBackground": "#006400",
            "--toastBorderRadius": "1rem",
         },
      });
   }
};

$: if (files) {
   (async function uploadPic() {
      let buffer = await files[0].arrayBuffer();
      const { data, error } = await supabase.storage.from("profilepics").upload(`${supabase.auth.user()?.id}/pfp.png`, buffer, {
         //  cacheControl: "3600",
         upsert: true,
      });
   })();
}
</script>

{#await user}
   <div class="flex items-center justify-center pt-8">
      <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
   </div>
{:then user}
   <div class="flex flex-col w-full">
      <div class=" justify-center items-center w-1/2">
         <label
            for="dropzone-file"
            style="background-image: url('https://mofbpdxaxkjlvywcbpmj.supabase.co/storage/v1/object/public/profilepics/{supabase.auth.user()
               ?.id}/pfp.png'); background-position: center; background-size: cover"
            class="object-cover flex flex-col justify-center items-center  w-48 h-48 bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer rounded-full hover:opacity-80">
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
               <svg
                  aria-hidden="true"
                  class="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  ><path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path
                  ></svg>
            </div>
            <input id="dropzone-file" type="file" class="hidden" bind:files />
         </label>
         <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload a profile picture</span></p>
         <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 800x400px)</p>
      </div>

      <div class="flex flex-col w-1/2 mt-10">
         <p>email</p>
         <p class="mt-1">{supabase.auth.user()?.email}</p>
         <p class="mt-5">name</p>
         <div class="flex flex-row items-center">
            <input
               type="text"
               bind:value="{full_name}"
               class="mt-1 h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none"
               class:pointer-events-none="{!isEditingName}"
               class:opacity-50="{!isEditingName}" />
            {#if isEditingName}
               <button on:click="{changeName}" class="bg-purple-500 text-white px-3 py-2 hover:opacity-50 ml-3 rounded-xl">Save</button>
            {:else}
               <img on:click="{() => (isEditingName = true)}" src="{edit}" alt="" class="w-8 h-8 ml-3 cursor-pointer hover:opacity-50" />
            {/if}
         </div>
      </div>
   </div>
{/await}
