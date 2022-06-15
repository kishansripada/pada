<script>
import { isUploadingTabs, mongoTrack } from "../../store.js";
import { App, Credentials } from "realm-web";
import { page } from "$app/stores";

import { toast } from "@zerodevx/svelte-toast";

const app = new App({ id: "boptabs-wwrqq" });
const credentials = Credentials.anonymous();
let user = app.logIn(credentials);

export let trackDetails;

let files;
let description;
const postFiles = async () => {
   if (!files || !description) return;
   let xml = await files[0].text();
   user = await user;
   let trackReadable = await $mongoTrack;

   if (trackReadable.tabs) {
      const id = toast.push("Uploading");
      // if track exists
      user.functions
         .addNewMusicXml(trackDetails.id, {
            approved: false,
            musicXml: xml,
            rating: null,
            author: JSON.parse(localStorage.user).id,
            description: description,
            dateSubmitted: new Date(),
         }) // re get mongo track so that the app knows it exists and no duplicates
         .then(() => {
            toast.pop(id || fn || undefined);
            toast.push("Thank you for uploading!");
            mongoTrack.set(fetch(`/api/gettrack/${$page.params.id}`).then((r) => r.json()));
         });
   } else {
      // if track doesn't exist
      let document = {
         name: trackDetails.name,
         primaryArtist: trackDetails.artists.map((artist) => artist.name).join(", "),
         spotifyId: trackDetails.id,
         tabs: [
            {
               approved: false,
               musicXml: xml,
               rating: null,
               author: JSON.parse(localStorage.user).id,
               description: description,
               dateSubmitted: new Date(),
            },
         ],
         chords: [],
      };
      user.functions.addOne(document).then(() => {
         // re get mongo track so that the app knows it exists and no duplicates
         mongoTrack.set(fetch(`/api/gettrack/${$page.params.id}`).then((r) => r.json()));
      });
   }

   isUploadingTabs.set(false);
};
</script>

<div class="flex flex-row justify-center">
   <div class="flex h-80 w-1/3 flex-col items-center rounded-[20px] bg-white/10 text-white shadow-2xl">
      <p class="pt-3 text-xl">🔼 upload a MusicXml file 🔼</p>

      <div class="mb-3 w-96 pt-4">
         <input class=" mx-4  rounded bg-transparent outline outline-white focus:outline-none" type="file" accept=".xml" bind:files />
      </div>

      <div class="pt-2">
         <textarea
            class="resize-none rounded bg-transparent px-2 py-1 outline  outline-white placeholder:text-white/50"
            placeholder="Description..."
            cols="30"
            rows="5"
            bind:value="{description}"></textarea>
      </div>

      <button class="mt-auto mb-5 rounded px-5 py-2 outline outline-white hover:bg-white/10" on:click="{() => postFiles()}">Upload</button>
   </div>
</div>
