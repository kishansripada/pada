<script>
// import { queryStore, gql } from "@urql/svelte";
// import { clientWithCookieSession } from "../client";
// import Cookie from "js-cookie";
import { goto } from "$app/navigation";
import { browser } from "$app/env";
import MyContributions from "../lib/Profile/MyContributions.svelte";
</script>

<!-- <div class="">
   {#if $userData.data}
      <h4>{$userData.data.findUserByEmail.name}</h4>
      <div><b>Email:</b> {$userData.data.findUserByEmail.email}</div>

      <div class="flex flex-row">
         <div class="flex flex-col">
            <div class="h-12 rounded-xl bg-gray-200 p-2">My Contributions</div>
         </div>
         <div class="ml-auto w-[700px]">
            <MyContributions contributions="{$userData.data.findUserByEmail.tabs.data}" />
         </div>
      </div>
   {/if}
</div> -->
