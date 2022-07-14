import { readable, writable } from "svelte/store";

export const user = writable(false)
export const currentTabs = writable(false)
export const currentChords = writable(false)
export const playbackData = writable(null);
export const loggedIn = writable(false);
export const isPremium = writable(false);
export const spotifyPosition = writable(null);
export const chordPosition = writable({ bar: 0 });
export const isSearching = writable(false)
export const spotifyIsPaused = writable(true)
export const faunaSession = writable(null);
export const currentlyPlaying = writable(null)
export const logIn = readable(function logIn(state) {
   // console.log(window.location.origin);
   let scope = ["streaming", "user-read-email", "user-read-private", "user-library-read"].join(" ");
   let params = {
      response_type: "code",
      client_id: "29110b23f6d14d67856438c2504dd2c4",
      scope: scope,
      redirect_uri: window.location.origin,
      state: state,
   };

   let querystring = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

   window.location.href = "https://accounts.spotify.com/authorize?" + querystring;
});
