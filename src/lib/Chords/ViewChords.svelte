<script>
   import { mongoTrack, version } from "../../store";
   async function filterApprovedChords() {
      let chords = await $mongoTrack.then((mongoTrack) => mongoTrack.chords);
      return await chords.filter((chord) => chord.approved);
   }
</script>

{#await filterApprovedChords() then approvedChords}
   {JSON.stringify(approvedChords[$version.chords])}
{/await}
