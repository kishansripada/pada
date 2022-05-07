<script>
   import { version, mongoTrack, tabsOrChords } from "../store";
</script>

{#await $mongoTrack then mongoTrack}
   <select
      bind:value={$version[$tabsOrChords]}
      class="form-select appearance-none
   block
   px-3
   py-1.5
   text-base
   font-normal
text-gray-700
bg-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      aria-label="Default select example"
   >
      {#each mongoTrack[$tabsOrChords].filter((x) => x.approved) as version, index}
         <option value={index}>
            Version {index + 1}
         </option>
      {/each}
   </select>
{/await}
