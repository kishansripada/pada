import { getToken, } from "../../../../spotify.js";
// console.log(token);

export async function get({ params }) {
    let token = await getToken().then((token) => token.access_token);
    return {
        status: 200,
        body: {
            token,
        },
    };

}
