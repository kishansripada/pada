import { getToken, getTrackAnalysis } from "../../../../spotify.js";
// console.log(token);

export async function get({ params }) {
    let token = await getToken().then((token) => token.access_token);

    let analysis = await getTrackAnalysis(params.id, token);

    return {
        status: 200,
        body: {
            analysis,
        },
    };

}
