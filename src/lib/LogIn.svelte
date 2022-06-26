<script>
import { loggedIn, logIn, isPremium } from "../store";
import { onMount } from "svelte";
import { getAuthToken, getUser } from "../spotify";
// import { user } from "./mongoclient";
// console.log(user);

$: cookies = document.cookie.split("; ").reduce((prev, current) => {
   const [name, ...value] = current.split("=");
   prev[name] = value.join("=");
   return prev;
}, {});

$: loggedIn.set(cookies["auth_token"] || false);
$: isPremium.set(cookies["isPremium"] || false);

// $: console.log({ $isPremium });
// $: console.log({ $loggedIn });

function setCookie(cname, cvalue, exhours) {
   const d = new Date();
   d.setTime(d.getTime() + exhours * 60 * 60 * 1000);
   let expires = "expires=" + d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

onMount(async () => {
   console.log("hi from login");
   let uri = window.location.search.substring(1);
   let params = new URLSearchParams(uri);

   if (params.get("code")) {
      let code = params.get("code");
      // console.log(code);
      let token = await getAuthToken(code);
      // console.log(token);

      setCookie("auth_token", token.access_token, 1);

      let user = await getUser(token.access_token);
      setCookie("isPremium", user.product == "premium", 1);

      localStorage.user = JSON.stringify(user);

      window.location.href = window.location.origin;
   }
});
</script>

{#if $loggedIn}
   <button>
      <img class="fixed right-2 bottom-2 w-24 rounded-full" alt="" src="{JSON.parse(localStorage.user).images[0].url}" on:click="{$logIn}" />
   </button>
   <img
      class="fixed right-2 bottom-1 z-50 w-8 rotate-6"
      src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
      alt="" />
{/if}

{#if !$loggedIn}
   <button class="z-50">
      <img
         class="fixed right-2 bottom-2  w-72"
         alt=""
         src="https://raw.githubusercontent.com/kishansripada/BopTabs/master/src/assets/connectSpotify.svg"
         on:click="{$logIn}" />
   </button>
{/if}
