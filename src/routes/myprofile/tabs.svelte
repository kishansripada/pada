<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { supabase } from "../../supabase.js";
import warning from "../../static/warning.svg";
import check from "../../static/check.svg";
import rejected from "../../static/rejected.svg";
import trash from "../../static/trash.svg";

let offset = 0;
let updater;
$: myTabs = supabase
   .from("tabs")
   .select(
      `
      created_at,
    id,
    approvalstatus,
    tracks (
      name,
      artists,
      spotifyId
    )
  `
   )
   .eq("authorid", supabase.auth.user()?.id)
   .order("created_at", { ascending: false })
   .range(offset, offset + 11)
   .then((r) => r.data);

const deleteTab = async (id) => {
   const { data, error } = await supabase.from("tabs").delete().eq("id", id);
   if (data) {
      toast.push("tab deleted!", {
         theme: {
            "--toastBackground": "#006400",
            "--toastBarBackground": "#006400",
            "--toastBorderRadius": "1rem",
         },
      });
   }
   myTabs = (await myTabs).filter((tab) => tab.id != id);
   console.log(data);
};
</script>

<div class="flex w-full flex-col">
   <div class="pl-3">
      <h1 class=" pb-2 text-3xl font-light">my submitted tablatures</h1>
      <hr class="pb-4" />
   </div>

   {#await myTabs}
      <div class="flex items-center justify-center pt-8">
         <div class="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
   {:then myTabs}
      {#if myTabs?.length}
         {#each myTabs as tab}
            <div class=" flex flex-row items-center hover:bg-gray-100">
               <a
                  sveltekit:prefetch
                  href="/track/{tab.tracks.spotifyId}/tabs/{tab.id}"
                  class:pointer-events-none="{['pending', 'rejected'].includes(tab.approvalstatus)}"
                  class=" flex h-16  flex-row items-center rounded   grow">
                  <img
                     alt=""
                     src="{tab.approvalstatus == 'approved' ? check : tab.approvalstatus == 'pending' ? warning : rejected}"
                     class="pl-3 w-10" />
                  <div class="flex flex-col">
                     <p class="pl-3">{tab.tracks.name}</p>
                     <p class="pl-3 text-xs">{tab.tracks.artists.join(", ")}</p>
                  </div>
                  <p class="ml-auto pl-3 pr-3 text-right text-xs">{tab.created_at}</p>
               </a>
               <img on:click="{() => deleteTab(tab.id)}" class="w-6 mx-3 ml-auto shrink cursor-pointer" src="{trash}" alt="" />
            </div>

            <hr />
         {/each}
         <div class=" flex flex-row justify-center pt-8">
            <button
               sveltekit:prefetch
               class:opacity-50="{offset == 0}"
               class:pointer-events-none="{offset == 0}"
               class="pl-2"
               on:click="{() => (offset > 0 ? (offset = offset - 12) : null)}">⬅️ back</button>
            <button
               sveltekit:prefetch
               class:opacity-50="{false}"
               class:pointer-events-none="{false}"
               class="pl-2"
               on:click="{() => (offset = offset + 12)}">next ➡️</button>
         </div>
      {:else}
         <p class="flex flex-row justify-center text-3xl">you haven't submitted any tabs yet! 😞</p>
      {/if}
   {/await}
</div>
