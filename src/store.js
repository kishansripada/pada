import { readable, writable } from "svelte/store";

export const token = writable(null);
export const playbackData = writable(null);
export const version = writable({
   tabs: 0,
   chords: 0,
});
export const tabsOrChords = writable("tabs");
export const colors = writable(null);
export const loggedIn = writable(false);
export const isPremium = writable(false);
export const spotifyPosition = writable(null);
export const isWritingChords = writable(false);
export const chordPosition = writable({ bar: 0 });
export const isSearching = writable(false)
export const spotifyIsPaused = writable(true)
export const user = writable(null);
export const faunaSession = writable(null);

export const logIn = readable(function logIn() {
   // console.log(window.location.origin);
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

export const getGroups = readable(function getGroups(list) {
   let result = [[], [], [], []];
   list.forEach((x, index) => {
      let remainder = index % 16;
      result[Math.floor(remainder / 4)].push(x);
   });
   return result;
});


