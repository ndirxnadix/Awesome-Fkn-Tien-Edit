const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

const { TwitterApi } = require("twitter-api-v2");
const clientTwitter = new TwitterApi({
  appKey: "CTYsAb9kXYGngROP4Zs4UZwmN",
  appSecret: "FnyyvXzMTqA4mbGYhalbsmtz7Xl4gFsmDQz3JmJRawWnSkBSNu",
  accessToken: "1862467965691494400-bzKBFvYuLau1rgrGdUjhEH528R5XSO",
  accessSecret: "0pwzXPzGtefpNEkk8aY0SG8NALFACx9LoqczhANmJUeaX",
});

let day = 1;
async function tweet() {
  const insaneTienEdit = await clientTwitter.v1.uploadMedia("../Awesome Fkn Tien Edit.mp4");
  let resultat = await clientTwitter.v2.tweet({
    text: "day "+ day,
    media: { media_ids: [insaneTienEdit] },
  });
  console.log("tweet numero "+day);
}

const max = 72000000 // 20h
const min = 25200000 // 7h
let heureRandom = (Math.floor(Math.random()*(max-min))+min)
let jourDepart = new Date().getUTCDate();

setInterval(() => {
    let jourActuel = new Date().getUTCDate();
    if(jourActuel != jourDepart){
        tweet();
        day++;
        jourDepart = jourActuel;
    }

    heureRandom = (Math.floor(Math.random()*(max-min))+min);
}, heureRandom);
tweet();
