const express = require('express')
const app = express()
const monk = require('monk')
const fetch = require('node-fetch');
const port = 3000
const url = 'mongodb://mag:3VZsQPNVkZ8aIGSc@cluster0-shard-00-00-z1he2.mongodb.net:27017,cluster0-shard-00-01-z1he2.mongodb.net:27017,cluster0-shard-00-02-z1he2.mongodb.net:27017/twitch_users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
const db = monk(url);
db.then(() => {
    console.log('Connected correctly to server')
  })
  collection = db.get('collection');

const getTwitchData = async () => {
    let arr = await fetch('https://api.twitch.tv/helix/streams/?first=100', {
        method: 'get',
        headers: {
          'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
        },
      })
      .then(res => res.json())
  
    pagination = arr.pagination.cursor
  
    let arr2 = await fetch('https://api.twitch.tv/helix/streams/?first=100&after=' + pagination, {
        method: 'get',
        headers: {
          'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
        },
      })
      .then(res => res.json())
      let combine = arr.data.concat(arr2.data)
      //combine both arr.data
      //console.log(combine)
    return combine;

    }

const findNewStreamers = async (arr) =>{
    let newArr= [];  
    await collection.find({})
    .then((docs) => {
       for(let i =0;i<arr.length; i++){
            

       }
    
       return newArr
}

    )}

//
//successful query for date -30 
//
app.get('/',async(req, res) => {
    let dateRemove = new Date();
    dateRemove.setDate(dateRemove.getDate()-1);
    console.log(dateRemove)
   await collection.find({'data.date':{$lte: dateRemove} })
        .then((docs) => {
            res.send(docs)
          })


})

app.get('/sendResults',async(req, res) => {
    let testDate = new Date();
        //fetch twitch
        //compare
        //return results
        let newResults = await getTwitchData();

        //find if any new streamers
        let test = await findNewStreamers(newResults);
      //  dateRemove.setDate(dateRemove.getDate()-1);
        //console.log(test)
           
       // console.log(newResults)

        //console.log(test);
        res.send(test);


        //REQ time 
        //query results of 
 
          })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))