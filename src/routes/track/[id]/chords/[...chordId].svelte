<script>
import { spotifyPosition, chordPosition } from "../../../../store.js";
import { user } from "../.././../../store.js";
import { supabase } from "../../../../supabase.js";
import { page } from "$app/stores";
import Info from "$lib/Info.svelte";
import { goto } from "$app/navigation";

const upload = () => {
   if (!$user) {
      goto(`/login?referrer=${$page.url.href}`, { noscroll: true });
   } else {
      goto(`${$page.url.href}/write`, { noscroll: true });
   }
};

// get the current track id from the URL
$: trackId = $page.params.id;

$: chords = supabase
   .from("chords")
   .select("*")
   .eq("spotifyId", trackId)
   .eq("approvalStatus", "approved")
   .then((r) => r.data);

// every track will default to the first tab
let selected = 0;

// if the trackId changes, then reset the current selected track to the first
$: (selected = 0), trackId;

let autoScroll = true;

const scrollIntoView = (currentBar) => {
   if (!autoScroll) return;
   const el = document.getElementById(currentBar);
   if (!el) return;
   el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
   });
};

$: scrollIntoView(currentBar);

// when chord is clicked send the beat number to the store
function changeSpotifyPosition(bar) {
   chordPosition.set({ bar: bar });
}

let currentBar = 0;
// given the spotify position, calculate the current bar of rthe song
$: (async () => {
   currentBar = (await chords)[selected].chords.findIndex((beat) => {
      return $spotifyPosition / 1000 < beat.start + beat.duration;
   });
})(),
   $spotifyPosition;
</script>

<!-- chord components -->

<div class="flex flex-row items-center py-9">
   <input type="checkbox" value="" class="w-16" bind:checked="{autoScroll}" />
   <label for="remember" class="text-[#091834]">Auto Scroll</label>
</div>

{#await chords}
   <p>Loading...</p>
{:then chords}
   {#if chords.length}
      <div class="py-3">
         <Info bind:selected approvedTabsOrChords="{chords}" />
      </div>
      <div class="grid basis-1/4 grid-cols-16 gap-2 ">
         {#each chords[selected].chords as chord, i}
            <div class:mr-2="{(i + 1) % 4 == 0 && (i + 1) % 16 != 0}" on:click="{() => changeSpotifyPosition(chord.start, i)}">
               <div
                  class:bg-orange-400="{i == currentBar}"
                  class:bg-slate-400="{i != currentBar}"
                  id="{i}"
                  class="grid h-12 w-full place-items-center rounded bg-white/5    text-white ring-black focus:outline-none cursor-pointer">
                  <p class="select-none">{Object.values(chord.chord || { "": "" }).join("")}</p>
               </div>
            </div>
         {/each}
      </div>
   {:else}
      <div class="flex flex-row justify-center pt-8">
         <div class="flex flex-col items-center">
            <p>there aren't any chords for this song 😞</p>
            <button on:click="{upload}" class="text-blue-500" href="{$page.url.pathname}/write">write one</button>
         </div>
      </div>
   {/if}
{/await}

<!-- {#if $colors}
   {#await $colors then colors}
      <div
         class="absolute -z-30 h-[500px] w-[75rem]"
         style="background:linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.15) 85%, rgba(255, 255, 255, 1) 100%);
       ">
      </div>

      <div
         class="absolute -z-30 h-[500px] w-[75rem]"
         style="background:radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 95%);">
      </div>

      <div
         class="absolute  -z-50 h-[2000px] w-full opacity-60 top-[650px]"
         style=" background: linear-gradient(-45deg, {colors.join(',')});
   animation: gradient 30s ease infinite; 
   background-size: 200% 200%
   ">
      </div>
   {/await}
{/if} -->
