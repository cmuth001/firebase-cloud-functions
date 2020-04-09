import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.helloWorld = functions.https.onRequest( (req, res) => {
    console.log("hello world console log...");
    res.send("Hello World From Cloud Functions...");
});

exports.insertIntoDB = functions.https.onRequest( (req, res) => {
    const text = req.query.text;
    admin.database().ref('/test').push({text: text}).then( (snapShot: { ref: string; }) => {
        res.redirect(303, snapShot.ref);
    });
} );
exports.toUpperCase = functions.database.ref('/test/{pushId}/text').onWrite( event => {
    console.log("text:"+JSON.stringify(event));
    const text = event.after.val();
    const toUpperCase = text.toUpperCase();
    return event.after.ref.parent?.child("toUpperCaseText").set(toUpperCase);
});
