<script>
import { loggedIn, logIn, isPremium } from "../store";
import { onMount } from "svelte";
import { getAuthToken, getUser } from "../spotify";
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import Cookies from "js-cookie";

$: loggedIn.set(Cookies.get("auth_token") || false);
$: isPremium.set((Cookies.get("isPremium") || "false") == "true");

onMount(async () => {
   if (!$page.url.searchParams.get("code")) return;

   let token = await getAuthToken($page.url.searchParams.get("code"));
   console.log(token);
   let d = new Date();
   d.setSeconds(d.getSeconds() + 3600);

   Cookies.set("auth_token", token.access_token, { expires: d });

   let user = await getUser(token.access_token);
   console.log(user);
   Cookies.set("isPremium", user.product == "premium", { expires: d });

   localStorage.user = JSON.stringify(user);
   loggedIn.set(token.access_token);
   isPremium.set(user.product == "premium");
   goto($page.url.searchParams.get("state"), { noscroll: true });
});
</script>

{#if $loggedIn}
   {#if JSON.parse(localStorage.user)?.images[0]?.url}
      <button class="z-[80]">
         <img
            class="fixed right-2 bottom-2 z-[80] w-20 rounded-full"
            alt=""
            src="{JSON.parse(localStorage.user)?.images[0]?.url}"
            on:click="{$logIn($page.url.href)}" />
      </button>
      <img
         class="fixed right-2 bottom-1 z-[80] w-8 rotate-6"
         src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
         alt="" />
   {:else}
      <button class="z-[80]">
         <p class="fixed right-2 bottom-2 z-[80] rounded-xl bg-black px-3 py-1 text-white">{JSON.parse(localStorage.user).display_name}</p>
      </button>
   {/if}
{/if}

{#if !$loggedIn}
   <button class="z-[80]">
      <img
         class="fixed right-2 bottom-2  z-[80] w-72"
         alt=""
         src="https://raw.githubusercontent.com/kishansripada/BopTabs/master/src/assets/connectSpotify.svg"
         on:click="{$logIn($page.url.href)}" />
   </button>
{/if}
