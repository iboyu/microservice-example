const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require("body-parser");
const app = express()
const port = 3000

let serviceAccount = require('./firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

app.use(bodyParser.json());

app.post('/add-joke',(req,res) => {
    let jokeID = req.body.jokeid;
    let jokeText = req.body.joketext;

    console.log(jokeText)

    let docRef = db.collection('jokes').doc(jokeID);
    docRef.set({
    joketext: [jokeText]})
    res.send("Joke Added Successfully!!")
})

app.get('/ryuan', (req, res) => {
    res.send("helllllllll")
})


app.get('/get-joke', (req, res) => {
  let docRef = db.collection('jokes').doc('jokeID'); // Return a single Joke    
  docRef.get().then((doc) => {
    if (doc.exists) {
        let a = doc.data()
        console.log(a.jokeID)
        res.send(doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
})



app.listen(3000,() => {
console.log("Started on PORT 3000");
})
