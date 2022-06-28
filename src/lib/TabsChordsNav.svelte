<script>
import { tabsOrChords } from "../store";
import { goto } from "$app/navigation";
import { page } from "$app/stores";

const switchType = () => tabsOrChords.update((current) => (current == "tabs" ? "chords" : "tabs"));
</script>

<div class="flex justify-center">
   <a
      href="{`/track/${$page.params.id}/tabs`}"
      on:click="{switchType}"
      class="rounded-l bg-white/5 py-2 px-4 text-[#091834]  ring-black hover:bg-white/25"
      class:ring-2="{$page.url.pathname.split('/')[3] == 'tabs'}">
      tabs
   </a>

   <a
      href="{`/track/${$page.params.id}/chords`}"
      on:click="{switchType}"
      class="rounded-r bg-white/5 py-2 px-4 text-[#091834] ring-black hover:bg-white/25"
      class:ring-2="{$page.url.pathname.split('/')[3] == 'chords'}">
      chords
   </a>
</div>
