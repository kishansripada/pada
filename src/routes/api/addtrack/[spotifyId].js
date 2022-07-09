import { page } from "$app/stores";
import { mutationStore, gql } from "@urql/svelte";
// import client from "../../../client.js"
import { getTrack, getToken } from "../../../spotify.js"
import algoliasearch from "algoliasearch";
import { createClient } from '@urql/svelte';

const url = 'https://graphql.fauna.com/graphql'

const client = createClient({
    url,
    fetchOptions: () => {
        const token = "fnAEq6rIl9ACUJn9pIkq2w8FVJu76jdrsw4aFlCv"
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
});



export async function get({ params: { spotifyId } }) {

    // GET FROM SPOTIFY
    let token = await getToken().then((token) => token.access_token);
    let track = await getTrack(spotifyId, token)
    // console.log(track)
    // ADD TO ALGOLIA
    const algoliaToken = "0be8adc40dc9474c923f913bdcbda9c2"
    const algoliaClient = algoliasearch("1K06LV6AVV", algoliaToken);
    const index = algoliaClient.initIndex("tracks");

    await index
        .saveObjects([
            {
                name: track.name,
                path: `tracks/${track.id}`,
                objectID: track.id,
                artists: track.artists.map(artist => artist.name)
            },
        ])


    // ADD TO FAUNA
    const addTrack = gql`
        mutation ($spotifyId: String!, $name: String!, $artists: [String!]!) {
           addTrack(spotifyId: $spotifyId, name: $name, artists: $artists) {
              _id
           }
        }
     `;


    addTabResponse = mutationStore({ client, query: addTrack, variables: { spotifyId: track.id, name: track.name, artists: track.artists.map(artist => artist.name) } });
    setTimeout(() => {
        return {
            status: 200,
            body: {
                test: "hi"
            },
        };
    }, 3000)


}
