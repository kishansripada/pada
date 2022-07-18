<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores";
</script>

<div class="z-50 flex justify-center">
   <a
      sveltekit:noscroll
      href="{`/track/${$page.params.id}/tabs`}"
      class="rounded-l bg-white/5 py-2 px-4 text-[#091834]  ring-black hover:bg-white/25"
      class:ring-2="{$page.url.pathname.split('/')[3] == 'tabs'}">
      tabs
   </a>

   <a
      sveltekit:noscroll
      href="{`/track/${$page.params.id}/chords`}"
      class="rounded-r bg-white/5 py-2 px-4 text-[#091834] ring-black hover:bg-white/25"
      class:ring-2="{$page.url.pathname.split('/')[3] == 'chords'}">
      chords
   </a>
</div>
