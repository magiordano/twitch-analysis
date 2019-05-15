const fetch = require('node-fetch');

const fetchNewUsers = async (urlString) =>{

    let newStreams = await fetch(urlString, {
        method: 'get',
        headers: {
          'Client-ID': '7zkh4ut355tznqbv75vc1dsflxiu0v'
        },
      }).then(res => res.json())
      
      return newStreams
}

module.exports={
    
     findNewStreamers: findNewUsers = async (twitch,mongo) =>{
        let urlString ="https://api.twitch.tv/helix/streams?"
        
        newUserIds = twitch.map((ele => ele.user_id))
        mongoUserIds = mongo.map((ele => ele.user_id))

        const newUsers =  newUserIds.filter(user => !mongoUserIds.includes(user))

        //generate api string
        for(let i=0;i<newUsers.length;i++){
            urlString += "user_id="+  newUsers[i] + "&"
        }

        return fetchNewUsers(urlString)

        },
      
      getTwitchData: getTwitchData = async () => {
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
      
      },

      higherAverage: higherAverage = async (twitch, mongo) => {
        

      }

         
    } 

  



