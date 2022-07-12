<script>
import { goto } from "$app/navigation";
import { browser } from "$app/env";
import { page } from "$app/stores";
import { user } from "../../store.js";

$: if (!$user && browser) {
   goto("/login");
}
</script>

<!-- {#if !$userData.fetching}
   <h4>{$userData.data.findUserByEmail.name}</h4>
   <div><b>Email:</b> {$userData.data.findUserByEmail.email}</div>

   <div class="mt-8 flex min-h-[500px] flex-row justify-between text-sm">
      <div
         class="mr-36 flex min-w-[300px] flex-col  rounded-xl bg-gradient-to-bl from-[#9E1946]/40 to-[#A390E4]/40 p-6  child:flex child:h-8 child:flex-row child:items-center child:rounded-lg child:py-4 child:pl-2 child-hover:bg-white/30">
         <a class="{$page.url.pathname == '/myprofile/profilesettings' ? 'bg-white/30' : ''}" href="/myprofile/profilesettings">
            <span class="pr-2 text-xl grayscale">👤 </span>profile settings</a>
         <a class="{$page.url.pathname == '/myprofile/tabs' ? 'bg-white/30' : ''}" href="/myprofile/tabs">
            <span class="pr-2 text-xl grayscale">🎸 </span>my tabs</a>
         <a class="{$page.url.pathname == '/myprofile/chords' ? 'bg-white/30' : ''}" href="/myprofile/chords">
            <span class="pr-2 text-xl grayscale">🎹 </span>my chords</a>
         <div class="">other</div>
      </div>

      <slot />
   </div>
{:else}
   <p>Loading...</p>
{/if} -->
