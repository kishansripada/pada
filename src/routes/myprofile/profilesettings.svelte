<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { supabase } from "../../supabase.js";

let files;
let user = supabase
   .from("profiles")
   .select("full_name")
   .eq("user_id", supabase.auth.user()?.id)
   .single()
   .then((r) => r.data);

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

{#await user then user}
   <div class="flex flex-row w-full">
      <div class="flex flex-col w-1/2">
         <p>email</p>
         <p>{supabase.auth.user()?.email}</p>
         <p>name</p>
         <input type="text" value="{user.full_name}" class="h-8 w-96 rounded bg-transparent px-2 ring-2 ring-black focus:outline-none" />
      </div>

      <div class=" justify-center items-center w-1/2">
         <label
            for="dropzone-file"
            style="background-image: url('https://mofbpdxaxkjlvywcbpmj.supabase.co/storage/v1/object/public/profilepics/{supabase.auth.user()
               ?.id}/pfp.png'); background-position: center;"
            class="flex flex-col justify-center items-center  w-64 h-64 bg-gray-50  border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 rounded-full">
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
               <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
               <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" bind:files />
         </label>
      </div>
   </div>
{/await}
