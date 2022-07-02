<script>
export let color;
export let stylePosition;
</script>

<div style="{stylePosition}" class="pointer-events-none  absolute z-50 h-[1265px] w-[459px] overflow-hidden">
   <div
      class="z-50"
      style="background-image: -o-radial-gradient(47.64% 52.94%, 37.66% 48.2%, {color} 0%, rgba(239, 255, 250, 0) 100%);
 background-image: radial-gradient(37.66% 48.2% at 47.64% 52.94%, {color} 0%, rgba(239, 255, 250, 0) 100%);
 position: absolute;
 width: 918px;
 height: 1265px;
 top: 0px;
 right: -550px;
 z-index: 50;">
   </div>
</div>
