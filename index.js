const express = require('express')
const app = express()
const services = require('./services')
const monk = require('monk')
var cors = require('cors')
//const fetch = require('node-fetch');
const port = 5000
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);
db.then(() => {
  console.log('Connected correctly to server')
})
collection = db.get('collection');

app.use(cors())
//
//successful query for date -30 
//
app.get('/', async (req, res) => {
  let dateRemove = new Date();
  dateRemove.setDate(dateRemove.getDate() - 1);
  console.log(dateRemove)
  await collection.find({
      'data.date': {
        $lte: dateRemove
      }
    })
    .then((docs) => {
      res.send(docs)
    })


})

app.get('/sendResults', async (req, res) => {
  //fetch twitch
  //compare
  //return results
  const testDate = new Date();


  //first, collect first time occurence
  //streamers on request
  const newResults = await services.getTwitchData();
   collection.find({},'user_id').then(async (mongo) =>{
    let newStreams = await services.findNewStreamers(newResults,mongo);


    
    res.send(newStreams);

  })
  //find if any new streamers

})




app.get('/analysis', async (req, res) => {
  //next, find average viewers of streams and see 
  //if there are any trends
  await collection.find({}).then((docs) =>{
    let average = 0;
    //console.log(docs);

   


    // for(let i = 0; i<docs.length; i++){
    //   for(let x = 0; x<docs[i].data.length;x++){
    //        average += docs[i].data[x].viewer_count
    //       // console.log(docs[i].data[x].viewer_count)
    //   }
        
    //   average = average / docs[i].data.length
    //   collection.update({user_id: docs[i].user_id},
    //     {$set : {average_viewers: 100000000000000}}) 
  
    //console.log(average)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))