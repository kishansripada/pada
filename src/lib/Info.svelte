<script>
import { version, tabsOrChords } from "../store";
export let mongoTrack;
</script>

<select
   bind:value="{$version[$tabsOrChords]}"
   class="form-select m-0
   block
   appearance-none
   rounded
   border
   border-solid
border-gray-300
bg-white bg-clip-padding bg-no-repeat
px-3 py-1.5 text-base
font-normal
text-gray-700
transition
ease-in-out
focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
   aria-label="Default select example">
   {#each mongoTrack[$tabsOrChords].filter((x) => x.approved) as version, index}
      <option value="{index}">
         Version {index + 1}
      </option>
   {/each}
</select>
