<script>
import {} from "../store";
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import { onMount } from "svelte";

export let approvedTabsOrChords;
// export let selected = $page.params.tabId ? approvedTabsOrChords.findIndex((tab) => tab._id == $page.params.tabId) : 0;
export let selected = 0;

// if the page is accessed with a specified tabId, then find that in the approved tracks and set it to the currently selected tab
onMount(() => {
   let index =
      approvedTabsOrChords.findIndex((tab) => tab.id == $page.params.tabId) == -1
         ? 0
         : approvedTabsOrChords.findIndex((tab) => tab.id == $page.params.tabId);
   if ($page.params.tabId) {
      selected = index;
   } else {
      selected = 0;
   }
});
</script>

<div class="z-40 flex h-24 flex-row rounded-[20px] bg-white/10 bg-gray-100 text-black">
   <img class="h-24 w-24 rounded-[20px]" src="https://i.scdn.co/image/ab6775700000ee85769926cc29d872eaec8dc953" alt="" />

   <div class="flex flex-col pl-3 pt-3">
      <!-- <p class="">{approvedTabsOrChords[selected].author.name}</p> -->
      <p class="mt-auto mb-4">{approvedTabsOrChords[selected].description}</p>
   </div>

   <div class="ml-auto flex flex-col py-2 pr-3">
      <select
         bind:value="{selected}"
         class=" form-select mt-auto ml-auto w-24 appearance-none rounded-xl border bg-white/5 bg-clip-padding px-2 py-1.5 text-center text-base font-normal text-[#091834] outline-none hover:bg-white/10">
         {#each approvedTabsOrChords as version, index}
            <option value="{index}">
               version {index + 1}
            </option>
         {/each}
      </select>
   </div>
</div>
