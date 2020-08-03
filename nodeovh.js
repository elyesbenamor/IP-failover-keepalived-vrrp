var async = require('async');
var ovh = require('ovh')({
    endpoint: 'ovh-eu',
    appKey: APP_KEY,
    appSecret: APP_SECRET,
    consumerKey: APP_CONSUMER_KEY
  });
ovh.request('GET','/ip/{ip}',{ ip: '' } ,function(err, ip){
    if (err) { throw err; }
    else {
        const FIP = ip;
        console.log("the server ip is ", ip);
        ovh.request('POST','/ip/{ip}/move',{ip:FIP}, function(){



        })
    }
});