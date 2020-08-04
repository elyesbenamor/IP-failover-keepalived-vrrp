const request = require('request');

require('dotenv').config();

const ovh = require('ovh')({
  endpoint: process.env.OVH_API_ENDPOINT,
  appKey: process.env.OVH_API_AK,
  appSecret: process.env.OVH_API_AS,
  consumerKey: process.env.OVH_API_CK,
});

ovh.request('GET', '/xdsl', function (err, ip) {
    console.log(err || ip)
  });

 