import { getToken, getTrack, getArtists, getTrackFeatures } from "../../../spotify.js";
let token = await getToken().then((token) => token.access_token);
console.log(token);

export async function get({ params }) {
   console.log("newspotify data");
   let trackAndArtists = getTrack(params.id, token).then((track) => {
      let artists = getArtists(
         track.artists.map((artist) => artist.id),
         token
      );
      return { track, artists };
   });

   let features = getTrackFeatures(params.id, token);

   return Promise.all([features, trackAndArtists]).then(([features, { track, artists }]) => {
      return {
         status: 200,
         body: {
            ...track,
            features,
            artists,
         },
      };
   });
}
