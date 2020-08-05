# ovh-api-ip-failover
Cridentials.js : to get registered and get your secret key.
Script.sh : must be run on each server in order to install keepalived and add its config.

=>> Address={FLOATING_IP}/32 is the address that must be configured ( buy a floating ip from ovh cloud)

=>> keepalived.conf must be configured too with master address and slave addresses

ovh-api.js : will fetch the floating ip on each available server and if not found redirect that ip to other server with track script of keepalived config
