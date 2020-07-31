#!/bin/bash
#assign floating ip to all servers
echo "[TASK 1] assign floating ip to servers"
sudo cat >>/etc/systemd/network/50-default.networkf<<EOF
[Network]
Address={FLOATING_IP}/32
EOF
echo "[TASK 2] restart service"
sudo systemctl restart systemd-networkd