<script context="module">
export async function load({ stuff }) {
   return { props: { trackDetails: stuff.trackDetails } };
}
</script>

<script>
import { clientWithCookieSession } from "../../../../client.js";
// export let trackDetails;
import { page } from "$app/stores";
import { mutationStore, gql } from "@urql/svelte";
import Cookie from "js-cookie";
import { goto } from "$app/navigation";

import { toast } from "@zerodevx/svelte-toast";

const cookies = Cookie.get("fauna-session");
const { email, secret, ownerId } = cookies ? JSON.parse(cookies) : {};
let client = clientWithCookieSession(secret);

const addTab = gql`
   mutation ($spotifyId: String!, $authorId: ID!, $description: String!, $musicXml: String!) {
      addTab(spotifyId: $spotifyId, authorId: $authorId, description: $description, musicXml: $musicXml) {
         musicXml
      }
   }
`;

let files;
let description;
let addTabResponse;
const postFiles = async () => {
   if (!files || !description) return;
   let musicXml = await files[0].text();
   // add track to fauna and algolia via private endpoint
   await fetch(`/api/addtrack/${$page.params.id}`);

   // add tab to fauna
   addTabResponse = mutationStore({
      client,
      query: addTab,
      variables: { spotifyId: $page.params.id, authorId: ownerId, description, musicXml },
   });
};

$: console.log($addTabResponse);

$: if ($addTabResponse?.data?.addTab) {
   toast.push("submitted successfully!", {
      theme: {
         "--toastBackground": "#006400",
         "--toastBarBackground": "#006400",
         "--toastBorderRadius": "1rem",
      },
   });
   // goto(`${$page.url.pathname.split("/").slice(0, -1).join("/")}`);
}

$: if ($addTabResponse?.error) {
   toast.push("there was an error submitting your tab", {
      theme: {
         "--toastBackground": "#D2042D",
         "--toastBarBackground": "#D2042D",
         "--toastBorderRadius": "1rem",
      },
   });
}
</script>

<div class="flex flex-row justify-center">
   <div class="flex h-80 w-1/3 flex-col items-center rounded-[20px] bg-white/10 text-[#091834] ">
      <p class="pt-3 text-xl">upload a musicxml file</p>

      <div class="mb-3 w-96 pt-4">
         <input class=" mx-4  rounded bg-transparent ring-2 ring-black focus:outline-none" type="file" accept=".xml" bind:files />
      </div>

      <div class="pt-2">
         <textarea
            class="resize-none rounded bg-transparent px-2 py-1 ring-2 ring-black placeholder:text-black/50 focus:outline-none"
            placeholder="Description..."
            cols="30"
            rows="3"
            bind:value="{description}"></textarea>
      </div>

      <button on:click="{postFiles}" class=" mt-10 mb-4 w-48  rounded bg-[#091834] py-1 text-white"> upload ☝️</button>
   </div>
</div>
