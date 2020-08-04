require('dotenv').config();

const ovh = require('ovh')({
    endpoint: process.env.OVH_API_ENDPOINT,
    appKey: process.env.OVH_API_AK,
    appSecret: process.env.OVH_API_AS,
    consumerKey: process.env.OVH_API_CK,
});

let datacenternames = [];

const main = async () => {
    try {
        
        ovh.request('GET', '/dedicated/server/availabilities', {
            country: 'EU',
            hardware: ''
        }, (err, valids) => {
            if (err) throw err;
            
            valids.forEach(el=>{
                el.datacenters.filter(el => el.availability !== "unavailable").forEach(el=>datacenternames.push(el))
            })

            console.log(datacenternames)
            var item = datacenternames[(Math.random() * datacenternames.length) | 0];
         
            ovh.request('GET', '/ip/{ip}',{ ip: 'floatingip' },function (err, ip) {
                console.log(JSON.stringify(err))
                if (err) return;
                do {     
                    ovh.request('POST', '/ip/{ip}/move', { ip: 'floatingip' }, {
                        nexthop: null,
                        to: item 
                    }, function (err) {
                        return err;
                    });

                } while (!ip);

            });
        });

    } catch (err) {
        return reject(err);
    }
};
main();