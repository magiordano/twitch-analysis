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
const collection = db.get('collection');

app.use(cors())

app.get('/', async (req, res) => {
 
  res.send("hello");

});


app.get('/sendResults', async (req, res) => {
  //fetch twitch
  //compare
  //return results
  //first, collect first time occurence
  //streamers on request
  const newResults = await services.getTwitchData();
  collection.find({},'user_id').then(async (mongo) =>{
  const newStreams = await services.findNewStreamers(newResults,mongo); 

  

    res.send (newStreams);

  });
  //find if any new streamers

});




app.get('/higherAverage', async (req, res) => {
  //next, find average viewers of streams and see 
  //if there are any trends
  const newResults = await services.getTwitchData();
  newUserIds = newResults.map((ele => ele.user_id));


  collection.find({'user_id':{ $in: newUserIds }}).then(async (mongo) =>{
 // let newStreams = await services.findNewStreamers(newResults,mongo); 
    let higherAverageUsers = await services.higherAverage(newResults, mongo)
  

    res.send (higherAverageUsers);
  });
});

app.get('/removeDate', async (req, res) => {

  let dateRemove = new Date();
  dateRemove.setDate(dateRemove.getDate() - 30);
  await collection.find({
      'data.date': {
        $lte: dateRemove
      }  
    })
    .then((docs) => {
      for(let i = 0; i <docs.length; i++){
        for(let x = 0; x<docs[i].data.length; x++){
          if(docs[i].data[x].date < dateRemove){
            if(docs[i].data[x].length <= 1){
              await collection.remove({user_id: docs[i].user_id})
            } else         
            await collection.update({
              user_id: docs[i].user_id
            },
            {$pop: {data: -1}}
            ) 
          }
          }     
        }
    })
       await db.close();
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

