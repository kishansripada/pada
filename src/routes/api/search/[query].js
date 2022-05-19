import { App, Credentials } from "realm-web";
const app = new App({ id: "boptabs-wwrqq" });
const credentials = Credentials.anonymous();
const user = await app.logIn(credentials);
console.log("new client");

export async function get({ params }) {

    let results = await user.functions.search(params.query);
    console.log("new data");
    return {
        status: 200,
        body: [
            ...results,
        ],
    };
}
