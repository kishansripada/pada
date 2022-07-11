import { readable, writable } from "svelte/store";

export const user = writable(false)
export const playbackData = writable(null);
export const loggedIn = writable(false);
export const isPremium = writable(false);
export const spotifyPosition = writable(null);
export const chordPosition = writable({ bar: 0 });
export const isSearching = writable(false)
export const spotifyIsPaused = writable(true)
export const faunaSession = writable(null);

export const logIn = readable(function logIn(state) {
   // console.log(window.location.origin);
   let scope = ["streaming", "user-read-email", "user-read-private", "user-library-read"].join(" ");
   let params = {
      response_type: "code",
      client_id: "01a3817b86784869a571c4fa82ec3de7",
      scope: scope,
      redirect_uri: window.location.origin,
      state: state,
   };

   let querystring = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

   window.location.href = "https://accounts.spotify.com/authorize?" + querystring;
});
