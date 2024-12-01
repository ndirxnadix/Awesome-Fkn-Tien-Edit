const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('test')
})

app.listen(port, () => {
  console.log(`dans le port : ${port}`)
})

const { TwitterApi } = require("twitter-api-v2");
const clientTwitter = new TwitterApi({
  appKey: "2UShxdE1jbV7kttRsOTi5s3Kn",
  appSecret: "itwLgrYK7GamNQSL3L6YZxxEJyTv01l3iZrH1lw7C2hPbEs7MZ",
  accessToken: "1863253024212152320-IHF5VpBeMDuB26fLQpwUM8YWJah8Rd",
  accessSecret: "F4LMnXNADBufl62VMi4NHR15mXNp1Y9nKA7Fd3wPCBIEV",
});

let day = 1;
async function tweet() {
  const insaneTienEdit = await clientTwitter.v1.uploadMedia("./Awesome Fkn Tien Edit.mp4");
  let resultat = await clientTwitter.v2.tweet({
    text: "edit "+ day,
    media: { media_ids: [insaneTienEdit] },
  });
  console.log("tweet numero "+day+" envoyé");
}

const max = 10800000 // 3h
const min = 7200000 // 2h
let heureRandom = (Math.floor(Math.random()*(max-min))+min)
//let jourDepart = new Date().getUTCDate();

setInterval(() => {
    //let jourActuel = new Date().getUTCDate();
    //if(jourActuel != jourDepart){
        tweet();
        day++;
        //jourDepart = jourActuel;
    //}

    heureRandom = (Math.floor(Math.random()*(max-min))+min);
    console.log("prochain tweet dans "+(heureRandom/1000/3600)+" heures");
}, heureRandom);

tweet();
