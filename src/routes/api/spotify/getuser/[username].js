import { getToken, getOtherUser } from "../../../../spotify.js";
export async function get({ params }) {
    let token = await getToken().then((token) => token.access_token);

    let user = await getOtherUser(params.username, token);

    return {
        status: 200,
        body: {
            user,
        },
    };

}
