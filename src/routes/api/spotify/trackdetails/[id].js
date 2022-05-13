import { getToken, getTrack, getArtists, getTrackFeatures } from "../../../../spotify.js";

export async function get({ params }) {
   let token = await getToken().then((token) => token.access_token);

   let trackAndArtists = getTrack(params.id, token).then((track) => {
      let artists = getArtists(
         track.artists.map((artist) => artist.id),
         token
      );
      return Promise.all([track, artists]);
   });

   let features = getTrackFeatures(params.id, token);

   return Promise.all([features, trackAndArtists]).then(([features, trackAndArtists]) => {
      return {
         status: 200,
         body: {
            ...trackAndArtists[0],
            features,
            artists: trackAndArtists[1],
         },
      };
   });
}
