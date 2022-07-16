<script>
import play from "../../static/play.svg";
import pause from "../../static/pause.svg";
import { logIn } from "../../store";
export let xml;
export let style;
let container;

let isPlaying = false;
let osmd;
let playbackManager;
let timingSource;
async function loadTabs() {
   osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(container);
   osmd.setOptions({
      autoResize: true,
      backend: "svg",
      drawTitle: false,
      drawComposer: false,
      performanceMode: "performanceMode",
      pageFormat: "A4 P",
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
   <!-- <script src="https://prod.flat-cdn.com/embed-js/v1.4.1/embed.min.js" on:load="{loadFlat}"></script> -->

   <script src="/src/opensheetmusicdisplay.min.js" on:load="{loadTabs}"></script>
</svelte:head>
<img
   src="{isPlaying ? pause : play}"
   alt=""
   class="cursor-pointer"
   on:click="{() =>
      isPlaying ? osmd.PlaybackManager.pause().then(() => (isPlaying = false)) : osmd.PlaybackManager.play().then(() => (isPlaying = true))}" />

<button on:click="{() => osmd.PlaybackManager.setPlaybackStart()}">reset</button>

<div class="z-[-50]">
   <div id="container" style="{style}; height: 100%" bind:this="{container}"></div>
</div>
