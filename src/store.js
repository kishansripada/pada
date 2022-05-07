import { readable, writable } from "svelte/store";

export const token = writable(null);
export const trackDetails = writable(null);
export const mongoTrack = writable(null);
export const version = writable({
   tabs: 0,
   chords: 0,
});
export const tabsOrChords = writable("tabs");
export const loggedIn = writable("false");
export const isPremium = writable("false");

export const logIn = readable(function logIn() {
   console.log(window.location.origin);
   let scope = ["streaming", "user-read-email", "user-read-private", "user-library-read"].join(" ");
   let params = {
      response_type: "code",
      client_id: "01a3817b86784869a571c4fa82ec3de7",
      scope: scope,
      redirect_uri: window.location.origin,
      // state: "state",
   };

   let querystring = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

   window.location.href = "https://accounts.spotify.com/authorize?" + querystring;
});
