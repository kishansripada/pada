<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
export let trackDetails;
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import { supabase } from "../../../../supabase.js";
import { toast } from "@zerodevx/svelte-toast";

let files;
let description;
const postFiles = async () => {
   if (!files || !description) return;
   let musicXml = await files[0].text();

   try {
      const { trackData, trackError } = await supabase
         .from("tracks")
         .insert([{ name: trackDetails.name, artists: trackDetails.artists.map((artist) => artist.name), spotifyId: trackDetails.id }]);
   } catch (trackError) {
      if (trackError?.code == "23505") {
         console.log("track in database!");
      }
   }

   const { tabData, tabError } = await supabase.from("tabs").insert([
      {
         musicXml,
         description,
         authorid: supabase.auth.user()?.id,
         spotifyId: trackDetails.id,
         approvalstatus: "pending",
      },
   ]);

   if (!tabError) {
      toast.push("submitted successfully!", {
         theme: {
            "--toastBackground": "#006400",
            "--toastBarBackground": "#006400",
            "--toastBorderRadius": "1rem",
         },
      });

      goto(`/track/${trackDetails.id}/tabs`);
   }
   if (tabError) {
      toast.push("there was an error submitting your tab", {
         theme: {
            "--toastBackground": "#D2042D",
            "--toastBarBackground": "#D2042D",
            "--toastBorderRadius": "1rem",
         },
      });
   }
};
</script>

<div class="flex flex-col ">
   <p class="ml-auto mr-auto text-xl font-semibold text-purple-600">upload a musicxml file</p>
   <div class="flex flex-row items-center text-[#091834] ">
      <div class="mb-3 w-96 pt-4">
         <input
            type="file"
            class="block w-full cursor-pointer text-sm
            text-slate-500 file:mr-4 file:rounded-full
            file:border-0 file:bg-violet-50
            file:py-2 file:px-4
            file:text-sm file:font-semibold
            file:text-violet-700
            hover:file:bg-violet-100
          "
            accept=".xml"
            bind:files />
      </div>
      <textarea
         class="mt-2 w-full resize-none rounded bg-transparent px-2 py-1 ring-2 ring-[#190027] placeholder:text-black/50 focus:outline-none"
         placeholder="Description..."
         rows="1"
         bind:value="{description}"></textarea>
   </div>
   <button on:click="{postFiles}" class=" mt-5 mb-4 ml-auto  mr-auto w-48 rounded bg-[#190027] py-1 text-white"> upload</button>
</div>
