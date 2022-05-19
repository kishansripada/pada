const client_id = "01a3817b86784869a571c4fa82ec3de7"; // Your client id
const client_secret = "19e1972a694740ff8537940a773c3ac3"; // Your secret

export async function getToken() {
   let body = await fetch("https://accounts.spotify.com/api/token", {
      body: "grant_type=client_credentials",
      headers: {
         Authorization: "Basic " + btoa(client_id + ":" + client_secret),
         "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return body;
}

export async function getPlaylist(playlistId, token) {
   let body = await fetch("https://api.spotify.com/v1/playlists/" + playlistId, {
      method: "GET",
      headers: {
         Authorization: "Bearer " + token,
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });

   while (body.tracks.next) {
      let data = await fetch(body.tracks.next, {
         method: "GET",
         headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
         },
      })
         .then((response) => response.json())
         .catch((err) => {
            console.error(err);
         });

      body.tracks.items.push(...data.items);
      body.tracks.next = data.next;
   }
   return body;
}

export async function getArtists(ids, token) {
   let artists = [];
   while (ids.length !== 0) {
      let body = await fetch("https://api.spotify.com/v1/artists?ids=" + ids.splice(0, 50).join("%2C"), {
         method: "GET",
         headers: {
            Authorization: "Bearer " + token,
         },
      })
         .then((response) => response.json())
         .catch((err) => {
            console.error(err);
         });
      artists.push(...body.artists);
   }
   return artists;
}

export async function getTrack(trackId, token) {
   var body = await fetch("https://api.spotify.com/v1/tracks/" + trackId, {
      method: "GET",
      headers: {
         authorization: "Bearer " + token,
      },
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return body;
}

export async function getTrackAnalysis(trackId, token) {
   var body = await fetch("https://api.spotify.com/v1/audio-analysis/" + trackId, {
      method: "GET",
      headers: {
         authorization: "Bearer " + token,
      },
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return body;
}

export async function getTrackFeatures(trackId, token) {
   var body = await fetch("https://api.spotify.com/v1/audio-features/" + trackId, {
      method: "GET",
      headers: {
         authorization: "Bearer " + token,
      },
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return body;
}

export async function getPage(apiUrl, token) {
   var page = await fetch(apiUrl, {
      method: "GET",
      headers: {
         authorization: "Bearer " + token,
      },
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return page;
}

export async function search(query, types, limit, token) {
   let apiUrl = "https://api.spotify.com/v1/search?q=" + query.replace(" ", "%20") + "&type=" + types.join("%2C") + "&limit=" + limit;
   var result = await getPage(apiUrl, token);
   return result;
}
export async function getAuthToken(code) {
   let body = await fetch("https://accounts.spotify.com/api/token", {
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${window.location.origin}&client_id=${client_id}&client_secret=${client_secret}`,
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return body;
}

export async function getUser(access_token) {
   let body = fetch("https://api.spotify.com/v1/me", {
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${access_token}`,
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return body;
}

export async function getOtherUser(user_id, access_token) {
   let body = fetch(`https://api.spotify.com/v1/users/${user_id}`, {
      headers: {
         Accept: "application/json",
         Authorization: `Bearer ${access_token}`,
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .catch((err) => {
         console.error(err);
      });
   return body;
}

export async function getUserSavedTracks(access_token) {
   async function getPage(offset) {
      return fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
         headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
         },
      })
         .then((response) => response.json())
         .catch((err) => {
            console.error(err);
         });
   }
   let page = await getPage(0);

   let offsets = Array.from({ length: (page.total - 50) / 50 + 1 }, (_, i) => 50 + i * 50);

   return [...page.items, ...(await Promise.all(offsets.map((offset) => getPage(offset)))).map((page) => page.items).flat()];
}
