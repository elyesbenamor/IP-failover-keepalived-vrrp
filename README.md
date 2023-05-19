# ovh-api-ip-failover

In order to setup a proper ip failover on Ovh Cloud provider this based JS project will guide you throght the proper setup.

## Example
- `Cridentials.js` : to get registered and get your secret key. 
- `script.sh` : must be run on each server in order to install **keepalived** and add its config.
## Requirements
- `address={FLOATING_IP}/32` is the address that must be configured ( buy a floating ip from ovh cloud)

- `keepalived.conf` must be configured too with master address and slave addresses

- `ovh-api.js` : will fetch the floating ip on each available server, if not found redirect that ip to other server with track script of keepalived config
