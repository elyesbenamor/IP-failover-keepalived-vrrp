
require('dotenv').config();

const ovh = require('ovh')({
  endpoint: process.env.OVH_API_ENDPOINT,
  appKey: process.env.OVH_API_AK,
  appSecret: process.env.OVH_API_AS,
  consumerKey: process.env.OVH_API_CK,
});
async function Server(){
    const available = await ovh.request('GET','/dedicated/server/availabilities',{
        country : EU,
        hardware : ''
    }, function(err, valid){
        if (valid){
            return resolve(JSON.parse(body.valid));
        }
        else {
            return err;
        }
    });
    return resolve(JSON.parse(body.available));
};

(async()=> {
    try {
        let getip = await ovh.request('GET', '/ip/{ip}',{ip: 'floatingip'}, function (err, ip) {
            console.log(err || ip);
            return resolve(JSON.parse(body.ip));
          });
          do {
              getip =await ovh.request('POST', '/ip/{ip}/move',{ip: 'floatingip'},{
                  nexthop: null,
                  to: server()
              }, function(err){
                  return err;
              });
            } while(!getip);

    } catch(err){
        return reject(err);
    }
})


