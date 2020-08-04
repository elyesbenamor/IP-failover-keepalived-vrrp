
require('dotenv').config();

const ovh = require('ovh')({
  endpoint: process.env.OVH_API_ENDPOINT,
  appKey: process.env.OVH_API_AK,
  appSecret: process.env.OVH_API_AS,
  consumerKey: process.env.OVH_API_CK,
});

ovh.request('GET','/dedicated/server/availabilities',{
        country : 'EU',
        hardware : ''
        }, function(err, valids){
            if (err) { throw err; }
            valids.forEach(element => {
                
               element["datacenters"].forEach(element => {
                   if (element["availability"] != "unavailable")
                   return console.log(element["datacenter"]);
               });
               
            });
        });
       
/*

(async()=> {
    try {
        let getip = await ovh.request('GET', '/ip/{ip}',{ip: 'floatingip'}, function (err, ip) {
            console.log(err || ip);
            return resolve(JSON.parse(body.ip));
          });
          do {
              getip =await ovh.request('POST', '/ip/{ip}/move',{ip: 'floatingip'},{
                  nexthop: null,
                  to: available
              }, function(err){
                  return err;
              });
            } while(!getip);

    } catch(err){
        return reject(err);
    }
})


//return resolve(JSON.parse(body.available));*/