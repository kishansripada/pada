import { getUserSavedTracks } from "../../../../spotify.js";
// console.log(token);

export async function get({ params }) {
    let results = await getUserSavedTracks(params.access_token)

    return {
        status: 200,
        body: results
    };

}



