// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { collection, query, getFirestore, getDocs } from "firebase/firestore";

'use strict';

import * as fs from 'fs';

let tracks = JSON.parse(fs.readFileSync('musicxml.json'));


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrfDMk41JCtBgGkPAYJNG-5LLsTJIFGpk",
    authDomain: "boptabs.firebaseapp.com",
    projectId: "boptabs",
    storageBucket: "boptabs.appspot.com",
    messagingSenderId: "903609117778",
    appId: "1:903609117778:web:e4367c4b8af0894161c38b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// const trackRef = doc(db, "tracks", "05WIYJYtnZHUmL1uuYmvY1")

// const q = query(collection(trackRef, "tabs"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
// });

// const unsub = onSnapshot(doc(trackRef, "tabs"), (doc) => {
//     console.log("Current data: ", doc.data());
// });


// console.log(db)

// try {

//     const trackRef = doc(db, "tracks", "spotifyIDDD")

//     await setDoc(trackRef, {
//         name: "testname",
//         artists: ["testartist"],
//     });

//     const tabRef = await addDoc(collection(trackRef, "tabs"), {
//         description: "testdescription",
//     });
//     // console.log("Document written with ID: ", trackRef, tabRef);
// } catch (e) {
//     console.error("Error adding document: ", e);
// }



async function test() {
    for (let i = 0; i < tracks.length; i++) {
        if (!tracks[i].primaryArtist) continue

        const trackRef = doc(db, "tracks", tracks[i].spotifyId)

        await setDoc(trackRef, {
            name: tracks[i].name,
            artists: tracks[i].primaryArtist.split(","),
        });


        for (let j = 0; j < tracks[i].tabs.length; j++) {

            const tabRef = await addDoc(collection(trackRef, "tabs"), {
                description: tracks[i].tabs[j].description,
                musicXml: tracks[i].tabs[j].musicXml,
                isApproved: tracks[i].tabs[j].approved,
                authorId: "UthQKblDAQQ7YQ4KevB3SuzxGTM2",
                rating: 0,
                created: new Date()
            });


        }




    }


}
test()