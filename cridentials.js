require('dotenv').config();

const ovh = require('ovh')({
  endpoint: process.env.OVH_API_ENDPOINT,
  appKey: process.env.OVH_API_AK,
  appSecret: process.env.OVH_API_AS,
});

ovh.request('POST', '/auth/credential', {
  'accessRules': [
    { 'method': 'GET', 'path': '/*'},
    { 'method': 'POST', 'path': '/*'},
    { 'method': 'PUT', 'path': '/*'},
    { 'method': 'DELETE', 'path': '/*'}
  ]
}, function (error, credential) {
  console.log(error || credential);
});