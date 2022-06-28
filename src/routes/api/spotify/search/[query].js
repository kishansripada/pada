import { getToken, search } from "../../../../spotify.js";
// console.log(token);

export async function get(req) {
    let results = await search(req.params.query, ["track"], 6, req.url.searchParams.get("token"))

    return {
        status: 200,
        body: results.tracks.items
    };

}



// export async function search(query, types, limit, token) {
//     let apiUrl = "https://api.spotify.com/v1/search?q=" + query.replace(" ", "%20") + "&type=" + types.join("%2C") + "&limit=" + limit;
//     var result = await getPage(apiUrl, token);
//     return result;
// }