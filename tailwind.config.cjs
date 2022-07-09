module.exports = {
   content: ["./src/**/*.{html,js,svelte,ts}"],
   theme: {
      extend: {
         fontFamily: {
            inter: "'Inter', sans-serif"
         },
         gridTemplateColumns: {
            // Simple 16 column grid
            '16': 'repeat(16, minmax(0, 1fr))',
         }
      },
      container: {
         center: true,
         padding: "2rem",
      },
   },
   plugins: [
      function ({ addVariant }) {
         addVariant('child', '& > *');
         addVariant('child-hover', '& > *:hover');
      }
   ],
};
