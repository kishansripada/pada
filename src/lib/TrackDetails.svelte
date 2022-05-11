<script>
import { isWritingChords } from "../store";
export let trackDetails;
</script>

<div class="flex h-64 flex-row rounded-[20px] shadow-2xl">
   <img class="w-64 rounded-[20px]  " src="{trackDetails.album.images[0].url}" alt="" />

   <div class="flex flex-col pl-7 pt-3 text-white ">
      <p class="pb-2 text-4xl">{trackDetails.name}</p>
      <p class="">{trackDetails.album.name}</p>

      <div class="mt-auto mb-3 flex flex-nowrap">
         {#each trackDetails.artists as artist}
            <div class="flex shrink-0 flex-col items-center pr-6">
               <img class="h-24  w-24  rounded-[20px] shadow-2xl" src="{artist.images?.[0]?.url}" alt="" />
               <p class="pt-1">{artist.name}</p>
            </div>
         {/each}
      </div>
   </div>

   <div class="ml-auto flex w-56 flex-col py-3 pr-3">
      <button class="mt-auto rounded-full bg-blue-400 py-1 px-3" on:click="{() => isWritingChords.update((state) => !state)}"
         >{$isWritingChords ? "Cancel 🚫" : "Write Chords ✍"}</button>
   </div>
</div>
