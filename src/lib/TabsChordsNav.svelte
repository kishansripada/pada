<script>
import { tabsOrChords } from "../store";

const switchType = () => tabsOrChords.update((current) => (current == "tabs" ? "chords" : "tabs"));
</script>

<div class="flex justify-center">
   <button on:click="{switchType}" class="rounded-l bg-white/5 py-2 px-4 text-[#091834]  hover:bg-white/25" class:outline="{$tabsOrChords == 'tabs'}">
      tabs
   </button>

   <button
      on:click="{switchType}"
      class="rounded-r bg-white/5 py-2 px-4 text-[#091834]  hover:bg-white/25"
      class:outline="{$tabsOrChords == 'chords'}">
      chords
   </button>
</div>
