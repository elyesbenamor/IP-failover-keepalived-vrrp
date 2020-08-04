
require('dotenv').config();

const ovh = require('ovh')({
  endpoint: process.env.OVH_API_ENDPOINT,
  appKey: process.env.OVH_API_AK,
  appSecret: process.env.OVH_API_AS,
  consumerKey: process.env.OVH_API_CK,
});
const Datacenternames = [];

const main = async ()=> {
    try{
//      ygeti les serveur available fi zone EU w ba3d y7othom fi lista 
        ovh.request('GET','/dedicated/server/availabilities',{
            country : 'EU',
            hardware : ''
            }, function(err, valids)
            
            {
                if (err) { throw err; }
                valids.forEach(element => 
                    {
                    
                    element["datacenters"].forEach(element => 
                        {
                       if (element["availability"] != "unavailable")
                       Datacenternames.push(element["datacenter"]);
                    
                        }); 
                  
                    });
                    //get random element
                    var item = Datacenternames[(Math.random()*Datacenternames.length)|0];
                    //console.log(item);
                    //ytesti itheken floating ip mawjouda 3al serveur ama ma na3rech ech traja3 get hethi 
                    const getip = await ovh.request('GET', '/ip/{ip}',{ip: 'floatingip'}, function (err, ip) {
                    console.log(err || ip);
                    
                         });
                     do {      // itheken ip mouch mawjouda 3al serveur ymigriha l ay serveur available mi lis item
                             ovh.request('POST', '/ip/{ip}/move',{ip: 'floatingip'},{
                                nexthop: null,
                                to: item //one of dedicated servers
                                }, function(err){
                                    return err;
                                });
                        
                         } while(!getip);
                     


    
            });
         
    }catch (err){
        return reject(err);
    }
};
main();
