import { writable } from "svelte/store";

export const token = writable(null);
export const trackDetails = writable(null);
export const mongoTrack = writable(null);
export const version = writable({
   tabs: 0,
   chords: 0,
});
export const tabsOrChords = writable("tabs");
