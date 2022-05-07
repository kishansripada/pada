<script>
   import { loggedIn } from "../store.js";
</script>

<ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
   <li>
      <a
         href="/"
         class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
         aria-current="page">Home</a
      >
   </li>
   {#if $loggedIn}
      <li>
         <a
            href="/mylibrary"
            class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >My Library</a
         >
      </li>
   {/if}
</ul>
