<script>
   import { mongoTrack, version, spotifyPosition } from "../../store";
   async function filterApprovedChords() {
      let chords = await $mongoTrack.then((mongoTrack) => mongoTrack.chords);
      return await chords.filter((chord) => chord.approved);
   }

   $: console.log({ $spotifyPosition });
</script>

{#await filterApprovedChords() then approvedChords}
   {JSON.stringify(approvedChords[$version.chords])}
{/await}
