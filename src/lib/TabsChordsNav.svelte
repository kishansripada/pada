<script>
   import { tabsOrChords } from "../store";

   const switchType = () => tabsOrChords.update((current) => (current == "tabs" ? "chords" : "tabs"));
</script>

<div class="flex justify-center">
   <button on:click={switchType} class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l" class:bg-gray-400={$tabsOrChords == "tabs"}>
      Tabs
   </button>

   <button
      on:click={switchType}
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
      class:bg-gray-400={$tabsOrChords == "chords"}
   >
      Chords
   </button>
</div>
