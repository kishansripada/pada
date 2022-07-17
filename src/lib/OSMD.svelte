<script>
import play from "../static/play.svg";
import pause from "../static/pause.svg";
import reset from "../static/reset.svg";

import { logIn } from "../store";

export let xml;

let container;
let loaded = false;
let isPlaying = false;
let osmd;
let playbackManager;
let timingSource;

const loadedTrue = () => (loaded = true);

$: if (loaded && xml) {
   loadTabs(xml);
}

async function loadTabs(xml) {
   osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container);
   osmd.setOptions({
      autoResize: true,
      backend: "svg",
      drawTitle: false,
      drawComposer: false,
      performanceMode: "performanceMode",
      pageFormat: "endless",
      cursorsOptions: [{ type: 0, color: "#CBC3E3", alpha: 0.6, follow: true }],
   });

   osmd.load(xml).then(() => {
      osmd.render();
      timingSource = new opensheetmusicdisplay.LinearTimingSource();
      playbackManager = new opensheetmusicdisplay.PlaybackManager(timingSource, undefined, new opensheetmusicdisplay.BasicAudioPlayer(), undefined);
      playbackManager.DoPlayback = true;
      playbackManager.DoPreCount = false;
      playbackManager.PreCountMeasures = 1; // note that DoPreCount has to be true for a precount to happen
      timingSource.Settings = osmd.Sheet.playbackSettings;
      playbackManager.initialize(osmd.Sheet.musicPartManager);
      playbackManager.addListener(osmd.cursor);
      playbackManager.reset();
      osmd.PlaybackManager = playbackManager;
   });
}
</script>

<svelte:head>
   <script src="https://cdn.jsdelivr.net/gh/kishansripada/BopTabs/opensheetmusicdisplay.js" on:load="{loadedTrue}">
   </script>
</svelte:head>

<div class="flex w-full flex-row items-center justify-center">
   <img
      src="{reset}"
      class="h-10 w-10 cursor-pointer"
      alt=""
      on:click="{() => {
         osmd.PlaybackManager.setPlaybackStart();
         osmd.PlaybackManager.pause();
         isPlaying = false;
      }}" />
   <img
      src="{isPlaying ? pause : play}"
      alt=""
      class="cursor-pointer"
      on:click="{() =>
         isPlaying ? osmd.PlaybackManager.pause().then(() => (isPlaying = false)) : osmd.PlaybackManager.play().then(() => (isPlaying = true))}" />
</div>

<div bind:this="{container}"></div>
