<script>
import { loggedIn, logIn, isPremium } from "../store";
import { onMount } from "svelte";
import { getAuthToken, getUser } from "../spotify";
import { page } from "$app/stores";
import { goto } from "$app/navigation";
import Cookies from "js-cookie";

$: loggedIn.set(Cookies.get("auth_token") || false);
$: isPremium.set(Cookies.get("isPremium") || false);

onMount(async () => {
   if (!$page.url.searchParams.get("code")) return;

   let token = await getAuthToken($page.url.searchParams.get("code"));

   let d = new Date();
   d.setSeconds(d.getSeconds() + 3600);

   Cookies.set("auth_token", token.access_token, { expires: d });

   let user = await getUser(token.access_token);
   Cookies.set("isPremium", user.product == "premium", { expires: d });

   localStorage.user = JSON.stringify(user);
   loggedIn.set(token.access_token);
   isPremium.set(user.product == "premium");

   goto($page.url.searchParams.get("state"), { noscroll: true });
});
</script>

{#if $loggedIn}
   <button class="z-[80]">
      <img
         class="fixed right-2 bottom-2 z-[80] w-20 rounded-full"
         alt=""
         src="{JSON.parse(localStorage.user).images[0].url}"
         on:click="{$logIn($page.url.href)}" />
   </button>
   <img
      class="fixed right-2 bottom-1 z-[80] w-8 rotate-6"
      src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
      alt="" />
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
