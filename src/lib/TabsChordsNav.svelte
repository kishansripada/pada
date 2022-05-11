<script>
import { tabsOrChords } from "../store";

const switchType = () => tabsOrChords.update((current) => (current == "tabs" ? "chords" : "tabs"));
</script>

<div class="flex justify-center">
   <button
      on:click="{switchType}"
      class="rounded-l bg-gray-300 py-2 px-4 text-gray-800 hover:bg-gray-400"
      class:bg-gray-400="{$tabsOrChords == 'tabs'}">
      Tabs
   </button>

   <button
      on:click="{switchType}"
      class="rounded-r bg-gray-300 py-2 px-4 text-gray-800 hover:bg-gray-400"
      class:bg-gray-400="{$tabsOrChords == 'chords'}">
      Chords
   </button>
</div>
