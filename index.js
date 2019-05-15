const express = require('express')
const app = express()
require('dotenv').config();
const services = require('./services')
const monk = require('monk')
var cors = require('cors')
//const fetch = require('node-fetch');
const port = process.env.PORT||5000 
const db = monk(process.env.MONGO_URL);
db.then(() => {
  console.log('Connected correctly to server')
})
collection = db.get('collection');

app.use(cors())
//
//successful query for date -30 
//
app.get('/', async (req, res) => {
  res.send("success")
})

app.get('/sendResults', async (req, res) => {
  //fetch twitch
  //compare
  //return results
  //first, collect first time occurence
  //streamers on request
  const newResults = await services.getTwitchData();
  collection.find({},'user_id').then(async (mongo) =>{
  let newStreams = await services.findNewStreamers(newResults,mongo); 

  

    res.send (newStreams);

  })
  //find if any new streamers

})


// let dateRemove = new Date();
// dateRemove.setDate(dateRemove.getDate() - 1);
// console.log(dateRemove)
// await collection.find({
//     'data.date': {
//       $lte: dateRemove
//     }
//   })
//   .then((docs) => {
//     res.send(docs)
//   })


// }

// app.get('/analysis', async (req, res) => {
//   //next, find average viewers of streams and see 
//   //if there are any trends
//   await collection.find({}).then((docs) =>{
    
//     const newResults = await services.getTwitchData();
//     let averageStreams = await services.higherAverage(newResults,docs)
//   })
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))